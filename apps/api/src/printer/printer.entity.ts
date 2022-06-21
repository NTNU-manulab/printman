import { PrinterInstance } from 'models'
import { Interface } from 'readline'
import internal from 'stream'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Printer implements PrinterInstance{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    uuid: string

    @Column()
    name: string

    @Column()
    ip: string
    
    @Column()
    port: string
    
    @Column()
    appid: string

    @Column()
    key: string

    @Column()
    virtual: boolean

    @Column()
    status: string



}