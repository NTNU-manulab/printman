import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { PrinterModule } from "./printer/printer.module"
import { WebsocketModule } from "./websocket/websocket.module"
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Printer } from "./printer/printer.entity"
@Module({
  imports: [
    PrinterModule, 
    WebsocketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.20',
      port: 55000,
      username: 'postgres',
      password: 'postgrespw',
      database: 'printers',
      entities: [Printer],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private printerSource: DataSource) {

  }
}
