import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidoDTO } from '../../../core/domain/pedido/dto/pedidoDTO';
import { CriarPedidoUseCase } from '../../../core/application/usecases/pedido/criar-pedido';
import { CriarPedidoDTO } from '../../../core/domain/pedido/dto/criar-pedidoDTO';
import { BuscarPedidosUseCase } from '../../../core/application/usecases/pedido/buscar-pedidos';

@Controller('pedidos')
export class PedidoController {
  constructor(
    private readonly criarPedidoUseCase: CriarPedidoUseCase,
    private readonly buscarPedidosUseCase: BuscarPedidosUseCase,
  ) {}

  @Post()
  async criarProduto(
    @Body() criarPedidoDTO: CriarPedidoDTO,
  ): Promise<PedidoDTO> {
    return await this.criarPedidoUseCase.execute(criarPedidoDTO);
  }

  @Get()
  async buscarProdutos(): Promise<PedidoDTO[]> {
    return await this.buscarPedidosUseCase.execute();
  }
}
