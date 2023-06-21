import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Pedido } from '../../../../../core/domain/pedido/pedido';
import { PedidoMongo } from '../model/pedido';
import { IPedidoRepository } from '../../../../../core/application/ports/pedido/pedido.repository';
import { PedidoDTO } from '../../../../../core/domain/pedido/dto/pedidoDTO';
import { CriarPedidoDTO } from '../../../../../core/domain/pedido/dto/criar-pedidoDTO';

@Injectable()
export class PedidoRepositoryInMongo implements IPedidoRepository {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<PedidoMongo>,
  ) {}

  async criarPedido(criarPedidoDTO: CriarPedidoDTO): Promise<PedidoDTO> {
    const pedido = await this.pedidoModel.create(criarPedidoDTO);
    return pedido;
  }

  async listarPedidos(): Promise<PedidoDTO[]> {
    const pedidos = await this.pedidoModel.find();
    return pedidos;
  }
}
