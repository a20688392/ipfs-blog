import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

import { AuthAddressCheckDto } from "./dto/auth-address-dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async userCheck(checkDto: AuthAddressCheckDto) {
    const { address } = checkDto;
    const user = await this.usersService.findByMetaMask(address);
    if (!user) {
      throw new NotFoundException({
        message: "無此使用者。",
      });
    }
    return {
      StatusCode: HttpStatus.OK,
      message: "有此使用者。",
    };
  }
}
