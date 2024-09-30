export interface IMovie {
  name: string;

  overview: string;

  popularity: number;

  voteAverage: number;

  voteCount: number;

  releaseDate: string;

  genre: Array<IGenre>;
}

export interface IGenre {
  id: string;
  name: string;
}
