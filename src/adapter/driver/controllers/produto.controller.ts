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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Produtos')
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
  @ApiOperation({ summary: 'Cria um produto' })
  @ApiBody({
    type: Object,
    examples: {
      produto: {
        value: {
          descricao: 'Mec Melt',
          valor: 150.0,
          categoria: 'lanche',
        },
      },
    },
  })
  async criarProduto(
    @Body() criarProdutoDTO: CriarProdutoDTO,
  ): Promise<ProdutoDTO> {
    return await this.criarProdutoUseCase.execute(criarProdutoDTO);
  }

  @Get('/descricao/:descricao')
  @ApiOperation({ summary: 'Pesquisa um produto descrição' })
  async buscarProdutoPorDescricao(
    @Param('descricao') descricao: string,
  ): Promise<ProdutoDTO> {
    return await this.buscarProdutoPorDescricaoUseCase.execute(descricao);
  }

  @Get('/categoria/:categoria')
  @ApiOperation({ summary: 'Pesquisa produtos por categoria' })
  async buscarProdutosPorCategoria(
    @Param('categoria') categoria: string,
  ): Promise<ProdutoDTO[]> {
    return await this.buscarProdutoPorCategoriaUseCase.execute(categoria);
  }

  @Put()
  @ApiOperation({ summary: 'Edita um produto' })
  @ApiBody({
    type: Object,
    examples: {
      produto: {
        value: {
          id: 'string',
          descricao: 'Mec Melt',
          valor: 150.0,
          categoria: 'lanche',
        },
      },
    },
  })
  async editarProduto(
    @Body() editarProdutoDTO: EditarProdutoDTO,
  ): Promise<ProdutoDTO> {
    return await this.editarProdutoUseCase.execute(editarProdutoDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um produto por ID' })
  @ApiParam({ name: 'id', description: 'Produto ID' })
  async deletarProduto(@Param() params) {
    return this.deletarProdutoUseCase.execute(params.id);
  }
}
