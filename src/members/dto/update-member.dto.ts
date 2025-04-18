import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}

export class UpdateMemberPaymentStatusDto {
  @IsEnum([
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
  ])
  month: string;

  @IsString()
  receiverId: string;

  @IsBoolean()
  paid: boolean;
}
