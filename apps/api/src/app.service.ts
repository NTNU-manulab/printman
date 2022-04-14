import { Injectable } from "@nestjs/common"
import { json } from "stream/consumers"

@Injectable()
export class AppService {
  getHello(): string {
    return "Fuck the World!"
  }
}
