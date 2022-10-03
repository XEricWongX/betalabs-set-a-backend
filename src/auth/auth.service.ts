import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthDto } from 'src/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private authRepository: Repository<Auth>,
        private jwtService: JwtService,
    ) { }

    findAll(): Promise<Auth[]> {
        return this.authRepository.find();
    }

    authFindByEmail(Email: string): Promise<Auth> {
        return this.authRepository.findOneBy({ Email });
    }

    signIn(body: AuthDto): Promise<Auth> {
        return this.authRepository.findOneBy({ Email: body.Email, Password: body.Password });
    }

    async remove(Email: string): Promise<void> {
        await this.authRepository.delete(Email);
    }

    async userLogin(loginObj: AuthDto) {
        loginObj['Password'] = 'hahahaabc123';
        const login = this.authRepository.create(loginObj);
        return this.authRepository.save(login);
    }

    async authJwt(user: AuthDto) {
        const payload = { email: user.Email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
