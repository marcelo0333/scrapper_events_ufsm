import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {EventsToTypes} from "./join/events_to_types";

@Entity({name: 'type_events'})

export class Types {
    @PrimaryGeneratedColumn({name: 'types_id'})
    public typesId?: number;
    @Column({ unique: true, nullable: true, type: 'varchar', name:'name_types'})
    public nameTypes?: string;

    @OneToMany(() => EventsToTypes, (eventsToTypes)=>eventsToTypes.types)
    eventToKeyword: EventsToTypes[]
}