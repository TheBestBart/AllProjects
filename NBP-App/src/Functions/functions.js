export const getPercent = (firstValue, secondValue, maxLenght = 6) => {
  return ((firstValue / secondValue) * 100 - 100)
    .toString()
    .slice(0, maxLenght);
};

export const getDateInISOStandard = dateInMilliseconds => {
  let date = new Date(dateInMilliseconds);

  return date.toISOString().slice(0, 10);
};

export const getWeekAgoDate = dateFromNbpAPI => {
  let now = getDateToGetWeekAgoDateFunction(dateFromNbpAPI);
  let weekAgo = new Date(now) - 6 * 86400000;

  return getDateInISOStandard(weekAgo);
};

export const getDateToGetWeekAgoDateFunction = dateFromNbpAPI => {
  let day = dateFromNbpAPI.slice(8);
  let month = dateFromNbpAPI.slice(5, 7);
  let year = dateFromNbpAPI.slice(0, 4);

  return `${month} ${day}, ${year}`;
};

export const getCurrentDateInMillisecondsFromAPI = () => {
  let oneDayInMilliseconds = 86400000;
  let todayInMilliseconds = Date.now();
  let today = new Date(todayInMilliseconds);

  if (today.getDay() === 0) {
    return todayInMilliseconds - 2 * oneDayInMilliseconds;
  } else if (today.getDay() === 6) {
    return todayInMilliseconds - oneDayInMilliseconds;
  }

  return todayInMilliseconds;
};

export const getWeekAgoDateInMillisecondsFromAPI = () => {
  return getCurrentDateInMillisecondsFromAPI() - 6 * 86400000;
};

export const getColor = (index, colorOdd, colorEven) => {
  return index % 2 === 0 ? colorOdd : colorEven;
};
