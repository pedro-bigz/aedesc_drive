import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GoogleModule } from './google';
import { SpreadsheetModule } from './spreadsheet';
import { CommonModule } from './common';
import { AuthController, AuthModule, AuthService } from './auth';
import { DriveModule } from './drive/drive.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    CommonModule,
    GoogleModule,
    SpreadsheetModule,
    AuthModule,
    DriveModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger],
  exports: [AuthService],
})
export class AppModule {}
