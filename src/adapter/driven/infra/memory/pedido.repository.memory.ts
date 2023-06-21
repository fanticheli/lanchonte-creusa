import { Injectable } from '@nestjs/common';
import { IPedidoRepository } from '../../../../core/application/ports/pedido/pedido.repository';
import { PedidoDTO } from '../../../../core/domain/pedido/dto/pedidoDTO';
import { Pedido } from '../../../../core/domain/pedido/pedido';

@Injectable()
export class PedidoRepositoryInMemory implements IPedidoRepository {
  private pedidos: Pedido[] = [];

  async criarPedido(pedido: Pedido): Promise<PedidoDTO> {
    pedido.id = this.pedidos.length + 1;

    this.pedidos.push(pedido);

    return {
      id: pedido.id,
      produtos: pedido.produtos,
      valorTotal: pedido.valorTotal,
      cliente: pedido.cliente,
      statusPagamento: pedido.statusPagamento,
      statusPedido: pedido.statusPedido,
    };
  }

  async listarPedidos(): Promise<PedidoDTO[]> {
    return this.pedidos.map((pedido) => ({
      id: pedido.id,
      produtos: pedido.produtos,
      valorTotal: pedido.valorTotal,
      cliente: pedido.cliente,
      statusPagamento: pedido.statusPagamento,
      statusPedido: pedido.statusPedido,
    }));
  }
}
