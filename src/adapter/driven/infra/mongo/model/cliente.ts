import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Cliente } from '../../../../../core/domain/cliente/cliente';

export type ClienteMongoDocument = ClienteMongo & Document;

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
export class ClienteMongo extends Cliente {
  @Prop()
  nome: string;

  @Prop()
  email: string;

  @Prop()
  cpf: string;
}

export const ClienteMongoSchema = SchemaFactory.createForClass(ClienteMongo);
