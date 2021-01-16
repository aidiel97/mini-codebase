const success = (res, data, message) => {
  res.send({
    status: 'success',
    data,
    message
  });
};

const error = (res, message) => {
  res.send({
    status: 'error',
    message
  });
};

module.exports = {
  success,
  error
}