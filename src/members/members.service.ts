import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member, MemberDocument } from './entities/member.entity';

interface MonthValue {
  month: string;
  value: number;
}

interface MemberWithMonths extends Member {
  months: string[];
  values: number[];
  monthValues: MonthValue[];
}

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    try {
      const createdMember = new this.memberModel(createMemberDto);
      return createdMember.save();
    } catch (error) {
      const mongoError = error as { code?: number };
      if (mongoError.code === 11000) {
        // MongoDB duplicate key error
        throw new ConflictException('Name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<MemberWithMonths[]> {
    const members = await this.memberModel
      .find()
      .sort({ contribution: -1 })
      .exec();

    const allowedMonths = members.map((member) => {
      let months: string[] = [];
      let values: number[] = [];

      // Convert name to lowercase for case-insensitive comparison
      const name = member.name.toLowerCase();

      // Assign months based on name
      if (name === 'faran') {
        months = ['July'];
        values = [600000];
      } else if (name === 'airaj') {
        months = ['May'];
        values = [600000];
      } else if (name === 'usama') {
        months = ['August'];
        values = [600000];
      } else if (name === 'mohsin' || name === 'ubaid') {
        months = ['June'];
        values = [300000];
      } else if (name === 'wajih') {
        months = ['September'];
        values = [300000];
      } else if (name === 'haseeb') {
        months = ['September', 'November'];
        values = [300000, 600000];
      } else if (['umar', 'asad', 'muhamman', 'foxy'].includes(name)) {
        months = ['October'];
        values = [150000];
      }

      // Return member with months added
      return {
        ...member.toObject(),
        months,
        values,
        monthValues: months.map((month, index) => ({
          month,
          value: values[index],
        })),
      };
    });

    return allowedMonths;
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

  async remove(id: string): Promise<void> {
    await this.memberModel.findByIdAndDelete(id).exec();
  }
}
