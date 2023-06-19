import { Injectable } from '@nestjs/common';
import { PedidoRepositoryInMemory } from '../../../../adapter/driven/infra/pedido.repository.memory';
import { PedidoDTO } from '../../../domain/pedido/dto/pedidoDTO';

@Injectable()
export class BuscarPedidosUseCase {
  constructor(
    private readonly pedidoRepositoryInMemory: PedidoRepositoryInMemory,
  ) {}

  async execute(): Promise<PedidoDTO[]> {
    return this.pedidoRepositoryInMemory.listarPedidos();
  }
}
