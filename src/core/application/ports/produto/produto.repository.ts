import { CriarProdutoDTO } from '../../../domain/produto/dto/criar-produtoDTO';
import { EditarProdutoDTO } from '../../../domain/produto/dto/editar-produtoDTO';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';

export interface IProdutoRepository {
  criarProduto(criarProdutoDTO: CriarProdutoDTO): Promise<ProdutoDTO>;
  buscarProdutoPorDescricao(descricao: string): Promise<ProdutoDTO>;
  buscarProdutoPorID(id: string): Promise<ProdutoDTO>;
  buscarProdutosPorCategoria(categoria: string): Promise<ProdutoDTO[]>;
  editarProduto(editarProdutoDTO: EditarProdutoDTO): Promise<ProdutoDTO>;
  deletarProduto(id: string): void;
}
