import { PrinterInstance, PrinterStateModel } from "models";
import axios from 'axios'
import { CompressionTypes } from "@nestjs/microservices/external/kafka.interface";

var WebSocketClient = require("websocket").client
// var WebSocketConnection = require("websocket").connection

export class PrinterConnection {

    printer: PrinterInstance
    client: any
    session: string
    user: string
    state: PrinterStateModel

    constructor(printer: PrinterInstance){
        this.printer = printer

        this.client = new WebSocketClient()

        // console.log(`PrinterConnection: ${this.printer.name}`)
        // console.log(`this: ${JSON.stringify(this)}`)
        // console.log(`client: ${JSON.stringify(this.client)}`)
        this.state = {
            uuid: this.printer.uuid,
            name: this.printer.name
        }
        
        this.connect()
        
        // console.log(this.state)
        // if (printer.name === "printer00") {
        //     setInterval(() => {
        //         console.log(this.printer.name)

        //         console.log(this.state.current)

        //     }, 5000)
        // }
    }

    async connect(){
        let resp = await axios.post(
            `http://${this.printer.ip}:${this.printer.port}/api/login`,
            {"passive": true},
            {
                headers: {
                    'Authorization': `Bearer ${this.printer.key}`
                }
            }
        ).then(res => res.data).catch(err => console.log(err))
        
        this.user = resp.name
        this.session = resp.session

        console.log(this.session)
        

        this.client.connect(
            `ws://${this.printer.ip}:${this.printer.port}/sockjs/websocket`)
        
        this.client.on('connect', (connection) => {            
            connection.send(
                JSON.stringify({subscribe:{state: true}}))
            connection.send(
                JSON.stringify({auth: `${this.user}:${this.session}`}))
                
        connection.on('message', (message) => {
            // this.state = JSON.parse(message.utf8Data.current)
            let current = JSON.parse(message.utf8Data).current
            this.state.current = current

            // console.log(message)
        })
        })
        
    }



}