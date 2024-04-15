import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
// import {EventsToLocal} from "./join/events_to_local";

@Entity({name: 'local'})


export class Local{

    @PrimaryGeneratedColumn()
    public localId?: number;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public nameLocal?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public address?:string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public city?:string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public latitude?: string;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public longitude?: string;

}