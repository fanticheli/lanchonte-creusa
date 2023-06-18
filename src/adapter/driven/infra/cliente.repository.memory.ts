import { Injectable } from '@nestjs/common';
import { IClienteRepository } from '../../../core/application/ports/cliente/cliente.repository';
import { Cliente } from '../../../core/domain/cliente/cliente';
import { ClienteDTO } from '../../../core/domain/cliente/dto/clienteDTO';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClienteRepositoryInMemory implements IClienteRepository {
  private clientes: Cliente[] = [];

  async criarCliente(clienteDTO: ClienteDTO): Promise<Cliente> {
    const cliente = {
      id: uuidv4(),
      ...clienteDTO,
    };
    this.clientes.push(cliente);
    return cliente;
  }

  async buscarClientePorCPF(cpf: string): Promise<Cliente> {
    return this.clientes.find((cliente) => cliente.cpf === cpf);
  }
}
