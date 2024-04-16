import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {EventsToKeyword} from "./join/events_to_keyword";

@Entity({name: 'keyword'})

export class Keywords{
    @PrimaryGeneratedColumn()
    public keywordId?: number;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public nameKeyword?: string;

    @OneToMany(() => EventsToKeyword, (eventToKeyword)=>eventToKeyword.keyword)
    eventToKeyword: EventsToKeyword[]
}