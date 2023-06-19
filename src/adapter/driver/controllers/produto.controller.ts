import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriarProdutoDTO } from '../../../core/domain/produto/dto/criar-produtoDTO';
import { ProdutoDTO } from '../../../core/domain/produto/dto/produtoDTO';
import { CriarProdutoUseCase } from '../../../core/application/usecases/produto/criar-produto';
import { BuscarProdutoPorDescricaoUseCase } from '../../../core/application/usecases/produto/buscar-produto-descricao';
import { BuscarProdutoPorCategoriaUseCase } from '../../../core/application/usecases/produto/buscar-produto-categoria';
import { EditarProdutoDTO } from '../../../core/domain/produto/dto/editar-produtoDTO';
import { EditarProdutoUseCase } from '../../../core/application/usecases/produto/editar-produtos';
import { DeletarProdutoUseCase } from '../../../core/application/usecases/produto/deletar-produto';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly criarProdutoUseCase: CriarProdutoUseCase,
    private readonly buscarProdutoPorDescricaoUseCase: BuscarProdutoPorDescricaoUseCase,
    private readonly buscarProdutoPorCategoriaUseCase: BuscarProdutoPorCategoriaUseCase,
    private readonly editarProdutoUseCase: EditarProdutoUseCase,
    private readonly deletarProdutoUseCase: DeletarProdutoUseCase,
  ) {}

  @Post()
  async criarProduto(
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

  @Put()
  async editarProduto(
    @Body() editarProdutoDTO: EditarProdutoDTO,
  ): Promise<ProdutoDTO> {
    return await this.editarProdutoUseCase.execute(editarProdutoDTO);
  }

  @Delete(':id')
  async deletarProduto(@Param() params) {
    return this.deletarProdutoUseCase.execute(params.id);
  }
}
