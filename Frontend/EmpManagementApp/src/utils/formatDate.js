export const formatDate = (dateString, type = 0) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  if (type === 1) return `${year}-${month}-${day}`;
  return `${year}/${month}/${day}`;
}

export const getLatestDate = (arr) => {
  if (!arr || arr.length <= 0) return 'NaN';

  const latest = arr.reduce((latest, current) => {
    const latestDate = Date.parse(latest.updatedate);
    const currentDate = Date.parse(current.updatedate);

    // console.log('latest.updatedate:', latest.updatedate, 'current.updatedate:', current.updatedate);
    // console.log('latestDate:', latestDate, 'currentDate:', currentDate);

    return currentDate > latestDate ? current : latest;
  });

  const latestDate = Date.parse(latest.updatedate);
  if (isNaN(latestDate)) {
    return 'NaN';
  }

  return formatDate(latest.updatedate);
};

export const getCurrentMonthYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
};