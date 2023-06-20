import { Inject, Injectable } from '@nestjs/common';
import { ClienteDTO } from '../../../domain/cliente/dto/clienteDTO';
import { Cliente } from '../../../domain/cliente/cliente';
import { ConflictError } from '../../../../common/errors/types/conflict-error';
import { IClienteRepository } from '../../ports/cliente/cliente.repository';
import { validate } from 'class-validator';
import { BadRequestError } from '../../../../common/errors/types/bad-request';

@Injectable()
export class CriarClienteUseCase {
  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepositiry: IClienteRepository,
  ) {}

  async execute(clienteDTO: ClienteDTO): Promise<Cliente> {
    const clienteExistente = await this.clienteRepositiry.buscarClientePorCPF(
      clienteDTO.cpf,
    );

    if (clienteExistente) {
      throw new ConflictError('Cliente já cadastrado');
    }

    const novoCliente = new Cliente(clienteDTO);
    const errosDeValidacao = await validate(novoCliente);

    if (errosDeValidacao.length > 0) {
      const message = errosDeValidacao[0].constraints['isNotEmpty'];
      throw new BadRequestError(message);
    }

    return this.clienteRepositiry.criarCliente(novoCliente);
  }
}
