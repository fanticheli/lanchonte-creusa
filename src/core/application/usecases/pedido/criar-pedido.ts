import { Injectable } from '@nestjs/common';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { validate } from 'class-validator';
import { CriarPedidoDTO } from '../../../domain/pedido/dto/criar-pedidoDTO';
import { PedidoRepositoryInMemory } from '../../../../adapter/driven/infra/pedido.repository.memory';
import { Pedido } from '../../../domain/pedido/pedido';
import { PedidoDTO } from '../../../domain/pedido/dto/pedidoDTO';

@Injectable()
export class CriarPedidoUseCase {
  constructor(
    private readonly pedidoRepositoryInMemory: PedidoRepositoryInMemory,
  ) {}

  async execute(criarPedidoDTO: CriarPedidoDTO): Promise<PedidoDTO> {
    const novoPedido = new Pedido(criarPedidoDTO);
    const errosDeValidacao = await validate(novoPedido);

    if (errosDeValidacao.length > 0) {
      const message =
        errosDeValidacao[0].constraints['arrayNotEmpty'] ||
        errosDeValidacao[0].constraints['isNotEmpty'];
      throw new BadRequestError(message);
    }

    return this.pedidoRepositoryInMemory.criarPedido(novoPedido);
  }
}
