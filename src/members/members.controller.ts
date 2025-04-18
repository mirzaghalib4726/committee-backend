import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import {
  UpdateMemberDto,
  UpdateMemberPaymentStatusDto,
} from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post('create')
  @UsePipes(new ValidationPipe()) // Enable validation
  async create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  async findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    return this.membersService.update(id, updateMemberDto);
  }

  @Patch(':id/payment-status')
  @UsePipes(new ValidationPipe())
  async payment_status(
    @Param('id') id: string,
    @Body() updateMemberPaymentStatusDto: UpdateMemberPaymentStatusDto,
  ): Promise<Member> {
    return this.membersService.payment_status(id, updateMemberPaymentStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.membersService.remove(id);
  }
}
