import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { v4 as uuidv4 } from "uuid";

import { GenerateNonceDto } from "./dto/auth-address-dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async generateNonce(MetaMaskDto: GenerateNonceDto) {
    const { address } = MetaMaskDto;
    const nonce = uuidv4();
    const user_data = await this.usersService.findByMetaMask(address);
    if (!user_data) {
      throw new NotFoundException({
        message: "無此使用者。",
      });
    }
    const user = new UserEntity();
    user.id = user_data.id;
    user.address = address;
    user.nonce = nonce;
    await user.save();
    return {
      StatusCode: HttpStatus.CREATED,
      nonce: nonce,
    };
  }
}
