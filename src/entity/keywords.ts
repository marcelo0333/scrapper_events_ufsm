import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'keyword'})

export class KeywordEntity{
    @PrimaryGeneratedColumn()
    public keywordId?: number;
    @Column()
    public nameKeyword?: string;
}