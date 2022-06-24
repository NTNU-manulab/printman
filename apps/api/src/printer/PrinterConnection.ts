import { PrinterInstance, PrinterStateModel } from "models";
import axios from 'axios'
import { Printer } from "./printer.entity"
import { Injectable } from "@nestjs/common"


var WebSocketClient = require("websocket").client
// var WebSocketConnection = require("websocket").connection

@Injectable()
export class PrinterConnection {

    printer: Printer
    client: any
    session: string
    user: string
    state: PrinterStateModel

    //todo: refactor to printer module
    //todo: implement emitter on state update

    //todo: change PrinterInstance to printer.entity
    //todo: add connection error handling (connectivity check)

    //todo: find a way to set printer.entity.status from current.status.text. 
    //  Event emitter? onStatusChange or something.
    constructor(printer: Printer){
        this.printer = printer

        this.client = new WebSocketClient()

        this.state = {
            uuid: this.printer.uuid,
            name: this.printer.name
        }
        
        
        this.connect()
        
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
                JSON.stringify({subscribe:{state: {logs: false}}}))
            connection.send(
                JSON.stringify({throttle: 2}))
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