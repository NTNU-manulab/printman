// import * as dotenv from 'dotenv'
// dotenv.config()

import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { PrinterModule } from "./printer/printer.module"
import { WebsocketModule } from "./websocket/websocket.module"
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Printer } from "./printer/printer.entity"


const host = process.env.DB_HOST
const port = parseInt(process.env.DB_PORT)
const user = process.env.DB_USER
const pass = process.env.DB_PASS 
const db_name = process.env.DB_DATABASE_NAME

@Module({
  imports: [
    PrinterModule, 
    WebsocketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: host,
      port: port,
      username: user,
      password: pass,
      database: db_name,
      entities: [Printer],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private printerSource: DataSource) {
    // console.log(host, port, user, pass, db_name)


  }
}
