import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Repository} from "typeorm";
import { Events } from "../events";
import { Local } from "../local";

@Entity({ name: 'events_to_local' })
export class Events_to_local {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => Events, (events) => events.eventId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    events: Events

    @ManyToOne(() => Local, (local) => local.localId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'local_id' })
    local: Local
}

