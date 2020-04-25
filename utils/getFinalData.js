const { groups, min, max, mean } = require("d3-array");

const getHourlyData = (data, dateTimes) => {
  let dataFinal = dateTimes.map((date) => {
    const indx = data.findIndex((d1) => d1.DateTime === date);
    let obj = {};
    if (indx === -1) {
      obj["DateTime"] = date;
      obj["PM2.5"] = null;
      obj["PM10_mask"] = null;
    } else obj = data[indx];
    return obj;
  });
  return dataFinal;
};

const getDailyData = (data, dateTimes) => {
  let dataTemp = dateTimes.map((date) => {
    const indx = data.findIndex((d1) => d1.DateTime === date);
    let obj = {};
    if (indx === -1) {
      obj["DateTime"] = date;
      obj["PM2.5"] = null;
      obj["PM10_mask"] = null;
    } else obj = data[indx];
    obj["Date"] = date.split("T")[0];
    return obj;
  });
  let dataGroupedByDates = groups(dataTemp, (d) => d.Date);
  let dataFinal = dataGroupedByDates.map((el) => {
    let obj = {},
      length = el[1].length,
      filteredPM2_5 = [...el[1]].filter((d) => d["PM2.5"] !== null),
      filteredPM10 = [...el[1]].filter((d) => d["PM10_mask"] !== null);
    obj["Date"] = el[0];
    obj["PM2.5"] = {};
    obj["PM2.5"]["minValue"] =
      filteredPM2_5.length === 0 ? null : min(filteredPM2_5, (d) => d["PM2.5"]);
    obj["PM2.5"]["maxValue"] =
      filteredPM2_5.length === 0 ? null : max(filteredPM2_5, (d) => d["PM2.5"]);
    obj["PM2.5"]["avgValue"] =
      filteredPM2_5.length === 0
        ? null
        : mean(filteredPM2_5, (d) => d["PM2.5"]);
    obj["PM2.5"]["noOfObservations"] = filteredPM2_5.length;
    obj["PM2.5"]["totalNoOfPossibleObservations"] = length;
    obj["PM10_mask"] = {};
    obj["PM10_mask"]["minValue"] =
      filteredPM10.length === 0
        ? null
        : min(filteredPM10, (d) => d["PM10_mask"]);
    obj["PM10_mask"]["maxValue"] =
      filteredPM10.length === 0
        ? null
        : max(filteredPM10, (d) => d["PM10_mask"]);
    obj["PM10_mask"]["avgValue"] =
      filteredPM10.length === 0
        ? null
        : mean(filteredPM10, (d) => d["PM10_mask"]);
    obj["PM10_mask"]["noOfObservations"] = filteredPM10.length;
    obj["PM10_mask"]["totalNoOfPossibleObservations"] = length;
    return obj;
  });
  return dataFinal;
};

const getMonthlyData = (data, dateTimes) => {
  let dataTemp = dateTimes.map((date) => {
    const indx = data.findIndex((d1) => d1.DateTime === date);
    let obj = {};
    if (indx === -1) {
      obj["DateTime"] = date;
      obj["PM2.5"] = null;
      obj["PM10_mask"] = null;
    } else obj = data[indx];
    obj["Month"] = `${date.split("-")[0]}-${date.split("-")[1]}`;
    return obj;
  });
  let dataGroupedByMonths = groups(dataTemp, (d) => d.Month);
  let dataFinal = dataGroupedByMonths.map((el) => {
    let obj = {},
      length = el[1].length,
      filteredPM2_5 = [...el[1]].filter((d) => d["PM2.5"] !== null),
      filteredPM10 = [...el[1]].filter((d) => d["PM10_mask"] !== null);
    obj["Month"] = el[0];
    obj["PM2.5"] = {};
    obj["PM2.5"]["minValue"] =
      filteredPM2_5.length === 0 ? null : min(filteredPM2_5, (d) => d["PM2.5"]);
    obj["PM2.5"]["maxValue"] =
      filteredPM2_5.length === 0 ? null : max(filteredPM2_5, (d) => d["PM2.5"]);
    obj["PM2.5"]["avgValue"] =
      filteredPM2_5.length === 0
        ? null
        : mean(filteredPM2_5, (d) => d["PM2.5"]);
    obj["PM2.5"]["noOfObservations"] = filteredPM2_5.length;
    obj["PM2.5"]["totalNoOfPossibleObservations"] = length;
    obj["PM10_mask"] = {};
    obj["PM10_mask"]["minValue"] =
      filteredPM10.length === 0
        ? null
        : min(filteredPM10, (d) => d["PM10_mask"]);
    obj["PM10_mask"]["maxValue"] =
      filteredPM10.length === 0
        ? null
        : max(filteredPM10, (d) => d["PM10_mask"]);
    obj["PM10_mask"]["avgValue"] =
      filteredPM10.length === 0
        ? null
        : mean(filteredPM10, (d) => d["PM10_mask"]);
    obj["PM10_mask"]["noOfObservations"] = filteredPM10.length;
    obj["PM10_mask"]["totalNoOfPossibleObservations"] = length;
    return obj;
  });
  return dataFinal;
};

module.exports = { getHourlyData, getDailyData, getMonthlyData };
