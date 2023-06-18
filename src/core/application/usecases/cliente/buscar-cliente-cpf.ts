import { Injectable } from '@nestjs/common';
import { Cliente } from '../../../domain/cliente/cliente';
import { ClienteRepositoryInMemory } from '../../../../adapter/driven/infra/cliente.repository.memory';
import { BadRequestError } from '../../../../common/errors/types/bad-request';

@Injectable()
export class BuscarClientePorCPFUseCase {
  constructor(private readonly clienteRepositiry: ClienteRepositoryInMemory) {}

  async execute(cpf: string): Promise<Cliente> {
    console.log(cpf);
    const clienteExistente = await this.clienteRepositiry.buscarClientePorCPF(
      cpf,
    );

    if (!clienteExistente) {
      throw new BadRequestError('Cliente não encontrado');
    }

    return clienteExistente;
  }
}
