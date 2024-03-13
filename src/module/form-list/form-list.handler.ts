import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { FormListService } from './form-list.service';

@Controller()
export class FormListHandler {
  constructor(private readonly formListService: FormListService) {}

  @MessagePattern('admission.getFormList')
  storeStudentDetails(data: any) {
    return this.formListService.getFormList(data);
  }
}
