import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'keyword'})

export class Keywords{
    @PrimaryGeneratedColumn()
    public keywordId?: number;
    @Column({ unique: false, nullable: true, type: 'varchar'})
    public nameKeyword?: string;
}