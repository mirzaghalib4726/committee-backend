import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: 0 })
  contribution: number;

  @Prop()
  bankName?: string;

  @Prop({ required: true, unique: true })
  bankAccountNo: string;

  @Prop({ enum: ['User', 'Admin'], required: true })
  userType: string;

  @Prop({
    type: [String],
    enum: [
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
    ],
    required: true,
  })
  receivableMonths: string[];
}

export const MemberSchema = SchemaFactory.createForClass(Member);
