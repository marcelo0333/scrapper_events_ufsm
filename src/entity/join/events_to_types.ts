import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events";
import { Types} from "../types"

@Entity({name:'events_to_types'})

export class EventsToTypes {
    @PrimaryGeneratedColumn()
    id?: number;
    @ManyToOne(()=>Events,{onDelete: "CASCADE"})
    @JoinColumn({name: 'event_id'})
    events?:Events;

    @ManyToOne(()=>Types,{onDelete: "CASCADE"})
    @JoinColumn({name: 'types_id'})
    types?:Types;
}