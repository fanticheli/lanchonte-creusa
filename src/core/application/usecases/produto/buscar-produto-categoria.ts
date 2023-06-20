import { Inject, Injectable } from '@nestjs/common';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';
import { IProdutoRepository } from '../../ports/produto/produto.repository';

@Injectable()
export class BuscarProdutoPorCategoriaUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepositoryInMemory: IProdutoRepository,
  ) {}

  async execute(categoria: string): Promise<ProdutoDTO[]> {
    return await this.produtoRepositoryInMemory.buscarProdutosPorCategoria(
      categoria,
    );
  }
}
