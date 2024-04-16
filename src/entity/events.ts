import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Events_to_local} from "./join/events_to_local";
import {EventsToKeyword} from "./join/events_to_keyword";

@Entity({ name: 'events' })

export class Events{
    @PrimaryGeneratedColumn()
    public eventId?: number;

    @Column({ unique: false, nullable: true, type: 'varchar'})
    public eventName?: string;
    // @Column({ unique: false, nullable: true, type: 'varchar'})
    // public centerName?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public contact?: string;
    // @Column({ unique: false, nullable: true, type: 'varchar'})
    // public typeEvent?:string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public description?:string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public imageEvent?:string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public dateEvent?: string;
    @OneToMany(() => Events_to_local, (eventToLocal)=>eventToLocal.events)
    eventToLocal: Events_to_local[]

    @OneToMany(() => EventsToKeyword, (eventToKeyword)=>eventToKeyword.events)
    eventToKeyword: EventsToKeyword[]
}