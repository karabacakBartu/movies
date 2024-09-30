import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movies.controller';
import { MovieRepository } from './movies.repository';
import { Movie, MovieSchema } from './schema/movie.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  providers: [MoviesService, MovieRepository],
  controllers: [MovieController],
})
export class MoviesModule {}
