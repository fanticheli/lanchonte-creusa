import { Injectable } from '@nestjs/common';
import { IClienteRepository } from '../../../../../core/application/ports/cliente/cliente.repository';
import { Cliente } from '../../../../../core/domain/cliente/cliente';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClienteMongo } from '../model/cliente';

@Injectable()
export class ClienteRepositoryInMongo implements IClienteRepository {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<ClienteMongo>,
  ) {}

  async criarCliente(novoCliente: Cliente): Promise<Cliente> {
    return await this.clienteModel.create(novoCliente);
  }

  async buscarClientePorCPF(cpf: string): Promise<Cliente> {
    return await this.clienteModel.findOne({ cpf });
  }
}
