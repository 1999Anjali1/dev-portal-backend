import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Developer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  company!: string;
}