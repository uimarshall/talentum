import mongoose, { Schema, Document } from 'mongoose';
import { bcryptHashValue, compareValue } from '../../shared/utils/bcryptHash';

interface UserPreferences {
  enable2FA: boolean;
  twoFactorSecret?: boolean;
  emailNotifications: boolean;
}

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  // emailVerificationToken: string;
  createdAt: Date;
  updatedAt: Date;

  preferences: UserPreferences;
  comparePassword: (password: string) => Promise<boolean>;
}

const userPreferencesSchema = new Schema<UserPreferences>({
  enable2FA: { type: Boolean, default: false },
  twoFactorSecret: { type: String, required: false },
  emailNotifications: { type: Boolean, default: true },
});

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    // emailVerificationToken: { type: String, required: false },
    preferences: { type: userPreferencesSchema, default: {} },
  },
  {
    timestamps: true,
    toJSON: {},
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcryptHashValue(this.password);
  }

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await compareValue(password, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.preferences.twoFactorSecret;
    return ret;
  },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
