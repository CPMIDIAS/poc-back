import { User } from "../models";
import { IUserPayload, UserRepository } from "../repositories/user.repository";
import { validate } from "class-validator";
import { badRequest, okRequest, serverError } from "../helpers/http.helper";
import { HttpResponse } from "../helpers/http";

export class UserService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async getUsers(): Promise<Array<User>> {
    return await this.userRepository.getAll();
  }

  async getUser(id: number): Promise<User | null> {
    const user = await this.userRepository.get(id);
    return user;
  }

  async createUser(payload: IUserPayload): Promise<HttpResponse> {
    try {
      const user = new User(payload)
      const userErrors = await validate(user)

      if(userErrors.length > 0) return badRequest(userErrors)

      const userRecord = await this.userRepository.create(payload)
      return okRequest(userRecord)
    } catch(e) {
      return serverError(new Error('error'))
    }
  }
}
