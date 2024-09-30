import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MovieDocument = Movie & Document;

@Schema({ collection: 'netflix.movies' })
export class Movie {
  //@ApiProperty allows Swagger to recognize the fields
  @ApiProperty({ type: String, required: true })
  @Prop({ type: String, default: () => uuidv4() }) //To use UUID instead of ObjectId
  _id: string;

  @ApiProperty({
    type: String,
    example: "Schindler's List",
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    type: String,
    example: 'The true story of how businessman Oskar Schindler...',
  })
  @Prop({ type: String, required: true })
  overview: string;

  @ApiProperty({ type: Number, example: 53.209 })
  @Prop({ type: Number, required: true })
  popularity: number;

  @ApiProperty({ type: Number, example: 8.6 })
  @Prop({ type: Number, required: true })
  voteAverage: number;

  @ApiProperty({ type: Number, example: 12612 })
  @Prop({ type: Number, required: true })
  voteCount: number;

  @ApiProperty({
    type: String,
    example: '1993-11-30',
  })
  @Prop({ type: String, required: true })
  releaseDate: string;

  @ApiProperty({
    type: [{ id: String, name: String }],
    example: [
      { id: '18', name: 'Drama' },
      { id: '36', name: 'History' },
    ],
  })
  @Prop({ type: [{ id: String, name: String }], required: true }) // to create the fields inside Genre
  genre: { id: string; name: string }[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
