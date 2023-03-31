import { ApiProperty } from "@nestjs/swagger";

export class GenerateTokenRespose {
  @ApiProperty({
    type: "number",
    description: "HTTP 回應代碼",
    example: "201",
  })
  public readonly statusCode: number;

  @ApiProperty({
    type: "string",
    description: "產生 accesstoken",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYWRkcmVzcyI6IjB4RUZhNEFiYWM3RmVkQjhGMDUxNGJlRTcyMTJkYzE5RDUyM0REMzA4OSIsImVtYWlsIjoiQW5keUBnbWFpbC5jb20iLCJpYXQiOjE2Nzk3NDM4NzUsImV4cCI6MTY3OTgzMDI3NX0.sm2aIH1SMIpEnEYlISxgt_VYyuNVnXI3sITA0oXrtCs",
  })
  public readonly accessToken: string;

  @ApiProperty({
    type: "array",
    description: "User 資料",
    items: {
      properties: {
        id: {
          description: "使用者 ID。  \n",
          type: "string",
        },
        name: {
          description: "使用者 名稱。  \n",
          type: "string",
        },
        address: {
          description: "使用者 錢包地址。  \n",
          type: "string",
        },
        email: {
          description: "使用者 信箱。  \n",
          type: "string",
        },
        photo: {
          description: "使用者 圖片。  \n",
          type: "string",
        },
      },
    },
    example: {
      id: 1,
      name: "Jhon",
      address: "0x264D6BF791f6Be6F001A95e895AE0a904732d473",
      email: "jhon@gmail.com",
      photo:
        "https://www.gravatar.com/avatar/490311069a0a679192286d1ab009ae9a?s=800&d=identicon",
    },
  })
  public readonly userData: string[];
}
