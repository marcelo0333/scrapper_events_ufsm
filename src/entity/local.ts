import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Events_to_local} from "./join/events_to_local";

@Entity({name: 'local'})


export class Local{

    @PrimaryGeneratedColumn({name:'local_id'})
    public localId?: number;
    @Column({ unique: false, nullable: true, type: 'varchar', name:'name_local'})
    public nameLocal?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public address?:string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public city?:string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public latitude?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public longitude?: string;
    @OneToMany(()=>Events_to_local, (eventToLocal)=>eventToLocal.events)
    eventToLocal: Events_to_local[]

}