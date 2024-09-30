import {
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class GenreDto {
  @ApiProperty({
    required: true,
    example: '28',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    required: true,
    example: 'Action',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateMovieDto {
  @ApiProperty({
    required: true,
    example: 'Inception',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example:
      'A skilled thief is offered a chance to have his past crimes erased.',
  })
  @IsString()
  @IsNotEmpty()
  overview: string;

  @ApiProperty({
    required: true,
    example: 78.9,
  })
  @IsNumber()
  @IsNotEmpty()
  popularity: number;

  @ApiProperty({
    required: true,
    example: 8.7,
  })
  @IsNumber()
  @IsNotEmpty()
  voteAverage: number;

  @ApiProperty({
    required: true,
    example: 12000,
  })
  @IsNumber()
  @IsNotEmpty()
  voteCount: number;

  @ApiProperty({
    required: true,
    example: '2010-07-16',
  })
  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({
    required: true,
    type: [GenreDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  genre: Array<GenreDto>;
}
