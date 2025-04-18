import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import {
  UpdateMemberDto,
  UpdateMemberPaymentStatusDto,
} from './dto/update-member.dto';
import { Member, MemberDocument } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    try {
      const createdMember = new this.memberModel(createMemberDto);
      const user = await createdMember.save();
      return user;
    } catch (error) {
      const mongoError = error as { code?: number; errorResponse?: any };
      if (mongoError.code === 11000) {
        // MongoDB duplicate key error
        throw new ConflictException(mongoError.errorResponse.errmsg);
      }
      throw error;
    }
  }

  async findAll(): Promise<Member[]> {
    const members = await this.memberModel
      .find()
      .sort({ bankAccountNo: 1 })
      .exec();

    return members;
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberModel.findById(id).exec();
    if (!member) {
      throw new Error(`Member with ID ${id} not found`);
    }
    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.memberModel
      .findByIdAndUpdate(id, updateMemberDto, { new: true })
      .exec();
    if (!member) {
      throw new Error(`Member with ID ${id} not found`);
    }
    return member;
  }

  async payment_status(
    id: string,
    updateMemberDto: UpdateMemberPaymentStatusDto,
  ): Promise<Member> {
    try {
      const { month, receiverId, paid } = updateMemberDto;
      const member = await this.memberModel.findByIdAndUpdate(
        id,
        { $set: { [`paymentStatus.${month}_${receiverId}`]: paid } },
        { new: true },
      );
      if (!member) {
        throw new Error(`Member with ID ${id} not found`);
      }
      return member;
    } catch (e) {
      throw new HttpException(e.message, e.status || 500);
    }
  }

  async remove(id: string): Promise<void> {
    await this.memberModel.findByIdAndDelete(id).exec();
  }
}
