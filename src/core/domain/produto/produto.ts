import { CategoriaEnum } from '../../../common/enum/categoria-enum';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CriarProdutoDTO } from './dto/criarProdutoDTO';
import { EditarProdutoDTO } from './dto/editarProdutoDTO';

export class Produto {
  constructor(produto: CriarProdutoDTO | EditarProdutoDTO) {
    this.id = produto['id'];
    this.descricao = produto.descricao;
    this.valor = produto.valor;
    this.categoria = produto.categoria;
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
