import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ClienteController } from './adapter/driver/controllers/cliente.controller';
import { CriarClienteUseCase } from './core/application/usecases/cliente/criar-cliente';
import { ClienteRepositoryInMemory } from './adapter/driven/infra/cliente.repository.memory';
import { BuscarClientePorCPFUseCase } from './core/application/usecases/cliente/buscar-cliente-cpf';
import { ProdutoController } from './adapter/driver/controllers/produto.controller';
import { ProdutoRepositoryInMemory } from './adapter/driven/infra/produto.respository.memory';
import { CriarProdutoUseCase } from './core/application/usecases/produto/criar-produto';
import { BuscarProdutoPorDescricaoUseCase } from './core/application/usecases/produto/buscar-produto-descricao';
import { BuscarProdutoPorCategoriaUseCase } from './core/application/usecases/produto/buscar-produto-categoria';

config();

const repositories = [ClienteRepositoryInMemory, ProdutoRepositoryInMemory];
const useCases = [
  CriarClienteUseCase,
  BuscarClientePorCPFUseCase,
  CriarProdutoUseCase,
  BuscarProdutoPorDescricaoUseCase,
  BuscarProdutoPorCategoriaUseCase,
];

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb://localhost:27017/lanchonete-creusa-dev',
    ),
  ],
  controllers: [ClienteController, ProdutoController],
  providers: [...useCases, ...repositories],
})
export class AppModule {}
