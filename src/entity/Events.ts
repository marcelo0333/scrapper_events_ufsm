import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
// import {EventsToLocal} from "./join/events_to_local";

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

}