import { Controller, Delete, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @Delete()
  async deleteAll() {
    return await this.usersService.deleteAll();
  }
  
}