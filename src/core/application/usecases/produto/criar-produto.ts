import { Inject, Injectable } from '@nestjs/common';
import { ProdutoDTO } from '../../../domain/produto/dto/produtoDTO';
import { CriarProdutoDTO } from '../../../domain/produto/dto/criar-produtoDTO';
import { ConflictError } from '../../../../common/errors/types/conflict-error';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { Produto } from '../../../domain/produto/produto';
import { validate } from 'class-validator';
import { IProdutoRepository } from '../../ports/produto/produto.repository';

@Injectable()
export class CriarProdutoUseCase {
  constructor(
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(criarProdutoDTO: CriarProdutoDTO): Promise<ProdutoDTO> {
    const produto = await this.produtoRepository.buscarProdutoPorDescricao(
      criarProdutoDTO.descricao,
    );

    if (produto) {
      throw new ConflictError('Produto já cadastrado com essa descrição');
    }

    const novoProduto = new Produto(criarProdutoDTO);
    const errosDeValidacao = await validate(novoProduto);

    if (errosDeValidacao.length > 0) {
      const message =
        errosDeValidacao[0].constraints['isNotEmpty'] ||
        errosDeValidacao[0].constraints['isEnum'] ||
        errosDeValidacao[0].constraints['isNumber'];
      throw new BadRequestError(message);
    }

    return this.produtoRepository.criarProduto(criarProdutoDTO);
  }
}
