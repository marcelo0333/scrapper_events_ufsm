import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { EventEntity } from "../event";
import { LocalEntity } from "../local";


@Entity({name: 'events_to_local'})

export class EventsToLocal{
    @ManyToOne(()=>EventEntity,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'eventId'})
    event?: EventEntity;

    @ManyToOne(()=>LocalEntity,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'localId'})
    local?: LocalEntity;}