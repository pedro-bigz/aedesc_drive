import { Module } from '@nestjs/common';
import { SpreadsheetService } from './spreadsheet.service';
import { SpreadsheetController } from './spreadsheet.controller';
import { GoogleModule } from 'src/google';

@Module({
  imports: [GoogleModule],
  controllers: [SpreadsheetController],
  providers: [SpreadsheetService],
})
export class SpreadsheetModule {}
