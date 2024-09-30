import { IMovie } from './interface/IMovie';
import { MoviesService } from './movies.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/createmovie.dto';
import { ParamIdDto } from 'src/common/dto/paramid.dto';

@ApiTags('movies') // @ApiTags is used to group in Swagger
@Controller('movies')
export class MovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('fetch-and-save')
  @ApiResponse({
    status: 200,
    description: 'Movies fetched and saved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async fetchAndSaveMovies() {
    return this.moviesService.fetchAndSaveMovies();
  }

  @Get('find-by-id/:id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async findById(@Param() param: ParamIdDto): Promise<IMovie> {
    return this.moviesService.findById(param.id);
  }

  @Get('find-all')
  @ApiResponse({
    status: 200,
    description: 'List of all movies.',
  })
  @ApiResponse({ status: 404, description: 'Movies not found.' })
  async findAll(): Promise<IMovie[]> {
    return this.moviesService.findAll();
  }

  @Delete('remove-by-id/:id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Movie removed.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async removeById(@Param() param: ParamIdDto): Promise<IMovie> {
    return this.moviesService.removeById(param.id);
  }

  @Post('create')
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({ status: 201, description: 'The movie is saved successfully' })
  @ApiResponse({ status: 409, description: 'Movie is already exist.' })
  async save(@Body() createMovieDto: CreateMovieDto): Promise<IMovie> {
    return this.moviesService.create(createMovieDto);
  }
}
