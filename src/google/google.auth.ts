import { Auth, google, GoogleApis } from 'googleapis';
import { cwd } from 'process';
import { join } from 'path';

interface GoogleAuthProps {
  keyFile: string;
  scopes: string[];
}

export class GoogleAuth {
  private auth: Auth.GoogleAuth;
  private client: any;
  public google: GoogleApis;

  private static instance: GoogleAuth;

  private constructor({ keyFile, scopes }: GoogleAuthProps) {
    this.google = google;
    this.auth = new google.auth.GoogleAuth({
      keyFile: join(cwd(), keyFile),
      scopes,
    });
    this.client = this.auth.getClient();
  }

  public static getInstance(args?: GoogleAuthProps) {
    if (!GoogleAuth.instance && !args) {
      throw new Error('GoogleAuthProps is required');
    }
    if (!GoogleAuth.instance && args) {
      GoogleAuth.instance = new GoogleAuth(args);
    }

    return GoogleAuth.instance;
  }

  public getAuth() {
    return this.auth;
  }

  public getCliente() {
    return this.client;
  }
}
