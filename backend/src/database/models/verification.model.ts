import mongoose, { Document, Schema } from 'mongoose';
import { VerificationEnum } from '../../shared/enums/verificationCode.enum';
import { generateUniqueCode } from '../../shared/utils/uuid';

export interface VerificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: VerificationEnum;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const verificationCodeSchema = new Schema<VerificationCodeDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    code: { type: String, unique: true, required: true, default: generateUniqueCode },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>('VerificationCode', verificationCodeSchema);

export default VerificationCodeModel;
