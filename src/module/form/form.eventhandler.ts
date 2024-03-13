import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { FormService } from './form.service';

@Controller()
export class FormEventHandler {
  constructor(private readonly formService: FormService) {}
}
