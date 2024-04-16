import "reflect-metadata"
import { DataSource } from "typeorm"
import { Events } from "../entity/events";
import { Keywords } from "../entity/keywords"
import { Local } from "../entity/local";
import {getEventData} from "../scrape/getEvents";
import {Events_to_local} from "../entity/join/events_to_local";
import {EventsToKeyword} from "../entity/join/events_to_keyword";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "eventsDB",
    synchronize: true,
    logging: true,
    entities: [Events, Keywords, Local, Events_to_local, EventsToKeyword],
    migrations: [],
    subscribers: [],
})
AppDataSource.initialize()
    .then(() => {
        getEventData();
    })
    .catch((error) => console.log(error))