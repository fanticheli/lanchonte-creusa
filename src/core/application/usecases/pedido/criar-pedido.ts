import { Inject, Injectable } from '@nestjs/common';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { validate } from 'class-validator';
import { CriarPedidoDTO } from '../../../domain/pedido/dto/criar-pedidoDTO';
import { Pedido } from '../../../domain/pedido/pedido';
import { PedidoDTO } from '../../../domain/pedido/dto/pedidoDTO';
import { IPedidoRepository } from '../../ports/pedido/pedido.repository';
import { IProdutoRepository } from '../../ports/produto/produto.repository';
import { StatusPagamentoEnum } from '../../../../common/enum/status-pagamento-enum';
import { StatusPedidoEnum } from '../../../../common/enum/status-pedido-enum';

@Injectable()
export class CriarPedidoUseCase {
  constructor(
    @Inject('IPedidoRepository')
    private readonly pedidoRepository: IPedidoRepository,
    @Inject('IProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
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

    for (const produto of novoPedido.produtos) {
      const produtoEncontrado = await this.produtoRepository.buscarProdutoPorID(
        produto,
      );

      if (!produtoEncontrado) {
        throw new BadRequestError(`Produto: ${produto} não encontrado`);
      }

      novoPedido.valorTotal += produtoEncontrado.valor;
    }

    novoPedido.statusPagamento = StatusPagamentoEnum.APROVADO;
    novoPedido.statusPedido = StatusPedidoEnum.PREPARACAO;

    return this.pedidoRepository.criarPedido(novoPedido);
  }
}
