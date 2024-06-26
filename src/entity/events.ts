import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Events_to_local} from "./join/events_to_local";
import {EventsToTypes} from "./join/events_to_types";

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
    @Column({ unique: false, nullable: true, type: 'timestamp', name:'date_initial'})
    public dateInitial?: Date;
    @Column({ unique: false, nullable: true, type: 'timestamp', name:'date_final'})
    public dateFinal?: Date;
    @OneToMany(() => Events_to_local, (eventToLocal)=>eventToLocal.events)
    eventToLocal: Events_to_local[]

    @OneToMany(() => EventsToTypes, (eventsToTypes)=>eventsToTypes.events)
    eventsToTypes: EventsToTypes[]
}