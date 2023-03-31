import { ApiProperty } from "@nestjs/swagger";

export class CreateUserError {
  @ApiProperty({
    type: "number",
    description: "HTTP 回應代碼",
    example: "422",
  })
  public readonly statusCode: number;

  @ApiProperty({
    type: "array",
    description: "錯誤訊息",
    items: {
      properties: {
        address: {
          description:
            "address 為必填欄位。\n" +
            "address 長度只有 42 個字元。" +
            "已註冊過，請到登入頁面。" +
            "此名稱已被註冊，請換使用者名稱。" +
            "此信箱已被註冊，請換信箱註冊。",
          type: "string",
        },
      },
    },
    example: "已註冊過，請到登入頁面。",
  })
  public readonly error: string[];
}
