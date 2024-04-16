import axios from "axios";
import * as cheerio from 'cheerio';
import "reflect-metadata"
import {Column, DataSource} from "typeorm"
import { Events } from "../entity/events";
import { Keywords } from "../entity/keywords"
import { Local } from "../entity/local";
import { EventsToKeyword } from "../entity/join/events_to_keyword";
import { Events_to_local } from "../entity/join/events_to_local";
import {AppDataSource} from "../database/data-source";
import {getEventLinks} from "./getEventLink";


export async function getEventData() {
    const eventLinks = await getEventLinks()

    const eventData = [];

    for (const url of eventLinks) {
        const text = await axios.get(url).then(r => r.data);
        const $ = cheerio.load(text);

        $('#main-section > article > article').each((index, element) => {
            const eventDataList = {
                imageEvent: $(element).find('img.w-100').attr('src'),
                eventName: $(element).find('h1.entry-title').text().trim(),
                nameKeyword: $(element).find('span.badge').text().trim(),
                dateEvent: $(element).find('p.mb-0').text().trim(),
                imgDesc: $(element).find('img').attr('src'),
                description: $(element).find('p').text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
                contact: $(element).find('div:nth-child(2) > div.row.contato > div > div > p:nth-child(2)').text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
                nameLocal: $(element).find('p.m-0').text().trim(),
                address: $($(element).find(' div > div.row.localizacao > div > div').children()[1]).text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
                city: $($(element).find(' div > div.row.localizacao > div > div').children()[2]).text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(),
                latitude: $(element).find('div:nth-child(2) > div.row.localizacao > div:nth-child(2) > div > div').attr('data-map-lat'),
                longitude: $(element).find('div:nth-child(2) > div.row.localizacao > div:nth-child(2) > div > div').attr('data-map-lng'),
            }
            eventData.push(eventDataList);
        });
    }

    for (const eventDataList of eventData) {
        var event = new Events();
        event.description = eventDataList.description;
        event.imageEvent = eventDataList.imageEvent;
        event.eventName = eventDataList.eventName;
        event.dateEvent = eventDataList.dateEvent;
        event.contact = eventDataList.contact;
        var local = new Local();
        local.nameLocal = eventDataList.nameLocal;
        local.address = eventDataList.address;
        local.city = eventDataList.city;
        local.latitude = eventDataList.latitude;
        local.longitude = eventDataList.longitude;
        var eventToLocal = new Events_to_local();
        var eventToKeyword = new EventsToKeyword();
        var keyword = new Keywords();
        keyword.nameKeyword = eventDataList.nameKeyword;
        const savedEvent = AppDataSource.getRepository(Events)
        await savedEvent.manager.save(event);
        const savedLocal = AppDataSource.getRepository(Local)
        await savedLocal.manager.save(local);
        const savedKeyword = AppDataSource.getRepository(Keywords)
        await savedKeyword.manager.save(keyword);

        eventToLocal.events = savedEvent.getId(event);
        eventToLocal.local = savedLocal.getId(local);
        await AppDataSource.getRepository(Events_to_local).save(eventToLocal);
        eventToKeyword.events = savedEvent.getId(event);
        eventToKeyword.keyword = savedKeyword.getId(keyword);
        await AppDataSource.getRepository(EventsToKeyword).save(eventToKeyword)
        console.log(eventData);

    }

}
