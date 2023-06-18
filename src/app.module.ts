import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ClienteController } from './adapter/driver/controllers/cliente.controller';
import { CriarClienteUseCase } from './core/application/usecases/cliente/criar-cliente';
import { ClienteRepositoryInMemory } from './adapter/driven/infra/cliente.repository.memory';
import { BuscarClientePorCPFUseCase } from './core/application/usecases/cliente/buscar-cliente-cpf';

config();

const repositories = [ClienteRepositoryInMemory];
const useCases = [CriarClienteUseCase, BuscarClientePorCPFUseCase];

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb://localhost:27017/lanchonete-creusa-dev',
    ),
  ],
  controllers: [ClienteController],
  providers: [...useCases, ...repositories],
})
export class AppModule {}
