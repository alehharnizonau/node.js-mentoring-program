const response = (
  res,
  { data = {}, status = 200, options = { "Content-Type": "application/json" } }
) => {
    res.writeHead(status, options);
    res.end(JSON.stringify(data));
};

module.exports = { response };