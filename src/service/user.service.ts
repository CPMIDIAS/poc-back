import { User } from "../models";
import { IUserPayload, UserRepository } from "../repositories/user.repository";
import { validate } from "class-validator";
import { badRequest, createdRequest, NotFoundRequest, okRequest, serverError } from "../helpers/http.helper";
import { HttpResponse } from "../helpers/http";
import { validationErrorParser } from "../helpers/validation.helper";
import { QueryFailedError } from "typeorm";

export class UserService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async getUsers(): Promise<HttpResponse> {
    const users = await this.userRepository.getAll();
    return okRequest(users)
  }

  async getUser(id: number): Promise<HttpResponse> {
    const user = await this.userRepository.get(id);
    if (!user) return NotFoundRequest('user');
    return okRequest(user);
  }

  async createUser(payload: IUserPayload): Promise<HttpResponse> {
    try {
      const user = new User(payload)
      const userErrors = await validate(user)

      if(userErrors.length > 0) return badRequest(validationErrorParser(userErrors))

      const userRecord = await this.userRepository.create(payload)
      return createdRequest(userRecord)
    } catch(e) {
      console.log("#### debug e", e)
      if (e instanceof QueryFailedError){
        console.log("#### debug e.stack", e.stack)
        console.log("#### debug e.name", e.name)
        console.log("#### debug e.message", e.message)
      }
      return serverError(new Error('error'))
    }
  }
}
