export const toCssUnit = (token: string | number) => {
  if (typeof token === "string") return token;
  else return `${token}px`;
};
