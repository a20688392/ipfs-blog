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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { GenerateNonceDto, LoginDto } from "./dto/auth-address-dto";
import { CheckNotFoundError } from "./exceptions/check-notfound-error.exception";
import { GenerateNonceError } from "./exceptions/generate-nonce-error.exception";
import { GenerateTokenError } from "./exceptions/generate-token-error.exception";
import { GenerateNonceRespose } from "./respose/generate-nonce.respose";
import { GenerateTokenRespose } from "./respose/generate-token.respose";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Get("/login/:address")
  @ApiCreatedResponse({
    description: "產生 nonce",
    type: GenerateNonceRespose,
  })
  @ApiNotFoundResponse({
    description: "無此使用者",
    type: CheckNotFoundError,
  })
  @ApiUnprocessableEntityResponse({
    description: "資料格式不對",
    type: GenerateNonceError,
  })
  @UsePipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: false,
      disableErrorMessages: false,
      whitelist: true,
    }),
  )
  async generateNonce(@Param() MetaMaskDto: GenerateNonceDto) {
    return this.authService.generateNonce(MetaMaskDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/login/token")
  @ApiCreatedResponse({
    description: "產生 token",
    type: GenerateTokenRespose,
  })
  @ApiForbiddenResponse({
    description: "身份驗證錯誤",
    type: GenerateTokenError,
  })
  async metaMasklogin(@Body() MetaMaskDto: LoginDto) {
    return this.authService.generateToken(MetaMaskDto);
  }
}
