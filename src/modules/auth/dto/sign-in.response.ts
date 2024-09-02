import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({
    type: String,
    description:
      'access token to be used to access the endpoints in the application',
  })
  access_token: string;
}
