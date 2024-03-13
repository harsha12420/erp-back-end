export class ResponseBuilder {
  public statusCode: number;
  public message: string;
  public error: string;
  public data: any;
  public status: string;

  public static successMessage(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 200;
    rb.status = 'Success';
    rb.message = msg;
    return rb;
  }

  public static errorMessage(msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 500;
    rb.message = msg != null ? msg : 'Internal Server Error';
    rb.status = 'failed';
    return rb;
  }

  public static badRequest(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 400;
    rb.message = msg;
    rb.status = 'failed';
    return rb;
  }

  public static accepted(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 204;
    rb.message = msg;
    rb.status = 'Success';
    return rb;
  }

  public static data(result: any, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 200;
    rb.status = 'Success';
    rb.data = result ? result : [];
    rb.message = msg || null;
    return rb;
  }

  public static paginationData(result: any, total: number, limit = 10): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.statusCode = 200;
    rb.status = 'Success';
    rb.data = result ? { result, totalRecords: total, totalPages: Math.ceil(total / limit) } : [];
    return rb;
  }
}
