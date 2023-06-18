import { Injectable } from '@nestjs/common';
import { ClienteDTO } from '../../../domain/cliente/dto/clienteDTO';
import { Cliente } from '../../../domain/cliente/cliente';
import { ClienteRepositoryInMemory } from '../../../../adapter/driven/infra/cliente.repository.memory';
import { ConflictError } from '../../../../common/errors/types/conflict-error';

@Injectable()
export class CriarClienteUseCase {
  constructor(private readonly clienteRepositiry: ClienteRepositoryInMemory) {}

  async execute(clienteDTO: ClienteDTO): Promise<Cliente> {
    const clienteExistente = await this.clienteRepositiry.buscarClientePorCPF(
      clienteDTO.cpf,
    );

    if (clienteExistente) {
      throw new ConflictError('Cliente já cadastrado');
    }

    return this.clienteRepositiry.criarCliente(clienteDTO);
  }
}
