import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  async createByMetaMask(userDto: CreateUserDto) {
    const valid_address = await this.findByMetaMask(userDto.address);
    const valid_name = await this.findUserName(userDto.username);
    const validator_email = await this.findEmail(userDto.email);
    if (valid_address !== null) {
      throw new UnprocessableEntityException({
        StatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: "已註冊過，請到登入頁面。",
      });
    } else if (valid_name !== null) {
      throw new UnprocessableEntityException({
        StatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: "此名稱已被註冊，請換使用者名稱。",
      });
    } else if (validator_email !== null) {
      throw new UnprocessableEntityException({
        StatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: "此信箱已被註冊，請換信箱註冊。",
      });
    }
    const user = new UserEntity();
    user.address = userDto.address;
    user.username = userDto.username;
    user.email = userDto.email;
    await user.save();
    return {
      StatusCode: HttpStatus.CREATED,
      message: "創建成功",
    };
  }

  async findByMetaMask(address) {
    const validator = await UserEntity.findOne({
      where: {
        address: address,
      },
    });
    return validator;
  }

  async findUserName(username: string): Promise<UserEntity | undefined> {
    const validator = await UserEntity.findOne({
      where: {
        username: username,
      },
    });
    return validator;
  }

  async findEmail(email: string): Promise<UserEntity | undefined> {
    const validator = await UserEntity.findOne({
      where: {
        email: email,
      },
    });
    return validator;
  }
}
