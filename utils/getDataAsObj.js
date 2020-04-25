const { formatNumber } = require("./formatNumber");

const getDataAsObj = (d) => {
  const data = d
    .split("% ")
    [d.split("% ").length - 1].split("\n")
    .map((el, i) => {
      if (i === 0) return el.replace("\r", "").split(", ");
      else return el.split("\t");
    });
  let dataAsObj = [];
  for (let i = 1; i < data.length; i++) {
    let obj = {};
    let objFinal = {};
    for (let k = 0; k < data[0].length; k++) {
      obj[data[0][k]] = parseFloat(data[i][k]);
      let dateTime = `${obj.Year}-${formatNumber(obj.Month)}-${formatNumber(
        obj.Day
      )}T${formatNumber(obj["UTC Hour"])}:00:00`;
      objFinal["DateTime"] = dateTime;
      objFinal["PM2.5"] = obj["PM2.5"];
      objFinal["PM10_mask"] = obj["PM10_mask"];
    }
    dataAsObj.push(objFinal);
  }
  return dataAsObj;
};

module.exports = { getDataAsObj };
