const formatNumber = (d) => {
  let d_updated = d < 10 ? `0${d}` : `${d}`;
  return d_updated;
};

module.exports = { formatNumber };
