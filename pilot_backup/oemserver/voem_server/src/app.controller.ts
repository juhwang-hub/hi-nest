import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { green } from 'color-name'; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
   
}
