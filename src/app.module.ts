import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ClienteController } from './adapter/driver/controllers/cliente.controller';
import { CriarClienteUseCase } from './core/application/usecases/cliente/criar-cliente';
import { BuscarClientePorCPFUseCase } from './core/application/usecases/cliente/buscar-cliente-cpf';
import { ProdutoController } from './adapter/driver/controllers/produto.controller';
import { ProdutoRepositoryInMemory } from './adapter/driven/infra/memory/produto.respository.memory';
import { CriarProdutoUseCase } from './core/application/usecases/produto/criar-produto';
import { BuscarProdutoPorDescricaoUseCase } from './core/application/usecases/produto/buscar-produto-descricao';
import { BuscarProdutoPorCategoriaUseCase } from './core/application/usecases/produto/buscar-produto-categoria';
import { EditarProdutoUseCase } from './core/application/usecases/produto/editar-produtos';
import { DeletarProdutoUseCase } from './core/application/usecases/produto/deletar-produto';
import { CriarPedidoUseCase } from './core/application/usecases/pedido/criar-pedido';
import { PedidoController } from './adapter/driver/controllers/pedido.controller';
import { BuscarPedidosUseCase } from './core/application/usecases/pedido/buscar-pedidos';
import { PedidoRepositoryInMemory } from './adapter/driven/infra/memory/pedido.repository.memory';
import { ClienteRepositoryInMongo } from './adapter/driven/infra/mongo/repositories/cliente.repository.mongo';
import { Cliente } from './core/domain/cliente/cliente';
import { ClienteMongoSchema } from './adapter/driven/infra/mongo/model/cliente';

config();

const useCases = [
  CriarClienteUseCase,
  BuscarClientePorCPFUseCase,
  CriarProdutoUseCase,
  BuscarProdutoPorDescricaoUseCase,
  BuscarProdutoPorCategoriaUseCase,
  EditarProdutoUseCase,
  DeletarProdutoUseCase,
  CriarPedidoUseCase,
  BuscarPedidosUseCase,
];

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb://localhost:27017/lanchonete-creusa-dev',
    ),
    MongooseModule.forFeature([
      { name: Cliente.name, schema: ClienteMongoSchema },
    ]),
  ],
  controllers: [ClienteController, ProdutoController, PedidoController],
  providers: [
    ...useCases,
    {
      provide: 'IClienteRepository',
      useClass: ClienteRepositoryInMongo,
    },
    {
      provide: 'IPedidoRepository',
      useClass: PedidoRepositoryInMemory,
    },
    {
      provide: 'IProdutoRepository',
      useClass: ProdutoRepositoryInMemory,
    },
  ],
})
export class AppModule {}
