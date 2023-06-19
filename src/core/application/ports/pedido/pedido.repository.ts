import { CriarPedidoDTO } from '../../../domain/pedido/dto/criar-pedidoDTO';
import { PedidoDTO } from '../../../domain/pedido/dto/pedidoDTO';

export interface IPedidoRepository {
  criarPedido(criarPedidoDTO: CriarPedidoDTO): Promise<PedidoDTO>;
  listarPedidos(): Promise<PedidoDTO[]>;
}
