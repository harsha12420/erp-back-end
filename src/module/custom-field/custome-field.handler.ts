import { CustomField } from './schemas/custom-field.schema';
import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomFieldService } from './custom-field.service';

@Controller()
export class CustomFieldHandler {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @MessagePattern('admission.getCustomeFieldList')
  storeStudentDetails() {
    return this.customFieldService.getFieldList();
  }
}
