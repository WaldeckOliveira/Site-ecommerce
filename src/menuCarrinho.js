import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidada = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");

}

function irParaCheckout(){
  if(Object.keys(idsProdutoCarrinhoComQuantidada).length === 0){
    return;
  }
  window.location.href = "./checkout.html";
}


export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoIrParaCheckout = document.getElementById("finalizar-compra")

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}



function removerDoCarrinho(idProduto){
  delete idsProdutoCarrinhoComQuantidada[idProduto];
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidada);
  atualizarPrecoCarrinho();
  renderizarProdutoCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
  idsProdutoCarrinhoComQuantidada[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidada);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}
function decrementarQuantidadeProduto(idProduto){
  if (idsProdutoCarrinhoComQuantidada[idProduto] === 1 ) {
    removerDoCarrinho(idProduto);
    return;
  } 

  idsProdutoCarrinhoComQuantidada[idProduto]--;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidada);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);

}



function atualizarInformacaoQuantidade(idProduto){
document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidada[idProduto];

}

function desenharProdutoNoCarrinho(idProduto){

  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement('article');
  const articleClasses = [ "flex", "bg-slate-100", "rounded-lg", "p-1", "relative",];

 for (const articleClasse of articleClasses){

  elementoArticle.classList.add(articleClasse);

 }

  const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" 
  class="absolute top-0 right-2" 
    class="flex justify-between "><i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-700"></i>
  </button>
    <img src="./image/${produto.nomeArquivoImagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
  
  <div class="p-2 flex flex-col justify-between">
  <p class="text-slate-900 text-sm">${produto.nome}</p>
  <p class="text-slate-400 text-xs">Tamanho: Único</p>
  <p class="text-green-700 text-lg">R$${produto.preco}</p>
  </div>
  <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
      <button id="decrementar-produto-${produto.id}">-</button>
      <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhoComQuantidada[produto.id]}</p>
      <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>

  </div>`; 

  elementoArticle.innerHTML = cartaoProdutoCarrinho;

  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`decrementar-produto-${produto.id}`)
  .addEventListener("click", () => decrementarQuantidadeProduto(idProduto)) ;

  document.getElementById(`incrementar-produto-${produto.id}`)
  .addEventListener("click", () => incrementarQuantidadeProduto(idProduto)) ;

  document.getElementById(`remover-item-${produto.id}`)
  .addEventListener("click", () => removerDoCarrinho(produto.id)) ;

}



export function renderizarProdutoCarrinho(){
  const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutoCarrinhoComQuantidada){

    desenharProdutoNoCarrinho(idProduto);
  }
 
}


export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidada){
    incrementarQuantidadeProduto(idProduto);
    return;
  }

  idsProdutoCarrinhoComQuantidada[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidada);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

function atualizarPrecoCarrinho(){
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  
  for(const idProdutoDoCarrinho in idsProdutoCarrinhoComQuantidada){
    precoTotalCarrinho += catalogo.find(p => p.id === idProdutoDoCarrinho).preco * idsProdutoCarrinhoComQuantidada[idProdutoDoCarrinho];
  }

  precoCarrinho.innerText = `total: $${precoTotalCarrinho}`;
}

  