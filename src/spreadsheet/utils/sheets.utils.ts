import { sheets_v4 } from 'googleapis';
import { GoogleAuth } from '../../google/google.auth';

export interface SpreadsheetData {
  spreadsheetId: string;
  range?: string;
}

export const GOOGLE_SHEETS_DEFAULT_VERSION = 'v4';

export class Sheets {
  private auth: GoogleAuth;
  private sheets: sheets_v4.Sheets;

  public constructor(auth: GoogleAuth) {
    this.auth = auth;
    this.sheets = this.auth.google.sheets({
      version: GOOGLE_SHEETS_DEFAULT_VERSION,
      auth: this.auth.getAuth(),
    });
  }

  public getSheets() {
    return this.sheets;
  }

  public getSpreadsheets() {
    return this.sheets.spreadsheets;
  }

  public getSpreadsheetsMetadata({ spreadsheetId }: SpreadsheetData): any {
    return this.sheets.spreadsheets.get({
      auth: this.auth.getAuth(),
      spreadsheetId,
    });
  }

  public getSpreadsheetsValues({ spreadsheetId, range }: SpreadsheetData): any {
    return this.sheets.spreadsheets.values.get({
      auth: this.auth.getAuth(),
      spreadsheetId,
      range,
    });
  }
}
