import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserError } from "./exceptions/create-error.exception";
import { UsersService } from "./users.service";

@ApiTags("User")
@Controller("users")
@UsePipes(
  new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    stopAtFirstError: false,
    disableErrorMessages: false,
    whitelist: true,
  }),
)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  @ApiCreatedResponse({
    description: "使用者創建成功",
  })
  @ApiUnprocessableEntityResponse({
    description: "創建失敗",
    type: CreateUserError,
  })
  @HttpCode(HttpStatus.CREATED)
  metaMaskcreate(@Body() metaMaskDto: CreateUserDto) {
    return this.usersService.createByMetaMask(metaMaskDto);
  }

  @Get(":username")
  findOne(@Param("username") username: string) {
    return this.usersService.findOne(username);
  }
}
