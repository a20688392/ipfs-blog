import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { GenerateNonceDto } from "./dto/auth-address-dto";
import { CheckNotFoundError } from "./exceptions/check-notfound-error.exception";
import { GenerateNonceEntityError } from "./exceptions/generate-nonce-entity-error.exception";
import { GenerateNonceRespose } from "./respose/generate-nonce.respose";

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
    type: GenerateNonceEntityError,
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
}
