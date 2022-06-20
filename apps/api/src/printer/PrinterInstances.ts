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
        virtual: true,
        status: "idle"
    },
    {
        uuid: v4(),
        name: "printer01",
        ip: "192.168.1.20",
        port: "8081",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true,
        status: "error"
    }, 
    {
        uuid: v4(),
        name: "printer02",
        ip: "192.168.1.20",
        port: "8082",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true,
        status: "paused"
    }, 
    {
        uuid: v4(),
        name: "printer03",
        ip: "192.168.1.20",
        port: "8083",
        appid: "printman",
        key: "F5165607E2F34353BDB703B03055E6B0",
        virtual: true,
        status: "printing"
    }
]

export default PrinterInstances