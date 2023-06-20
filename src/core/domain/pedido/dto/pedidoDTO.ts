export interface PedidoDTO {
  id: number;
  produtos: string[];
  valorTotal: number;
  cliente: string;
  statusPagamento: string;
  statusPedido: string;
}
