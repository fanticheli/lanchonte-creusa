import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidoDTO } from '../../../core/domain/pedido/dto/pedidoDTO';
import { CriarPedidoUseCase } from '../../../core/application/usecases/pedido/criar-pedido';
import { CriarPedidoDTO } from '../../../core/domain/pedido/dto/criar-pedidoDTO';
import { BuscarPedidosUseCase } from '../../../core/application/usecases/pedido/buscar-pedidos';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(
    private readonly criarPedidoUseCase: CriarPedidoUseCase,
    private readonly buscarPedidosUseCase: BuscarPedidosUseCase,
  ) {}

  @Post()
  @Post()
  @ApiOperation({ summary: 'Cria um pedido' })
  @ApiBody({
    type: Object,
    examples: {
      produto: {
        value: {
          produtos: ['649276edbe92e6ca6e5ce3fa', '649276edbe92e6ca6e5ce3fa'],
          cliente: 'ClientID ou Nome do cliente(caso não identificado)',
        },
      },
    },
  })
  async criarProduto(
    @Body() criarPedidoDTO: CriarPedidoDTO,
  ): Promise<PedidoDTO> {
    return await this.criarPedidoUseCase.execute(criarPedidoDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Lista pedidos' })
  async buscarProdutos(): Promise<PedidoDTO[]> {
    return await this.buscarPedidosUseCase.execute();
  }
}
