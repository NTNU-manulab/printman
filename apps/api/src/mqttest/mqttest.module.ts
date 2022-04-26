import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices"


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://manulab.net:1883',
        }
      },
    ]),
  ]
})
export class MqtTestModule {}