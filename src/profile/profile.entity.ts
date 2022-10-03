import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn({ type: "integer" })
    ProfileID: number;

    //To-do add relation with auth entity
    @PrimaryColumn({ type: "integer" })
    UserID: number;

    //To-do add relation with auth entity
    @PrimaryColumn({ type: "varchar", length: 100 })
    Email: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    CreateDate: Date;

    @Column({ type: "varchar", length: 100 })
    Name: string;

    @Column({ type: "integer" })
    Phone: number;

    @Column({ type: "varchar", length: 200 })
    ProfilePicture: string;

    @Column({ type: "varchar", length: 100 })
    Company: string;
}
