import { Inject, Injectable } from '@nestjs/common';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { IProdutoRepository } from '../../ports/produto/produto.repository';

@Injectable()
export class DeletarProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepositoryInMemory: IProdutoRepository,
  ) {}

  execute(id: string): void {
    const produto = this.produtoRepositoryInMemory.buscarProdutoPorID(id);

    if (!produto) {
      throw new BadRequestError('Produto não encontrado');
    }

    this.produtoRepositoryInMemory.deletarProduto(id);
  }
}
