import { Injectable } from '@nestjs/common';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';
import { ProdutoRepositoryInMemory } from '../../../../adapter/driven/infra/produto.respository.memory';
import { BadRequestError } from '../../../../common/errors/types/bad-request';

@Injectable()
export class BuscarProdutoPorDescricaoUseCase {
  constructor(
    private readonly produtoRepositoryInMemory: ProdutoRepositoryInMemory,
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
