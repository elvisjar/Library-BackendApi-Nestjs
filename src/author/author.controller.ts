import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthRoles, Roles } from 'src/auth/roles.decorator';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ImageValidatorBuild,
  ImageValidatorOptional,
} from 'src/common/pipes/fileValidations';
import { PaginationAuthorDto } from './dto/pagination-author.dto';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  AuthorAllDto,
  AuthorCreatedDto,
  AuthorDeletedDto,
  OneAuthorDto,
} from './dto/author-response.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // Route decorators
  @Post()
  @Roles(AuthRoles.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  // Swagger decorators
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAuthorDto })
  @ApiOperation({
    summary: 'Create a new author with image - Requires ADMIN role',
    description:
      'This endpoint use the CreateAuthorDto as body besides an image file',
  })
  @ApiCreatedResponse({
    type: AuthorCreatedDto,
  })
  // Route handler
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile(ImageValidatorBuild)
    image: Express.Multer.File,
  ): Promise<AuthorCreatedDto> {
    const author = await this.authorService.create(createAuthorDto);
    author.image = image.originalname;
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Author created successfully',
      data: author,
    };
  }

  // Route decorators
  @Get()
  // Swagger decorators
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all authors with pagination',
  })
  @ApiOkResponse({
    type: AuthorAllDto,
  })
  // Route handler
  async findAll(
    @Query() paginationDto: PaginationAuthorDto,
  ): Promise<AuthorAllDto> {
    const data = await this.authorService.findAll(paginationDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Authors fetched successfully',
      data,
    };
  }

  // Route decorators
  @Get(':id')
  // Swagger decorators
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get an author by id',
  })
  @ApiOkResponse({
    type: OneAuthorDto,
  })
  // Route handler
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<OneAuthorDto> {
    const author = await this.authorService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Author fetched successfully',
      data: author,
    };
  }

  // Route decorators
  @Patch(':id')
  @Roles(AuthRoles.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  // Swagger decorators
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAuthorDto })
  @ApiOperation({
    summary: 'Update an author by id - Requires ADMIN role',
    description:
      'This endpoint use the UpdateAuthorDto as body besides an image file, all fields are optional',
  })
  @ApiOkResponse({
    type: OneAuthorDto,
  })
  // Route handler
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @UploadedFile(ImageValidatorOptional)
    image: Express.Multer.File,
  ): Promise<OneAuthorDto> {
    const author = await this.authorService.update(id, updateAuthorDto);
    author.image = image?.originalname;
    return {
      statusCode: HttpStatus.OK,
      message: 'Author updated successfully',
      data: author,
    };
  }

  // Route decorators
  @Delete(':id')
  @Roles(AuthRoles.ADMIN)
  // Swagger decorators
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete an author by id - Requires ADMIN role',
  })
  @ApiOkResponse({
    type: AuthorDeletedDto,
  })
  // Route handler
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AuthorDeletedDto> {
    await this.authorService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Author deleted successfully',
    };
  }
}
