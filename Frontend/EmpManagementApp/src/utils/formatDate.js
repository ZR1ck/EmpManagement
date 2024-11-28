export const formatDate = (dateString, type = 0) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  if (type === 1) return `${year}-${month}-${day}`;
  return `${year}/${month}/${day}`;
}