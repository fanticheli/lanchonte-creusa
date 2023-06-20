import { Injectable } from '@nestjs/common';
import { IClienteRepository } from '../../../../core/application/ports/cliente/cliente.repository';
import { Cliente } from '../../../../core/domain/cliente/cliente';

@Injectable()
export class ClienteRepositoryInMemory implements IClienteRepository {
  private clientes: Cliente[] = [];

  async criarCliente(novoCliente: Cliente): Promise<Cliente> {
    this.clientes.push(novoCliente);
    return novoCliente;
  }

  async buscarClientePorCPF(cpf: string): Promise<Cliente> {
    return this.clientes.find((cliente) => cliente.cpf === cpf);
  }
}
