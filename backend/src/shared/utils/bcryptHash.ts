import bcrypt from 'bcrypt';

export const bcryptHashValue = async (password: string, saltRounds: number = 10) => {
  // const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hash(password, saltRounds);
};
export const compareValue = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
