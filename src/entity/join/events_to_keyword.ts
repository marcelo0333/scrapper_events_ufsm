import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events";
import { Keywords} from "../keywords"

@Entity({name:'events_to_keyword'})

export class EventsToKeyword{
    @PrimaryGeneratedColumn()
    id?: number;
    @ManyToOne(()=>Events,{onDelete: "CASCADE"})
    @JoinColumn({name: 'event_id'})
    events?:Events;

    @ManyToOne(()=>Keywords,{onDelete: "CASCADE"})
    @JoinColumn({name: 'keyword_id'})
    keyword?:Keywords;
}