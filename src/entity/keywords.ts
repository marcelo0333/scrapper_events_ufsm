import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {EventsToKeyword} from "./join/events_to_keyword";

@Entity({name: 'keyword'})

export class Keywords{
    @PrimaryGeneratedColumn({name: 'keyword_id'})
    public keywordId?: number;
    @Column({ unique: true, nullable: true, type: 'varchar'})
    public nameKeyword?: string;

    @OneToMany(() => EventsToKeyword, (eventToKeyword)=>eventToKeyword.keyword)
    eventToKeyword: EventsToKeyword[]
}