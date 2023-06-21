import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoriaEnum } from '../../../../../common/enum/categoria-enum';
import { Pedido } from '../../../../../core/domain/pedido/pedido';
import { StatusPagamentoEnum } from '../../../../../common/enum/status-pagamento-enum';
import { StatusPedidoEnum } from '../../../../../common/enum/status-pedido-enum';

export type PedidoMongoDocument = PedidoMongo & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class PedidoMongo extends Pedido {
  @Prop()
  produtos: string[];

  @Prop()
  valorTotal: number;

  @Prop()
  cliente: string;

  @Prop()
  statusPagamento: StatusPagamentoEnum;

  @Prop()
  statusPedido: StatusPedidoEnum;
}

export const PedidoMongoSchema = SchemaFactory.createForClass(PedidoMongo);
