import { CategoriaEnum } from '../../../../common/enum/categoria-enum';

export interface CriarProdutoDTO {
  descricao: string;
  valor: number;
  categoria: CategoriaEnum;
}
