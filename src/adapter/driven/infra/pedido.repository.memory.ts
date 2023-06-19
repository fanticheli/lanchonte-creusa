import { Injectable } from '@nestjs/common';
import { IPedidoRepository } from '../../../core/application/ports/pedido/pedido.repository';
import { PedidoDTO } from '../../../core/domain/pedido/dto/pedidoDTO';
import { Pedido } from '../../../core/domain/pedido/pedido';
import { ProdutoRepositoryInMemory } from './produto.respository.memory';
import { BadRequestError } from '../../../common/errors/types/bad-request';

@Injectable()
export class PedidoRepositoryInMemory implements IPedidoRepository {
  constructor(
    private readonly produtoRepositoryInMemory: ProdutoRepositoryInMemory,
  ) {}
  private pedidos: Pedido[] = [];

  async criarPedido(pedido: Pedido): Promise<PedidoDTO> {
    pedido.id = this.pedidos.length + 1;

    for (const produto of pedido.produtos) {
      const produtoEncontrado =
        await this.produtoRepositoryInMemory.buscarProdutoPorID(produto);

      if (!produtoEncontrado) {
        throw new BadRequestError(`Produto: ${produto} não encontrado`);
      }

      pedido.valorTotal += produtoEncontrado.valor;
    }

    this.pedidos.push(pedido);

    return {
      id: pedido.id,
      produtos: pedido.produtos,
      valorTotal: pedido.valorTotal,
      cliente: pedido.cliente,
    };
  }

  async listarPedidos(): Promise<PedidoDTO[]> {
    return this.pedidos.map((pedido) => ({
      id: pedido.id,
      produtos: pedido.produtos,
      valorTotal: pedido.valorTotal,
      cliente: pedido.cliente,
    }));
  }
}
