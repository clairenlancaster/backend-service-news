

function handleServerErrors (error, request, response, next) {
  response.status(500).send({ msg: 'Server error' });
};

module.exports = {handleServerErrors}