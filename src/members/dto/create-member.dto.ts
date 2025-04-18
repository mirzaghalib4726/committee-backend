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

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  contributions: number[];

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  bankAccountNo?: string;

  @IsEnum(['User', 'Admin'])
  userType: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(MONTHS, {
    each: true,
    message: 'Each month must be one of: ' + MONTHS.join(', '),
  })
  @Type(() => String)
  receivableMonths: string[];
}
