import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProfileDto } from 'src/dto/profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        private authService: AuthService,
    ) { }

    findAll(): Promise<Profile[]> {
        return this.profileRepository.find();
    }

    async findOne(Email: string): Promise<Profile> {
        return await this.profileRepository.findOneBy({ Email: Email });
    }

    async remove(Email: string): Promise<void> {
        await this.profileRepository.delete(Email);
    }

    async updateProfile(profileObj: ProfileDto) {
        const profile = await this.profileRepository.findOneBy({ Email: profileObj.Email });
        if (profile) {
            console.log('profile found');
            profile.Name = profileObj.Name;
            profile.Phone = profileObj.Phone;
            profile.ProfilePicture = profileObj.ProfilePicture;
            profile.Company = profileObj.Company;
            return this.profileRepository.save(profile);
        } else {
            console.log('profile cant found');
            const auth = await this.authService.authFindByEmail(profileObj.Email)
            profileObj.UserID = auth.UserID;
            const createProfile = this.profileRepository.create(profileObj);
            return this.profileRepository.save(createProfile);
        }

    }

}
