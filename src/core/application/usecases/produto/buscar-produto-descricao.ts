import { Inject, Injectable } from '@nestjs/common';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { IProdutoRepository } from '../../ports/produto/produto.repository';

@Injectable()
export class BuscarProdutoPorDescricaoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepositoryInMemory: IProdutoRepository,
  ) {}

  async execute(descricao: string): Promise<ProdutoDTO> {
    const produto =
      await this.produtoRepositoryInMemory.buscarProdutoPorDescricao(descricao);

    if (!produto) {
      throw new BadRequestError('Produto não encontrado');
    }

    return produto;
  }
}
