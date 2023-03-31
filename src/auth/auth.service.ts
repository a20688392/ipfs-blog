import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { recoverPersonalSignature } from "eth-sig-util";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { v4 as uuidv4 } from "uuid";

import { GenerateNonceDto, LoginDto } from "./dto/auth-address-dto";
import { JwtUser } from "./jwt/models/jwt.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
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
      statusCode: HttpStatus.CREATED,
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

    const payload: JwtUser = {
      id: user_data.id,
      address: address,
      email: user_data.email,
    };
    const userData = {
      id: user_data.id,
      name: user_data.username,
      address: address,
      emai: user_data.email,
      photo:
        "https://www.gravatar.com/avatar/490311069a0a679192286d1ab009ae9a?s=800&d=identicon",
    };
    const access_token = this.jwtService.sign(payload);
    return {
      statusCode: HttpStatus.CREATED,
      access_token,
      userData,
    };
  }
}
