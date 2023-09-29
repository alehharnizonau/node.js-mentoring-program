const response = (
  res,
  { data = {}, status = 200, contentType = "application/json" }
) => {
    res.writeHead(status, { "Content-Type": contentType });
    res.end(JSON.stringify(data));
};

module.exports = { response };