import { firstValueFrom } from 'rxjs';
import { IMovie } from './interface/IMovie';
import { HttpService } from '@nestjs/axios';
import { MovieRepository } from './movies.repository';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/createmovie.dto';

@Injectable()
export class MoviesService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private httpService: HttpService,
    private readonly movieRepository: MovieRepository,
  ) {
    this.apiKey = process.env['TMDB_API_KEY'];
    this.baseUrl = process.env['TMDB_BASE_URL'];
  }

  async fetchAndSaveMovies() {
    try {
      const filmIds = await this.fetchOldestMovies();

      await filmIds.map((id) => this.saveMovie(id));

      return { message: 'Succesful!' };
    } catch (error) {
      console.error('An error occurred:', error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async saveMovie(id: string) {
    const movieDetails = await this.fetchMovieDetails(id);

    const isMovieExist = await this.movieRepository.getMovieByName(
      movieDetails.original_title,
    );

    if (!isMovieExist) {
      const movieToSave: IMovie = {
        name: movieDetails.original_title,
        overview: movieDetails.overview,
        popularity: movieDetails.popularity,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
        releaseDate: movieDetails.release_date,
        genre: movieDetails.genres.map((genre) => ({
          id: genre.id.toString(),
          name: genre.name,
        })),
      };

      await this.movieRepository.create(movieToSave);
    }
  }

  async fetchOldestMovies() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/discover/movie`, {
        params: {
          api_key: this.apiKey,
          sort_by: 'release_date.asc',
          'vote_count.gte': 1500,
          'vote_average.gte': 8.4,
          with_watch_providers: '8',
          watch_region: 'TR',
          page: 1,
        },
      }),
    );

    const films = response.data.results.slice(0, 5);

    return films.map((film) => film.id);
  }

  async fetchMovieDetails(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/movie/${id}`, {
        params: {
          api_key: this.apiKey,
        },
      }),
    );

    return response.data;
  }

  async findById(id: string) {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new HttpException('Movie Is Not Found!!!', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async findAll() {
    const movies = await this.movieRepository.findAll();

    if (!movies.length) {
      throw new HttpException(
        'No movies found in the database.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movies;
  }

  async removeById(id: string) {
    const movie = await this.movieRepository.removeById(id);

    if (!movie) {
      throw new HttpException('Movie Is Not Found!!!', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async create(dto: CreateMovieDto) {
    const isMovieExist = await this.movieRepository.getMovieByName(dto.name);

    if (isMovieExist) {
      throw new HttpException('Movie is already exist!!!', HttpStatus.CONFLICT);
    }

    return this.movieRepository.create(dto);
  }
}
