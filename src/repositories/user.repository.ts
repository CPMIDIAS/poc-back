import { getRepository } from "typeorm";
import { User } from "../models";

export interface IUserPayload {
  name: string;
  email: string;
}

export class UserRepository {
  async getAll(): Promise<Array<User>> {
    const userRepository = getRepository(User);
    return userRepository.find();
  }

  async create(payload: IUserPayload): Promise<User> {
    const userRepository = getRepository(User);
    const user = new User();
    return userRepository.save({
      ...user,
      ...payload,
    });
  }

  async get(id: number): Promise<User | null> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: id });
    if (!user) return null;
    return user;
  }
}
