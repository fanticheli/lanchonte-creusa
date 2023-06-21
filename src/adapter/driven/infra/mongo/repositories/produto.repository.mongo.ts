import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProdutoRepository } from '../../../../../core/application/ports/produto/produto.repository';
import { Injectable } from '@nestjs/common';
import { ProdutoMongo } from '../model/produto';
import { CriarProdutoDTO } from '../../../../../core/domain/produto/dto/criar-produtoDTO';
import { ProdutoDTO } from '../../../../../core/domain/produto/dto/produtoDTO';
import { EditarProdutoDTO } from '../../../../../core/domain/produto/dto/editar-produtoDTO';
import { Produto } from '../../../../../core/domain/produto/produto';

@Injectable()
export class ProdutoRepositoryInMongo implements IProdutoRepository {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<ProdutoMongo>,
  ) {}

  async criarProduto(criarProdutoDTO: CriarProdutoDTO): Promise<ProdutoDTO> {
    const produto = await this.produtoModel.create(criarProdutoDTO);
    return produto;
  }

  async buscarProdutoPorDescricao(descricao: string): Promise<ProdutoDTO> {
    const produto = await this.produtoModel.findOne({ descricao });
    return produto;
  }

  async buscarProdutoPorID(id: string): Promise<ProdutoDTO> {
    const produto = await this.produtoModel.findById(id);
    return produto;
  }

  async buscarProdutosPorCategoria(categoria: string): Promise<ProdutoDTO[]> {
    const produtos = await this.produtoModel.find({ categoria });
    return produtos;
  }

  async editarProduto(editarProdutoDTO: EditarProdutoDTO): Promise<ProdutoDTO> {
    const produto = await this.produtoModel.findByIdAndUpdate(
      editarProdutoDTO.id,
      editarProdutoDTO,
      { new: true },
    );
    return produto;
  }

  async deletarProduto(id: string): Promise<void> {
    await this.produtoModel.findByIdAndDelete(id);
  }
}
