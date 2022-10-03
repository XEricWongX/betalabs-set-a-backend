import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProfileDto } from 'src/dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get()
    async getProfile(@Query('email') email: string) {
        const res: ProfileDto = await this.profileService.findOne(email)
        console.log(`profile: find by email ${email} `, res)
        return { code: 200, status: 'profile found', res: res }
    }

    @Post()
    async postProfile(@Body() body: ProfileDto) {
        console.log('profile: body is ', body);
        const res = await this.profileService.updateProfile(body);
        return { code: 200, status: 'Update success', profile: res };
    }
}
