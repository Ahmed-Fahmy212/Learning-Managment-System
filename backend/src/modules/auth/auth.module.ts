
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { EmailVerificationRepository } from './repositories/emailVerification.repository';
import { Nodemailer } from '@crowdlinker/nestjs-mailer';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        JwtStrategy,
        AuthService,
        LocalStrategy,
        EmailVerificationRepository,
        RefreshTokenGuard, RefreshTokenStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [JwtAuthGuard],
})
export class AuthModule { }