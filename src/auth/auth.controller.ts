import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { AuthAddressCheckDto } from "./dto/auth-address-dto";
import { CheckEntityError } from "./exceptions/check-entity-error.exception";
import { CheckNotFoundError } from "./exceptions/check-notfound-error.exception";
import { CheckFoundRespose } from "./respose/check-found.respose";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("/login/:address")
  @ApiOkResponse({
    description: "有此使用者",
    type: CheckFoundRespose,
  })
  @ApiNotFoundResponse({
    description: "無此使用者",
    type: CheckNotFoundError,
  })
  @ApiUnprocessableEntityResponse({
    description: "資料格式不對",
    type: CheckEntityError,
  })
  @UsePipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: false,
      disableErrorMessages: false,
      whitelist: true,
    }),
  )
  async UserCheck(@Param() checkDto: AuthAddressCheckDto) {
    return this.authService.userCheck(checkDto);
  }
}
