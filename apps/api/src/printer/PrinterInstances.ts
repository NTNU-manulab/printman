import { PrinterInstance } from "models";
import { v4 } from "uuid";

const PrinterInstances: PrinterInstance[] = [
    {
        uuid: v4(),
        name: "printer00",
        ip: "192.168.1.20",
        port: "8080",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true
    },
    {
        uuid: v4(),
        name: "printer01",
        ip: "192.168.1.20",
        port: "8081",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true
    }, 
    {
        uuid: v4(),
        name: "printer02",
        ip: "192.168.1.20",
        port: "8082",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true
    }, 
    {
        uuid: v4(),
        name: "printer03",
        ip: "192.168.1.20",
        port: "8083",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true
    },     
    {
        uuid: v4(),
        name: "printerD1",
        ip: "127.0.0.1",
        port: "8080",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true
    },
]

export default PrinterInstances