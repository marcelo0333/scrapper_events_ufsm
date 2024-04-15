// import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
// import { Events } from "../Events";
// import { Local } from "../Local";
//
// @Entity({name:'events_to_local'})
// export class EventsToLocal {
//     @PrimaryGeneratedColumn()
//     public id?: number;
//
//     @ManyToOne(() => Events, (events) => events.eventId, { onDelete: 'CASCADE' })
//     @JoinColumn({ name: 'eventId' })
//     events: Events = new Events();
//
//     @ManyToOne(() => Local, (local) => local.localId,{ onDelete: 'CASCADE' })
//     @JoinColumn({ name: 'localId' })
//     locals: Local = new Local();
// }
