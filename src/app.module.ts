import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteController } from './adapter/driver/controllers/cliente.controller';
import { CriarClienteUseCase } from './core/application/usecases/cliente/criar-cliente';
import { BuscarClientePorCPFUseCase } from './core/application/usecases/cliente/buscar-cliente-cpf';
import { ProdutoController } from './adapter/driver/controllers/produto.controller';
import { CriarProdutoUseCase } from './core/application/usecases/produto/criar-produto';
import { BuscarProdutoPorDescricaoUseCase } from './core/application/usecases/produto/buscar-produto-descricao';
import { BuscarProdutoPorCategoriaUseCase } from './core/application/usecases/produto/buscar-produto-categoria';
import { EditarProdutoUseCase } from './core/application/usecases/produto/editar-produtos';
import { DeletarProdutoUseCase } from './core/application/usecases/produto/deletar-produto';
import { CriarPedidoUseCase } from './core/application/usecases/pedido/criar-pedido';
import { PedidoController } from './adapter/driver/controllers/pedido.controller';
import { BuscarPedidosUseCase } from './core/application/usecases/pedido/buscar-pedidos';
import { ClienteRepositoryInMongo } from './adapter/driven/infra/mongo/repositories/cliente.repository.mongo';
import { Cliente } from './core/domain/cliente/cliente';
import { ClienteMongoSchema } from './adapter/driven/infra/mongo/model/cliente';
import { ConfigModule } from '@nestjs/config';
import { Produto } from './core/domain/produto/produto';
import { ProdutoMongoSchema } from './adapter/driven/infra/mongo/model/produto';
import { ProdutoRepositoryInMongo } from './adapter/driven/infra/mongo/repositories/produto.repository.mongo';
import { Pedido } from './core/domain/pedido/pedido';
import { PedidoMongoSchema } from './adapter/driven/infra/mongo/model/pedido';
import { PedidoRepositoryInMongo } from './adapter/driven/infra/mongo/repositories/pedido.repository.mongo';

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
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      autoCreate: true,
    }),
    MongooseModule.forFeature([
      { name: Cliente.name, schema: ClienteMongoSchema },
      { name: Produto.name, schema: ProdutoMongoSchema },
      { name: Pedido.name, schema: PedidoMongoSchema },
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
      useClass: PedidoRepositoryInMongo,
    },
    {
      provide: 'IProdutoRepository',
      useClass: ProdutoRepositoryInMongo,
    },
  ],
})
export class AppModule {}
