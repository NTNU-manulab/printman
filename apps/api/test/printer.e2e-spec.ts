import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PrinterController } from '../src/printer/printer.controller';
import { PrinterService } from '../src/printer/printer.service';
import { PrinterModule } from 'src/printer/printer.module';

describe('PrinterController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [PrinterModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });


    it('should get files from OP API', () => {
        return request(app.getHttpServer())
        .get('/printer0/files')
        .expect(200)
        .expect({
            data: Object
        } 
        )
    })

    afterAll(async () => {
        await app.close();
      });
        

})