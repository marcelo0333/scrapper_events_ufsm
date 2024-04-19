import "reflect-metadata"
import { DataSource } from "typeorm"
import { Events } from "../entity/events";
import { Types } from "../entity/types"
import { Local } from "../entity/local";
import {getEventData} from "../scrape/getEvents";
import {Events_to_local} from "../entity/join/events_to_local";
import {EventsToTypes} from "../entity/join/events_to_types";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "1234",
    database: "eventsDB",
    synchronize: true,
    logging: true,
    entities: [Events, Types, Local, Events_to_local, EventsToTypes],
    migrations: [],
    subscribers: [],
})
AppDataSource.initialize()
    .then(() => {
        getEventData();
    })
    .catch((error) => console.log(error))