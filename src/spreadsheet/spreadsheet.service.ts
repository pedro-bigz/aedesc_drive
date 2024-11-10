import { Injectable } from '@nestjs/common';
import { GoogleService } from 'src/google';
import removeAccents from 'remove-accents';
import { STATUS } from './spreadsheet.constants';
import { Sheets, SpreadsheetData } from './utils';

const scopes: string[] = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
];

@Injectable()
export class SpreadsheetService {
  private sheets: Sheets;

  public constructor(private readonly googleService: GoogleService) {
    this.sheets = new Sheets(this.googleService.authenticate());
  }

  public getSheetMetadata({ spreadsheetId }: SpreadsheetData) {
    return this.sheets.getSpreadsheetsMetadata({ spreadsheetId });
  }

  public async getSheetValues({ spreadsheetId, range }: SpreadsheetData) {
    const { data } = await this.sheets.getSpreadsheetsValues({
      spreadsheetId,
      range,
    });

    const [cols, ...rows] = data.values;

    const normalizeColumnName = (colName: string) => {
      return removeAccents(colName).toLowerCase().replaceAll(' ', '_');
    };

    return rows.map((row: any[]) => {
      return Object.fromEntries(
        row.map((value, index) => [normalizeColumnName(cols[index]), value]),
      );
    });
  }

  public async getNonPublished(params: SpreadsheetData) {
    return this.getSheetValues(params).then((rows) =>
      rows.filter(
        (row: any) =>
          !row?.status || +row.status === STATUS.AGUARDANDO_POSTAGEM,
      ),
    );
  }
}
