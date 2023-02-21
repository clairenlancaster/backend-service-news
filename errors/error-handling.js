function handle404NonExistantPaths(request, response, next) {
  response.status(404).send({ msg: "Path not found" });
}

function handleServerErrors(error, request, response, next) {
  response.status(500).send({ msg: "Server error" });
}

module.exports = { handle404NonExistantPaths, handleServerErrors };
