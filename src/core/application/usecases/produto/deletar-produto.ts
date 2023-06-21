import { Inject, Injectable } from '@nestjs/common';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { IProdutoRepository } from '../../ports/produto/produto.repository';

@Injectable()
export class DeletarProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  execute(id: string): void {
    const produto = this.produtoRepository.buscarProdutoPorID(id);

    if (!produto) {
      throw new BadRequestError('Produto não encontrado');
    }

    this.produtoRepository.deletarProduto(id);
  }
}
