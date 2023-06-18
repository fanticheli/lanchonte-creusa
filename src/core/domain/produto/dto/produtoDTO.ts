import { CategoriaEnum } from '../../../../common/enum/categoria-enum';

export interface ProdutoDTO {
  id: string;
  descricao: string;
  valor: number;
  categoria: CategoriaEnum;
}
