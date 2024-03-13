import { Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class Utils {
  private readonly logger = new Logger(Utils.name);
}
