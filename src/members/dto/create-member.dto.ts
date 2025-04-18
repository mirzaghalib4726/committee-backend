import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

const MONTHS = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export class CreateMemberDto {
  @IsString()
  name: string;

  @IsNumber()
  contribution: number;

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  bankAccountNo?: string;

  @IsEnum(['User', 'Admin'])
  userType: string;

  @IsArray()
  @ArrayNotEmpty() // Optional: Ensures the array is not empty
  @IsIn(MONTHS, {
    each: true, // Validates each element in the array
    message: 'Each month must be one of: ' + MONTHS.join(', '),
  })
  @Type(() => String) // Ensures proper deserialization of array elements
  receivableMonths: string[];
}
