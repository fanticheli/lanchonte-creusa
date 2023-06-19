import { CategoriaEnum } from '../../../../common/enum/categoria-enum';
import { CriarProdutoDTO } from '../../../domain/produto/dto/criarProdutoDTO';
import { EditarProdutoDTO } from '../../../domain/produto/dto/editarProdutoDTO';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';

export interface IProdutoRepository {
  criarProduto(criarProdutoDTO: CriarProdutoDTO): Promise<ProdutoDTO>;
  buscarProdutoPorDescricao(descricao: string): Promise<ProdutoDTO>;
  buscarProdutoPorID(id: string): Promise<ProdutoDTO>;
  buscarProdutosPorCategoria(categoria: CategoriaEnum): Promise<ProdutoDTO[]>;
  editarProduto(editarProdutoDTO: EditarProdutoDTO): Promise<ProdutoDTO>;
  deletarProduto(id: string): void;
}
