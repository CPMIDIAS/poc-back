import { ServerError } from "./errors/server.error";
import { HttpResponse } from "./http";

export const badRequest = (data: any): HttpResponse => new HttpResponse(400, data)

export const okRequest = (data: any): HttpResponse => new HttpResponse(200, data)

export const serverError = (error: Error): HttpResponse => new HttpResponse(500, new ServerError(error.stack))
