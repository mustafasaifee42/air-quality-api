const { formatNumber } = require("./formatNumber");

const getHours = (startDate, endDate) => {
  let dates = [],
    addDays = (date, days) => {
      date.setDate(date.getDate() + days);
      return date;
    },
    currentDate = startDate;
  while (currentDate < endDate) {
    for (let i = 0; i < 24; i++) {
      dates.push(
        `${currentDate.getFullYear()}-${formatNumber(
          currentDate.getMonth() + 1
        )}-${formatNumber(currentDate.getDate())}T${formatNumber(i)}:00:00`
      );
    }
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

module.exports = { getHours };
