import { apagarDoLocalStorage, desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidada = lerLocalStorage("carrinho") ?? {};
    for (const idProduto in idsProdutoCarrinhoComQuantidada) {
        desenharProdutoCarrinhoSimples(
            idProduto,
            "container-produto-checkout",
            idsProdutoCarrinhoComQuantidada[idProduto]
        );
    }
}

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidada = lerLocalStorage("carrinho") ?? {};
    if(Object.keys (idsProdutoCarrinhoComQuantidada).length === 0){
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidada
    }
    const historicoDePedidos = lerLocalStorage ("historico") ?? [];
    const historicoDePedidosAtualizados = [pedidoFeito, ...historicoDePedidos]
    salvarLocalStorage("historico", historicoDePedidosAtualizados);
    apagarDoLocalStorage("carrinho");
    window.location.href = "./pedidos.html";

}


desenharProdutosCheckout();

document.addEventListener("submit",(evt) => finalizarCompra (evt));