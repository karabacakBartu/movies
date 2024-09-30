import { Model } from 'mongoose';
import { IMovie } from './interface/IMovie';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schema/movie.schema';

export class MovieRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
  ) {}

  /**
   *
   * @param input
   * @returns
   */
  async create(input: IMovie) {
    return await this.movieModel.create(input);
  }

  async findAll() {
    return await this.movieModel.find().lean().exec();
  }
  /**
   *
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.movieModel.findOne({ _id: id }).lean().exec();
  }

  /**
   *
   * @param name
   * @returns
   */
  async getMovieByName(name: string) {
    return await this.movieModel.findOne({ name }).lean().exec();
  }
  /**
   *
   * @param id
   * @returns
   */
  async removeById(id: string) {
    return await this.movieModel.findByIdAndDelete({ _id: id }).lean().exec();
  }
}
