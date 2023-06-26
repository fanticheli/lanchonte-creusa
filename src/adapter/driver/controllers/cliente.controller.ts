import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CriarClienteUseCase } from '../../../core/application/usecases/cliente/criar-cliente';
import { Cliente } from '../../../core/domain/cliente/cliente';
import { ClienteDTO } from '../../../core/domain/cliente/dto/clienteDTO';
import { BuscarClientePorCPFUseCase } from '../../../core/application/usecases/cliente/buscar-cliente-cpf';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly criarClienteUsecase: CriarClienteUseCase,
    private readonly buscarClientePorCPFUseCase: BuscarClientePorCPFUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um cliente' })
  @ApiBody({
    type: Object,
    examples: {
      cliente: {
        value: {
          nome: 'John Doe',
          email: 'email@eamil.com',
          cpf: '00000000000',
        },
      },
    },
  })
  async criarCliente(@Body() clienteDTO: ClienteDTO): Promise<Cliente> {
    return await this.criarClienteUsecase.execute(clienteDTO);
  }

  @Get('/cpf/:cpf')
  @ApiOperation({ summary: 'Pesquisa um cliente por CPF' })
  async buscarClientePorCPF(@Param('cpf') cpf: string): Promise<Cliente> {
    return await this.buscarClientePorCPFUseCase.execute(cpf);
  }
}
