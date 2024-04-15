import axios from "axios";
import * as cheerio from 'cheerio';
import "reflect-metadata"
import {Column, DataSource} from "typeorm"
import { Events } from "../entity/events";
import { Keywords } from "../entity/Keywords"
import { Local } from "../entity/local";
// import { EventsToKeyword } from "../entity/join/events_to_keyword";
// import { EventsToLocal } from "../entity/join/events_to_local";
import {AppDataSource} from "../database/data-source";
import {getEventLinks} from "./getEventLink";


export async function getEventData() {
    const eventLinks = await getEventLinks()

    const eventData = [];
    const keywordsData=  [];
    // const eventData = [];
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
        // Salvar os dados do evento
        const event = new Events();
        event.description = eventDataList.description;

        event.imageEvent = eventDataList.imageEvent;
        event.eventName = eventDataList.eventName;
        event.dateEvent = eventDataList.dateEvent;
        event.contact = eventDataList.contact;

        const savedEvent = AppDataSource.getRepository(Events)
        await savedEvent.manager.save(event);

        // Salvar os dados do local
        const local = new Local();
        local.nameLocal = eventDataList.nameLocal;
        local.address = eventDataList.address;
        local.city = eventDataList.city;
        local.latitude = eventDataList.latitude;
        local.longitude = eventDataList.longitude;

        const savedLocal = AppDataSource.getRepository(Local)
        await savedLocal.manager.save(local);
        // const eventToLocal = new EventsToLocal();
        // eventToLocal.event = savedEvent; // Assign the saved event directly
        // eventToLocal.local = savedLocal; // Assign the saved local directly
        //
        // await AppDataSource.getRepository(EventsToLocal).save(eventToLocal);

        const keyword = new Keywords();
        keyword.nameKeyword = eventDataList.nameKeyword;

        const savedKeyword = AppDataSource.getRepository(Keywords)
        await savedKeyword.manager.save(keyword);

    }

    console.log(eventData);

}
