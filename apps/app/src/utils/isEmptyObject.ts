export const isEmptyObject = (obj: unknown): boolean => {
  if (obj === null || obj === undefined) {
    return false;
  }

  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }

  return Object.keys(obj).length === 0;
};
