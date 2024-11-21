import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { PaginationAuthorDto } from './dto/pagination-author.dto';
@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepository.save({
      ...createAuthorDto,
      birthDate: new Date(createAuthorDto.birthDate),
    });
  }

  async findAll(paginationDto: PaginationAuthorDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.authorRepository.findAndCount({
      skip,
      take: limit,
      order: {
        name: 'asc',
      },
    });

    return {
      authors: data,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: string) {
    const author = this.authorRepository.findOne({
      where: {
        id,
      },
    });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const author = await this.findOne(id);
    if (!author) throw new NotFoundException('Author not found');
    await this.authorRepository.delete(id);
  }
}
