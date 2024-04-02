import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'events' })

export class EventEntity{
    @PrimaryGeneratedColumn()
    public eventId?: number;

    @Column({ unique: true, nullable: false, type: 'varchar'})
    public eventName?: string;
    @Column()
    public authorName?: string;
    @Column()
    public typeEvent?:string;
    @Column()
    public description
    @Column()
    public imageEvent
    @Column()
    public dateInitial?: Date;
    @Column()
    public dateFinal?: Date;

}