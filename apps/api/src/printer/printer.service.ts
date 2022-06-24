import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import axios, { Axios, AxiosResponse } from "axios"
import { PrinterGridModel, PrinterInstance, PrinterStateModel } from "models"
// import generateMockPrinter from "src/mock/printerMock"
// import PrinterInstances from "./PrinterInstances"
import FormData = require("form-data")
import { Repository } from 'typeorm'
import { Printer } from "./printer.entity"
import { PrinterConnection } from "./PrinterConnection"
import { Observable } from "rxjs"


//todo: refactor all API usage to util method

@Injectable()
export class PrinterService {
  
  printerConnections: PrinterConnection[]
  printerStates: PrinterStateModel[]
  printerStateObservable: Observable<PrinterStateModel[]>

  constructor(
    private httpService: HttpService,
    @InjectRepository(Printer)
    private printerRepo: Repository<Printer>
  ) {

    this.printerConnections = []
    this.printerStates = []

    this.printerRepo.find({where: {virtual: false}})
      .then(printers =>
        printers.forEach(p =>
          this.printerConnections.push(new PrinterConnection(p))))
    
    this.printerStateObservable = new Observable(sub => {
      setInterval( () => { 
        this.printerConnections.forEach((pc, i) => this.printerStates[i] = pc.state) 
        sub.next(this.printerStates)
      }, 1000)
    })




    // axios.interceptors.request.use(req => {
    //   console.log("----- \n Axios Request: \n-----")
    //   console.log(req)
    //   return req
    // })

    // axios.interceptors.response.use(res => {
    //   console.log("----- \n Axios response: \n-----")
    //   console.log(res)
    //   return res
    // })
  }


  // Printers: PrinterInstance[] = PrinterInstances

  getPrinterStateObservable(): Observable<PrinterStateModel[]> {
    return this.printerStateObservable
  }

  getPrinters(): PrinterStateModel[] {
    return this.printerStates
    // const json = JSON.stringify(printers)
    // console.log(json)
  }

  // getPrinter(): PrinterGridModel[] {
  //   // console.log(printer)
  //   return generateMockPrinter(1)
  // }

  
  async getFiles(printerId: number): Promise<any> {
    // This axios GET request works to get file listing from OP, and the controller endpoint that uses it also returns the information correctly.
    let printer = this.printerRepo.findOneOrFail({where: {id: printerId}})

    if ((await printer)) {
    return await axios.get(
      'http://'+(await printer).ip+':'+(await printer).port+'/api/files', 
      {
        headers: {
          'Authorization': 'Bearer ' + (await printer).key
        }
      } 
      )
      .then( (res) => {
        let resdata =  res.data
        console.log(resdata)
        return resdata
      }
      )
      .catch( (err) => {
        console.log(err)
        return err.data
      } )
    }
  }

  async getPrinterSnapshot(): Promise<string | Buffer> {
    // const writer: fs.WriteStream = fs.createWriteStream("./snapshot.jpg")

    // const response = await this.httpService.axiosRef({
    //   url: "http://192.168.1.62/webcam/?action=snapshot",
    //   method: "GET",
    //   responseType: "stream",
    //   headers: { "x-api-key": "6C2AA26B39E03EDE5138BDEEEFF95F34" },
    // })

    // response.data.pipe(writer)

    // return new Promise<string | Buffer>((res, rej) => {
    //   writer.on("finish", res)
    //   writer.on("error", rej)
    // }).then(() => writer.path)
    return "./snapshot.png"
  }

  async postFileToPrinter(files: Array<Express.Multer.File> ): Promise<any> {
    
    const formData = new FormData()


    formData.append('print', 'true')
    formData.append('select', 'true')

    files.forEach( (f, i) => {
      // var blob = Buffer.from(f)
      formData.append('file', f.buffer, {filepath: `${Date.now()}-${f.originalname}`})
    })


    //todo: append "select" and "print" fields to form
    
    var printer = this.printerRepo.findOneOrFail({where: {status: "idle"}})

    // Needed for 'boundary' header in multipart
    var formHeaders = formData.getHeaders()

    // Get form length
    var formLength: number = formData.getLengthSync()


    var formBuff = formData.getBuffer()

    return await axios.post(
      `HTTP://${(await printer).ip}:${(await printer).port}/api/files/local`,
      // formBuff.toString('utf-8'),
      formBuff,
    {
      headers: {
        'Authorization': 'Bearer ' + (await printer).key,
        ...formHeaders,
        'Content-Length': formLength,
      }
    }).then(res => {
      let code = res.status
      switch(code){
        case 200: // OK
          return res.data
        case 400: // Bad Request
          // If no 'file' or 'foldername' are included in the request, 
          // userdata was provided but could not be parsed as JSON 
          // or the request is otherwise invalid.
        case 404: // Not Found
          // If 'location' ("api/files/[location]") is neither "local" nor "sdcard" or 
          // trying to upload to SD card and SD card support is disabled
        case 409: // Conflict
          // Trying to upload existing file. 
          // todo: handle this with an 'exists' check like OP frontend does.
        case 415: // Unsupported Media Type 
          // File is not .gcode or .stl.
          // todo: perform check first.
        case 500: // Internal Server Error
          // OctoPrint failure. Flag printer as faulty?

      }
      
    }
    ).catch(err => {
      console.log('---- \n Axios Error: \n----')
      console.log(err)
    })
  }
}
