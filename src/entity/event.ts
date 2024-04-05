import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'events' })

export class EventEntity{
    @PrimaryGeneratedColumn()
    public eventId?: number;

    @Column({ unique: true, nullable: false, type: 'varchar'})
    public eventTitle?: string;
    @Column()
    public authorName?: string;
    @Column()
    public campusName?: string;
    @Column()
    public typeEvent?:string;
    @Column()
    public description?: string;
    @Column()
    public imageEvent?: string;
    @Column()
    public dateInitial?: Date;
    @Column()
    public dateFinal?: Date;

}