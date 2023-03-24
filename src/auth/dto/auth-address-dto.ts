import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class AuthAddressDto {
  @ApiProperty({
    description: "使用者錢包ID",
    example: "0x264D6BF791f6Be6F001A95e895AE0a904732d473",
    minLength: 42,
    maxLength: 42,
  })
  @IsNotEmpty({
    message: "address 為必填欄位。",
  })
  @Length(42, 42, { message: "address 長度只有 42 個字元。" })
  @IsString()
  public readonly address: string;

  @ApiProperty({
    required: true,
    description: "metamask 驗證碼",
    example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    minLength: 132,
    maxLength: 132,
  })
  @IsNotEmpty()
  @IsString()
  @Length(132, 132)
  public readonly nonce: string;

  @ApiProperty({
    required: true,
    description: "Signature nonce",
    example:
      "0xc5f30a1b7b9a036f8e92b8f4105129bdc29520c6d22f04a1c9e474b47a2c5ead35f2027143eb932cde364f9cc9259fe268afa94f947ce31e8082180a55120fe01b",
    minLength: 132,
    maxLength: 132,
  })
  @IsNotEmpty()
  @IsString()
  @Length(132, 132)
  public readonly signature: string;
}

export class AuthAddressCheckDto extends PickType(AuthAddressDto, [
  "address",
] as const) {}
