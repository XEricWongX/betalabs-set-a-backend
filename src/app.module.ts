import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';
import { Profile } from './profile/profile.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'betalabs-set-a',
      entities: [Auth, Profile],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
