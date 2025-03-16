export const formatDateToYYMMDD = (dateString: string): string => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${year.slice(-2)}.${month}.${day}`;
};
