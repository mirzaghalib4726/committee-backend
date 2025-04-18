import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [Number], required: true })
  contributions: number[];

  @Prop()
  bankName?: string;

  @Prop({ required: true, unique: true })
  bankAccountNo: string;

  @Prop({ type: String, enum: ['User', 'Admin'], required: true })
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

  @Prop({
    type: Map,
    of: Boolean,
    default: {},
    required: false,
  })
  paymentStatus?: Map<string, boolean>;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
