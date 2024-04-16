import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Events_to_local} from "./join/events_to_local";
import {EventsToKeyword} from "./join/events_to_keyword";

@Entity({ name: 'events' })

export class Events{
    @PrimaryGeneratedColumn({ name:'event_id'})
    public eventId?: number;

    @Column({ unique: false, nullable: true, type: 'varchar', name:'event_name'})
    public eventName?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public centerName?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public contact?: string;
    // @Column({ unique: false, nullable: true, type: 'varchar'})
    // public typeEvent?:string;
    @Column({unique:true, nullable:false, type:'varchar'})
    public link?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public description?:string;
    @Column({ unique: false, nullable: true, type: 'varchar', name:'image_event'})
    public imageEvent?:string;
    @Column({ unique: false, nullable: true, type: 'varchar', name:'date_event'})
    public dateEvent?: string;
    @OneToMany(() => Events_to_local, (eventToLocal)=>eventToLocal.events)
    eventToLocal: Events_to_local[]

    @OneToMany(() => EventsToKeyword, (eventToKeyword)=>eventToKeyword.events)
    eventToKeyword: EventsToKeyword[]
}