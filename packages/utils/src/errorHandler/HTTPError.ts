class HTTPError {
  static handle(response: Response) {
    const error = new Error();

    switch (response.status) {
      case 400:
        error.name = "Bad Request";
        error.message = "The request was invalid or cannot be served.";
        break;
      case 401:
        error.name = "Unauthorized";
        error.message =
          "Authentication is required and has failed or has not yet been provided.";
        break;
      case 403:
        error.name = "Forbidden";
        error.message =
          "The request was valid, but the server is refusing action.";
        break;
      case 404:
        error.name = "Not Found";
        error.message = "The requested resource could not be found.";
        break;
      case 500:
        error.name = "Internal Server Error";
        error.message = "An error occurred on the server.";
        break;
      case 502:
        error.name = "Bad Gateway";
        error.message =
          "The server received an invalid response from the upstream server.";
        break;
      case 503:
        error.name = "Service Unavailable";
        error.message = "The server is currently unable to handle the request.";
        break;
      default:
        error.name = "HTTP Error";
        error.message = `An unexpected HTTP error occurred: ${response.status}`;
        break;
    }

    return error;
  }
}

export default HTTPError;
