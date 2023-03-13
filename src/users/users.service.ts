import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { getUsersByEmail } from "supertokens-node/recipe/thirdpartyemailpassword";

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: user
    });
  }

  async findOne(filter: Prisma.UserWhereInput) {
    return await this.prisma.user.findFirst({
      where: filter
    });
  }
  
  async getUserFromST(email: string) {
    let userData = await getUsersByEmail(email);
    let user = userData.find((val) => {
      return typeof val.thirdParty === "undefined"
    });
    return user;
  }

  async getAll() {
    return await this.prisma.user.findMany({
      orderBy: { id: "desc" }
    });
  }

  async deleteAll() {
    return await this.prisma.user.deleteMany();
  }
}