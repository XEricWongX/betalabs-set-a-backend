import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from 'src/dto/profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

    findAll(): Promise<Profile[]> {
        return this.profileRepository.find();
    }

    findOne(Email: string): Promise<Profile> {
        return this.profileRepository.findOneBy({ Email });
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
            const createProfile = this.profileRepository.create(profileObj);
            return this.profileRepository.save(createProfile);
        }

    }

}
