import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Get(':email')
    async getLogin(@Param('email') email: string) {
        console.log('Email is: ', email);
        const res = await this.authService.authFindByEmail(email);
        if (res) {
            console.log('yes: ', res);
            return { code: 200, status: 'user found', res: res };
        } else {
            console.log('no: ', res)
            return { code: 404, status: 'not found' }
        }
    }

    @Post('sign-up')
    async postSignUp(@Body() auth: AuthDto) {
        let emailExist: Auth;
        emailExist = await this.authService.authFindByEmail(auth.Email);
        if (emailExist) {
            console.log('Sign up: email exist ', emailExist);
            return { code: 404, status: 'sign up fail' }
        }
        else {
            const signUp = await this.authService.userLogin(auth);
            if (signUp) {
                console.log('Sign up: new user ', signUp);
                console.log('Jwt: ', this.authService.authJwt(auth));
                return { code: 200, status: 'sign up success', access_token: this.authService.authJwt(auth) }
            } else {
                console.log('Sign up: something went wrong ', auth.Email)
                return { code: 404, status: 'sign up fail' }
            }
        }
    }

    @Post('sign-in')
    async postAuth(@Body() auth: AuthDto, @Query('info') info: string) {
        console.log('sing-in body: ', auth);
        const signIn = await this.authService.signIn(auth);
        if (signIn) {
            console.log((info) ? 'info: ' : 'Sign in: success ', signIn.Email);
            return { code: 200, status: 'sign in success', access_token: this.authService.authJwt(auth) }
        }
        else {
            console.log('Sign in: fail ', signIn);
            return { code: 404, status: 'sign in fail' }
        }
    }
}
