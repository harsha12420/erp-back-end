import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { CustomFieldSeeder } from '../custom-field/custom-field.seeder';

@Injectable()
export class SeedCommand {
  constructor(private readonly customFieldSeeder: CustomFieldSeeder) {}

  @Command({
    command: 'seed',
    describe: 'Seed the database with initial data',
  })
  async handle() {
    await this.customFieldSeeder.seed();
    console.log('Seeding complete!');
  }
}
