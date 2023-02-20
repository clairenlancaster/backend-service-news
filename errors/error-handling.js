
function handleInvalidRoutes (error, request, response, next) {
  console.log(error.code);
  response.status(404).send({ msg: 'Not found' });
}

function handleServerErrors (error, request, response, next) {
  console.log(error);
  response.status(500).send({ msg: 'Server error' });
};

module.exports = {handleInvalidRoutes, handleServerErrors}