import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Produto } from '../../../../../core/domain/produto/produto';
import { CategoriaEnum } from '../../../../../common/enum/categoria-enum';

export type ProdutoMongoDocument = ProdutoMongo & Document;

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
export class ProdutoMongo extends Produto {
  @Prop()
  descricao: string;

  @Prop()
  valor: number;

  @Prop()
  categoria: CategoriaEnum;
}

export const ProdutoMongoSchema = SchemaFactory.createForClass(ProdutoMongo);
