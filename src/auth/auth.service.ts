import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { recoverPersonalSignature } from "eth-sig-util";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { v4 as uuidv4 } from "uuid";

import { GenerateNonceDto, LoginDto } from "./dto/auth-address-dto";

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
  async generateToken(MetaMaskDto: LoginDto) {
    const { address, signature } = MetaMaskDto;
    const user_data = await this.usersService.findByMetaMask(address);

    if (!user_data) {
      throw new ForbiddenException({
        message: "Problem with signature verification.",
      });
    }

    const recoveredAddr = recoverPersonalSignature({
      data: user_data.nonce,
      sig: signature,
    });

    if (recoveredAddr.toLowerCase() !== address.toLowerCase()) {
      throw new ForbiddenException({
        message: "Signature is not correct.",
      });
    }
    //save your user here (i.e var user = await this.usersService.createWalletAccountIfNotExist(createUserDto);)
    // const payload: JwtUser = {
    //   account_address: metamaskAddress,
    // };

    // const access_token = this.jwtService.sign(payload);
    // return access_token;
    return recoveredAddr;
  }
}
