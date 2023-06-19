import { Injectable } from '@nestjs/common';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';
import { ProdutoRepositoryInMemory } from '../../../../adapter/driven/infra/produto.respository.memory';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { Produto } from '../../../domain/produto/produto';
import { validate } from 'class-validator';
import { EditarProdutoDTO } from '../../../domain/produto/dto/editarProdutoDTO';

@Injectable()
export class EditarProdutoUseCase {
  constructor(
    private readonly produtoRepositoryInMemory: ProdutoRepositoryInMemory,
  ) {}

  async execute(editarProdutoDTO: EditarProdutoDTO): Promise<ProdutoDTO> {
    const produto = await this.produtoRepositoryInMemory.buscarProdutoPorID(
      editarProdutoDTO.id,
    );

    console.log(produto);

    if (!produto) {
      throw new BadRequestError('Produto não encontrado');
    }

    const novoProduto = new Produto(editarProdutoDTO);
    const errosDeValidacao = await validate(novoProduto);

    if (errosDeValidacao.length > 0) {
      const message =
        errosDeValidacao[0].constraints['isNotEmpty'] ||
        errosDeValidacao[0].constraints['isEnum'] ||
        errosDeValidacao[0].constraints['isNumber'];
      throw new BadRequestError(message);
    }

    return this.produtoRepositoryInMemory.editarProduto(novoProduto);
  }
}
