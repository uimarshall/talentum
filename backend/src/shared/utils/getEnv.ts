// export const getEnv = (key: string, defaultValue: string = ''): string => {
//   const value = process.env[key];
//   if (value === undefined) {
//     if (defaultValue) {
//       return defaultValue;
//     }
//     throw new Error(`Enviroment variable ${key} is not set`);
//   }
//   return value;
// };

export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || defaultValue!;
};
