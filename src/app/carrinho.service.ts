import { Injectable } from '@angular/core';
import { IProdutoCarrinho, produtos } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  itens: IProdutoCarrinho[] = [];

  constructor() { }

  obtemCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho) {
    var exist = this.itens.findIndex(item => item.id == produto.id);
    if (exist >= 0){
      this.itens[exist].quantidade += produto.quantidade;
    } else {
      this.itens.push(produto);
    }
    this.armazenarLocal(this.itens);
  }

  atualizarCarrinho(produto: IProdutoCarrinho) {
    var item = this.itens.findIndex(item => item.id == produto.id);
    this.itens[item].quantidade = produto.quantidade;
    this.armazenarLocal(this.itens);
  }

  removerProdutoCarrinho(produtoId: number) {
    this.itens = this.itens.filter(item => item.id !== produtoId);
    this.armazenarLocal(this.itens);
  }

  limparCarrinho(){
    this.itens = [];
    localStorage.removeItem("carrinho");
  }

  armazenarLocal(itens: IProdutoCarrinho[]){
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }

}
