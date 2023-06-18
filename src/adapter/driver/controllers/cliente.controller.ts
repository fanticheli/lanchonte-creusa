import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CriarClienteUseCase } from '../../../core/application/usecases/cliente/criar-cliente';
import { Cliente } from '../../../core/domain/cliente/cliente';
import { ClienteDTO } from '../../../core/domain/cliente/dto/clienteDTO';
import { BuscarClientePorCPFUseCase } from '../../../core/application/usecases/cliente/buscar-cliente-cpf';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly criarClienteUsecase: CriarClienteUseCase,
    private readonly buscarClientePorCPFUseCase: BuscarClientePorCPFUseCase,
  ) {}

  @Post()
  async criarCliente(@Body() clienteDTO: ClienteDTO): Promise<Cliente> {
    return await this.criarClienteUsecase.execute(clienteDTO);
  }

  @Get('/cpf/:cpf')
  async buscarClientePorCPF(@Param('cpf') cpf: string): Promise<Cliente> {
    return await this.buscarClientePorCPFUseCase.execute(cpf);
  }
}
