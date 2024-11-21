import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { name: 'image_url', default: 'INSERT URL' })
  image: string;

  @Column('text')
  biography: string;

  @Column('text')
  overview: string;

  @Column('timestamp', { name: 'birth_date' })
  birthDate: Date;
}
