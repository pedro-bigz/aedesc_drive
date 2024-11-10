import { Controller, Get, Param } from '@nestjs/common';
import { SpreadsheetService } from './spreadsheet.service';
import { Sheets } from 'src/google';

@Controller('spreadsheet')
export class SpreadsheetController {
  constructor(private readonly spreadsheetService: SpreadsheetService) {}

  @Get('metadata/:spreadsheetId')
  public getSheets(@Param('spreadsheetId') spreadsheetId: string) {
    return this.spreadsheetService.getSheetMetadata({ spreadsheetId });
  }

  @Get('values/:spreadsheetId/:range')
  public getValues(
    @Param('spreadsheetId') spreadsheetId: string,
    @Param('range') range: string,
  ) {
    return this.spreadsheetService.getSheetValues({ spreadsheetId, range });
  }

  @Get('non-published/:spreadsheetId/:range')
  public getNonPublished(
    @Param('spreadsheetId') spreadsheetId: string,
    @Param('range') range: string,
  ) {
    return this.spreadsheetService.getNonPublished({ spreadsheetId, range });
  }
}
