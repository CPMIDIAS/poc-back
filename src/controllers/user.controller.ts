import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { HttpResponse } from "../helpers/http";
import { User } from "../models";
import { IUserPayload } from "../repositories/user.repository";
import { UserService } from "../service/user.service";

@Route("users")
@Tags("User")
export default class UserController {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return await this.userService.getUsers();
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<HttpResponse> {
    return this.userService.createUser(body);
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return this.userService.getUser(Number(id));
  }
}
