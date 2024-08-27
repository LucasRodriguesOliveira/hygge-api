import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: "O campo 'name' é obrigatório.",
  })
  @MaxLength(50, {
    message:
      "O valor do campo 'name' é muito grande. O tamanho máximo é de $constraint1 caracteres, mas o inserido é de $value.",
  })
  @MinLength(3, {
    message:
      "O valor do campo 'name' é muito pequeno. O tamanho mínimo é de $constraint1 caracteres, mas o inserido é de $value.",
  })
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: "O campo 'description' é obrigatório.",
  })
  @MaxLength(150, {
    message:
      "O campo 'description' possui tamanho máximo de $constraint1 caracteres.",
  })
  @MinLength(5, {
    message:
      "O campo 'description' possui tamanho mínimo de $constraint1 caracteres.",
  })
  description?: string;

  @IsDefined()
  @IsOptional()
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '1,2',
  })
  @IsNumber()
  price?: number;
}
