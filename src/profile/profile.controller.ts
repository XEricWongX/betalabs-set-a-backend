import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProfileDto } from 'src/dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get()
    async getProfile(@Query('email') email: string) {
        const profile = this.profileService.findOne(email)
        console.log(`profile: find by email ${email} `, profile)
        return { code: 200, status: 'profile found', profile: profile }
    }

    @Post()
    async postProfile(@Body() body: ProfileDto) {
        const res = await this.profileService.updateProfile(body);
        console.log('profile: body is ', body);
        return { code: 200, status: 'Update success' };
        if (res) {
            console.log('profile updated: user ID ', body.UserID);
            return { code: 200, status: 'profile updated', res }
        } else {
            console.log('profile update fail: user ID ', body.UserID);
            return { code: 400, status: 'profile update fail' }
        }
    }
}
