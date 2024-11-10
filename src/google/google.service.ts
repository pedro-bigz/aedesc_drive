import { Injectable } from '@nestjs/common';
import { Sheets } from '../spreadsheet/utils/sheets.utils';
import { GoogleAuth } from './google.auth';
import { ConfigService } from '@nestjs/config';
import { SCOPES } from './google.constants';

@Injectable()
export class GoogleService {
  private auth: any;

  public constructor(private readonly configService: ConfigService) {}

  public authenticate() {
    this.auth = GoogleAuth.getInstance({
      keyFile: this.configService.get('GOOGLE_CREDENTIALS_PATH'),
      scopes: SCOPES,
    });

    return this.auth;
  }
}
