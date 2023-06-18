import { Injectable } from '@nestjs/common';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';
import { ProdutoRepositoryInMemory } from '../../../../adapter/driven/infra/produto.respository.memory';

@Injectable()
export class BuscarProdutoPorCategoriaUseCase {
  constructor(
    private readonly produtoRepositoryInMemory: ProdutoRepositoryInMemory,
  ) {}

  async execute(categoria: string): Promise<ProdutoDTO[]> {
    return await this.produtoRepositoryInMemory.buscarProdutosPorCategoria(
      categoria,
    );
  }
}
