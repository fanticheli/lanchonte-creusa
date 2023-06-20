import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { CriarPedidoDTO } from './dto/criar-pedidoDTO';
import { StatusPagamentoEnum } from '../../../common/enum/status-pagamento-enum';
import { StatusPedidoEnum } from '../../../common/enum/status-pedido-enum';

export class Pedido {
  constructor(pedido: CriarPedidoDTO) {
    this.produtos = pedido.produtos;
    this.cliente = pedido.cliente;
    this.valorTotal = 0;
    this.id = 0;
  }

  id: number;

  @ArrayNotEmpty({ message: 'O pedido deve conter pelo menos um produto' })
  produtos: string[];

  valorTotal: number;

  @IsNotEmpty({ message: 'O pedido deve conter um cliente' })
  cliente: string;

  statusPagamento: StatusPagamentoEnum;
  statusPedido: StatusPedidoEnum;
}
