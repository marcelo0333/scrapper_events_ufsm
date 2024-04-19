import axios from "axios";
import * as cheerio from 'cheerio';
import "reflect-metadata"
import { Events } from "../entity/events";
import { Types } from "../entity/types"
import { Local } from "../entity/local";
import { EventsToTypes } from "../entity/join/events_to_types";
import { Events_to_local } from "../entity/join/events_to_local";
import {AppDataSource} from "../database/data-source";
import {getEventLinks} from "./getEventLink";
import {getNewEventsLink} from "./getNewEventsLink";

export async function getEventData() {

    const eventLinks = await getNewEventsLink();

    var oldLinks = await getEventLinks();
    eventLinks.push(...oldLinks);
    var newLinks = await getNewEventsLink();
    eventLinks.push(...newLinks);

    const eventData = [];

    for (const url of eventLinks) {
        const text = await axios.get(url).then(r => r.data);
        const $ = cheerio.load(text);

        $('#main-section > article > article').each((index, element) => {
            var dateEvent = $(element).find('p.mb-0').text().trim();
            var [dateInitial, dateFinal] = dateEvent.split(' - ').map(dateStr => {
                var [day, month, yearTime] = dateStr.split('/');
                var [year, time] = yearTime.split(' ');
                return new Date(`${year}-${month}-${day}T${time}:00`);
            });
            const eventDataList = {
                imageEvent: $(element).find('img.w-100').attr('src'),
                eventName: $(element).find('h1.entry-title').text().trim(),
                link: '',
                nameTypes: $(element).find('span.badge').text().trim(),
                dateInitial: dateInitial,
                dateFinal: dateFinal,
                imgDesc: $(element).find('img').attr('src'),
                description: $(element).find('p').text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
                contact:  '',
                nameLocal: $($(element).find('div > div.row.localizacao > div > div').children()[0]).text().trim(),
                address: $($(element).find(' div > div.row.localizacao > div > div').children()[1]).text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
                city: $($(element).find(' div > div.row.localizacao > div > div').children()[2]).text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
                latitude: $(element).find('div:nth-child(2) > div.row.localizacao > div:nth-child(2) > div > div').attr('data-map-lat'),
                longitude: $(element).find('div:nth-child(2) > div.row.localizacao > div:nth-child(2) > div > div').attr('data-map-lng'),
                centerName: ''
            }
            $(element).find('div.row.contato > div > div > p').each(function () {
                const text = $(this).text().trim();
                const href=$(this).find('a').attr('href')
                if (text.includes('.com') || text.includes('@ufsm.br') || text.includes('@') || text.includes('55')){
                    eventDataList.contact = text;
                }else if (href && (href.includes('.com') || href.includes('@ufsm.br') || href.includes('@'))){
                    eventDataList.contact = href.replace('mailto:', '');
                }
            });

            $('#main-content > div:nth-child(1) > div > div').each((index, element) => {
                    eventDataList.centerName = $(element).find('span:nth-child(2) > a > span').text().trim()
            });
            eventDataList.link = url;
            eventData.push(eventDataList)
        })
    }
    for (const eventDataList of eventData) {
        var event = new Events();
        event.description = eventDataList.description;
        event.link = eventDataList.link;
        event.imageEvent = eventDataList.imageEvent;
        event.eventName = eventDataList.eventName;
        event.dateInitial = eventDataList.dateInitial;
        event.dateFinal = eventDataList.dateFinal
        event.contact = eventDataList.contact;
        event.centerName = eventDataList.centerName;
        var local = new Local();
        local.nameLocal = eventDataList.nameLocal;
        local.address = eventDataList.address;
        local.city = eventDataList.city;
        local.latitude = eventDataList.latitude;
        local.longitude = eventDataList.longitude;
        var types = new Types();
        types.nameTypes = eventDataList.nameTypes;


        const repoEvent = AppDataSource.getRepository(Events)
        const existEvent = await repoEvent.findOne({where: {link: event.link}})
        if(existEvent){
            await repoEvent.update(existEvent.eventId, event);
        }else{
            await repoEvent.manager.save(event);
        }
        const repoLocal = AppDataSource.getRepository(Local)
        const existLocal = await repoLocal.findOne({where:{address: local.address}});
        if (!existLocal){
            local =  await repoLocal.manager.save(local);
        }else {
            local = existLocal;
        }

        const repoTypes = AppDataSource.getRepository(Types);
        const existTypes = await repoTypes.findOne({where:{nameTypes: types.nameTypes}});

        if(!existTypes){
            types = await repoTypes.manager.save(types);
        } else {
            types = existTypes;
        }

        const eventToTypes = {
            types: types,
            events: repoEvent.getId(event)
        };

        const eventToLocal={
            events: repoEvent.getId(event),
            local: local
        }
        await AppDataSource.getRepository(Events_to_local).save(eventToLocal);
        await AppDataSource.getRepository(EventsToTypes).save(eventToTypes)
        console.log(eventData);
    }
}
