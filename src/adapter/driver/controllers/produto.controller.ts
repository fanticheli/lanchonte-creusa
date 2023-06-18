import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CriarProdutoDTO } from '../../../core/domain/produto/dto/criarProdutoDTO';
import { ProdutoDTO } from '../../../core/domain/produto/dto/produtoDTO';
import { CriarProdutoUseCase } from '../../../core/application/usecases/produto/criar-produto';
import { BuscarProdutoPorDescricaoUseCase } from '../../../core/application/usecases/produto/buscar-produto-descricao';
import { BuscarProdutoPorCategoriaUseCase } from '../../../core/application/usecases/produto/buscar-produto-categoria';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly criarProdutoUseCase: CriarProdutoUseCase,
    private readonly buscarProdutoPorDescricaoUseCase: BuscarProdutoPorDescricaoUseCase,
    private readonly buscarProdutoPorCategoriaUseCase: BuscarProdutoPorCategoriaUseCase,
  ) {}

  @Post()
  async criarCliente(
    @Body() criarProdutoDTO: CriarProdutoDTO,
  ): Promise<ProdutoDTO> {
    return await this.criarProdutoUseCase.execute(criarProdutoDTO);
  }

  @Get('/descricao/:descricao')
  async buscarProdutoPorDescricao(
    @Param('descricao') descricao: string,
  ): Promise<ProdutoDTO> {
    return await this.buscarProdutoPorDescricaoUseCase.execute(descricao);
  }

  @Get('/categoria/:categoria')
  async buscarProdutosPorCategoria(
    @Param('categoria') categoria: string,
  ): Promise<ProdutoDTO[]> {
    return await this.buscarProdutoPorCategoriaUseCase.execute(categoria);
  }
}
