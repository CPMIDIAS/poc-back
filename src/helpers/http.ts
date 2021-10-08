// export interface HttpResponse {
//   statusCode: number
//   body: any
// }

// export interface HttpRequest {
//   body?: any
// }

export class HttpResponse {
  status: number;
  body?: any;
  constructor(status: number, body: any) {
    this.status = status;
    this.body = body;
  }
}
