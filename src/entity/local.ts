import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'local'})


export class LocalEntity{

    @PrimaryGeneratedColumn()
    public localId?: number;
    @Column()
    public nameLocal?: string;
    @Column()
    public cep?:string;
    @Column('decimal', { precision: 10, scale: 8 })
    public latitude?: number;
    @Column('decimal', { precision: 11, scale: 8 })
    public longitude?: number;
}