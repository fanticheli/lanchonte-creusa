import { Cliente } from '../../../domain/cliente/cliente';
import { ClienteDTO } from '../../../domain/cliente/dto/clienteDTO';

export interface IClienteRepository {
  criarCliente(clienteDTO: ClienteDTO): Promise<Cliente>;
  buscarClientePorCPF(cpf: string): Promise<Cliente>;
}
