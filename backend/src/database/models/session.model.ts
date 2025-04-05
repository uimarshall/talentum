import mongoose, { Document, Schema } from 'mongoose';
import { thirtyDaysFromNow } from '../../shared/utils/dateTime';

export interface SessionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  ipAddress: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<SessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    userAgent: { type: String, required: false },
    ipAddress: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    expiredAt: { type: Date, default: thirtyDaysFromNow, required: true },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
