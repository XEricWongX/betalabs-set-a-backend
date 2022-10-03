import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn({ type: "integer" })
    UserID: number;

    @PrimaryColumn({ type: "varchar", length: 100 })
    Email: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    CreateDate: Date;

    @Column({ type: "varchar", length: 100 })
    Password: string;
}
