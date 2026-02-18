class ApiResponse {
  static success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res, message = "Error", statusCode = 500) {
    return res.status(statusCode).json({
      status: "error",
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static notFound(res, message = "Not Found") {
    return res.status(404).json({
      status: "error",
      message,
      timestamp: new Date().toISOString(),
    });
  }
  static created(res, data, message = "Created") {
    return res.status(201).json({
      status: "success",
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static badRequest(res, message = "Bad Request") {
    return res.status(400).json({
      status: "error",
      message,
      timestamp: new Date().toISOString(),
    });
  }
}

export default ApiResponse;
