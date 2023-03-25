import { ApiProperty } from "@nestjs/swagger";

export class GenerateTokenRespose {
  @ApiProperty({
    type: "number",
    description: "HTTP 回應代碼",
    example: "201",
  })
  public readonly StatusCode: number;

  @ApiProperty({
    type: "string",
    description: "回應訊息",
    example: "創建 token",
  })
  public readonly message: string;
}
