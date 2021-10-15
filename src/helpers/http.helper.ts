import { ServerError } from "./errors/server.error";
import { HttpResponse } from "./http";

export const createdRequest = (data: any): HttpResponse =>
  new HttpResponse(201, { data: data })

// incluir campo pagination no body
export const okRequest = (data: any): HttpResponse =>
  new HttpResponse(200, { data: data })

export const badRequest = (data: any): HttpResponse =>
  new HttpResponse(400, { error: data })

export const NotFoundRequest = (data: string): HttpResponse =>
  new HttpResponse(404, { error: `No ${data} found` })

export const serverError = (error: Error): HttpResponse =>
  new HttpResponse(500, { error: new ServerError(error.stack) })
