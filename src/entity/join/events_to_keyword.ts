import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "../event";
import {KeywordEntity} from "../keywords" 

@Entity({name:'events_to_keyword'})

export class EventsToKeyword{
    @PrimaryGeneratedColumn()
    id?: number;
    @ManyToOne(()=>EventEntity,{onDelete: "CASCADE"})
    @JoinColumn({name: 'eventId'})
    event?:EventEntity;

    @ManyToOne(()=>KeywordEntity,{onDelete: "CASCADE"})
    @JoinColumn({name: 'keywordId'})
    keyword?:KeywordEntity;
}