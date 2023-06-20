import { Inject, Injectable } from '@nestjs/common';
import { PedidoDTO } from '../../../domain/pedido/dto/pedidoDTO';
import { IPedidoRepository } from '../../ports/pedido/pedido.repository';

@Injectable()
export class BuscarPedidosUseCase {
  constructor(
    @Inject('IPedidoRepository')
    private readonly pedidoRepositoryInMemory: IPedidoRepository,
  ) {}

  async execute(): Promise<PedidoDTO[]> {
    return this.pedidoRepositoryInMemory.listarPedidos();
  }
}
