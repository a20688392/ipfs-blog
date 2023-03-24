import { ApiProperty } from "@nestjs/swagger";

export class CheckFoundRespose {
  @ApiProperty({
    type: "number",
    description: "HTTP 回應代碼",
    example: "200",
  })
  public readonly StatusCode: number;

  @ApiProperty({
    type: "string",
    description: "回應訊息",
    example: "有此使用者",
  })
  public readonly message: string;
}
