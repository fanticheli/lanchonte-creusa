import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../../../domain/cliente/cliente';
import { BadRequestError } from '../../../../common/errors/types/bad-request';
import { IClienteRepository } from '../../ports/cliente/cliente.repository';

@Injectable()
export class BuscarClientePorCPFUseCase {
  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepositiry: IClienteRepository,
  ) {}

  async execute(cpf: string): Promise<Cliente> {
    const clienteExistente = await this.clienteRepositiry.buscarClientePorCPF(
      cpf,
    );

    if (!clienteExistente) {
      throw new BadRequestError('Cliente não encontrado');
    }

    return clienteExistente;
  }
}
