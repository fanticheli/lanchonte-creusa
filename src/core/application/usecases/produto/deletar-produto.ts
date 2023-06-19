import { Injectable } from '@nestjs/common';
import { ProdutoRepositoryInMemory } from '../../../../adapter/driven/infra/produto.respository.memory';
import { BadRequestError } from '../../../../common/errors/types/bad-request';

@Injectable()
export class DeletarProdutoUseCase {
  constructor(
    private readonly produtoRepositoryInMemory: ProdutoRepositoryInMemory,
  ) {}

  execute(id: string): void {
    const produto = this.produtoRepositoryInMemory.buscarProdutoPorID(id);

    if (!produto) {
      throw new BadRequestError('Produto não encontrado');
    }

    this.produtoRepositoryInMemory.deletarProduto(id);
  }
}
