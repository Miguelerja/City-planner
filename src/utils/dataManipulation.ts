export const parseDate = (date: string) => {
  const result = date.match(/\d{4}-\d{2}-\d{2}/);
  if(result === null) return;

  const parsedDate = result[0];
  return parsedDate.split('-').reverse().join('-');
};
