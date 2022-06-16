interface PrinterInstance {
    uuid: string
    name: string
    ip: string
    port: string
    appid: string
    key: string
    virtual: boolean
    status: Status
}

type Status = "idle" | "printing" | "error" | "paused"

export default PrinterInstance