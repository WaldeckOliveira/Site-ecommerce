import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarCarrinho, renderizarProdutoCarrinho } from "./src/menuCarrinho";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import { apagarDoLocalStorage } from "./src/utilidades";


renderizarCatalogo();
inicializarCarrinho();
renderizarProdutoCarrinho()
atualizarPrecoCarrinho();
inicializarFiltros ();
apagarDoLocalStorage();
