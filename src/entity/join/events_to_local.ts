import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Events } from "../events";
import { Local } from "../local";

@Entity({ name: 'events_to_local' })
export class Events_to_local {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => Events, (events) => events.eventId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'eventId' })
    events: Repository<Events>;

    @ManyToOne(() => Local, (local) => local.localId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'localId' })
    local: Repository<Local>;
}

