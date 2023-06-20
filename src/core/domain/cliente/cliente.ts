import { IsNotEmpty } from 'class-validator';
import { ClienteDTO } from './dto/clienteDTO';
import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  constructor(cliente: ClienteDTO) {
    this.id = uuidv4();
    this.nome = cliente.nome;
    this.email = cliente.email;
    this.cpf = cliente.cpf;
  }

  id: string;

  @IsNotEmpty({ message: 'O cliente deve conter um Nome' })
  nome: string;

  @IsNotEmpty({ message: 'O pedido deve conter um Email' })
  email: string;

  @IsNotEmpty({ message: 'O pedido deve conter um CPF' })
  cpf: string;
}
