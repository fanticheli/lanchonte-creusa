import { CategoriaEnum } from '../../../../common/enum/categoria-enum';

export interface EditarProdutoDTO {
  id: string;
  descricao: string;
  valor: number;
  categoria: CategoriaEnum;
}
