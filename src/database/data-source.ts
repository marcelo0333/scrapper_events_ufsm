import "reflect-metadata"
import { DataSource } from "typeorm"
import { Events } from "../entity/Events";
import { Keywords } from "../entity/Keywords"
import { Local } from "../entity/local";
// import { EventsToKeyword } from "../entity/join/events_to_keyword";
// import { EventsToLocal } from "../entity/join/events_to_local";
import {getEventData} from "../scrape/getEvents";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "1234",
    database: "db-full-secure",
    synchronize: true,
    logging: true,
    entities: [Events, Keywords, Local],
    migrations: [],
    subscribers: [],
})
AppDataSource.initialize()
    .then(() => {
        getEventData();
    })
    .catch((error) => console.log(error))