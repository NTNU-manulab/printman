import { PrinterInstance } from "models";
import { v4 } from "uuid";

const PrinterInstances: PrinterInstance[] = [
    {
        uuid: v4(),
        name: "printer00",
        ip: "192.168.1.30",
        port: "5001",
        appid: "printman",
        key: "B0DC27D2A9674CBF95A26484687940F4",
        virtual: false
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