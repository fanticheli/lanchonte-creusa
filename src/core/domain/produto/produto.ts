import { CategoriaEnum } from '../../../common/enum/categoria-enum';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CriarProdutoDTO } from './dto/criarProdutoDTO';

export class Produto {
  constructor(criarProdutoDTO: CriarProdutoDTO) {
    this.descricao = criarProdutoDTO.descricao;
    this.valor = criarProdutoDTO.valor;
    this.categoria = criarProdutoDTO.categoria;
  }

  id: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  descricao: string;

  @IsNumber({}, { message: 'Valor deve ser um número' })
  valor: number;

  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  @IsEnum(CategoriaEnum, { message: 'Categoria não é valida' })
  categoria: CategoriaEnum;
}
