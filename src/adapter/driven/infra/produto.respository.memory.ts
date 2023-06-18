import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IProdutoRepository } from '../../../core/application/ports/produto/produto.repository';
import { ProdutoDTO } from '../../../core/domain/produto/dto/produtoDTO';
import { Produto } from '../../../core/domain/produto/produto';
import { CriarProdutoDTO } from '../../../core/domain/produto/dto/criarProdutoDTO';

@Injectable()
export class ProdutoRepositoryInMemory implements IProdutoRepository {
  private produtos: Produto[] = [];

  async criarProduto(criarProdutoDTO: CriarProdutoDTO): Promise<ProdutoDTO> {
    const produto = {
      id: uuidv4(),
      ...criarProdutoDTO,
    };
    this.produtos.push(produto);
    return produto;
  }

  async buscarProdutoPorDescricao(descricao: string): Promise<ProdutoDTO> {
    return this.produtos.find((produto) => produto.descricao === descricao);
  }

  async buscarProdutosPorCategoria(categoria: string): Promise<ProdutoDTO[]> {
    return this.produtos.filter((produto) => produto.categoria === categoria);
  }
}
