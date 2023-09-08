export const catalogo = [
    {
        id: '1',
        nome: 'Conjunto Branco e Preto',
        marca: 'Pri Fitness',
        preco: 80,
        nomeArquivoImagem: "roupa  (1).png",
        feminino: true,
    },
    {
        id: '2',
        nome: 'Conjunto Rosa Mesclado ',
        marca: 'Pri Fitness',
        preco: 90,
        nomeArquivoImagem: "roupa  (2).png",
        feminino: true,
    },
    {
        id: '3',
        nome: 'Conjunto Lilás',
        marca: 'Pri Fitness',
        preco: 70,
        nomeArquivoImagem: "roupa  (3).png",
        feminino: true,
    },
    {
        id: '4',
        nome: 'Conjunto Rosa',
        marca: 'Pri Fitness',
        preco: 110,
        nomeArquivoImagem: "roupa  (4).png",
        feminino: true,
    },
    {
        id: '5',
        nome: 'Conjunto Branco',
        marca: 'Pri Fitness',
        preco: 100,
        nomeArquivoImagem: "roupa  (5).png",
        feminino: true,
    },
    {
        id: '6',
        nome: 'Conjunto Preto',
        marca: 'Pri Fitness',
        preco: 95,
        nomeArquivoImagem: "roupa  (6).png",
        feminino: true,
    },
    {
        id: '7',
        nome: 'Conjunto Lilás',
        marca: 'Pri Fitness',
        preco: 80,
        nomeArquivoImagem: "roupa  (7).png",
        feminino: true,
    },
    {
        id:'8',
        nome: 'Conjunto Azul',
        marca: 'Pri Fitness',
        preco: 115,
        nomeArquivoImagem: "roupa  (8).png",
        feminino: true,
    },
    {
        id:'9',
        nome: 'Conjunto Rosa short',
        marca: 'Pri Fitness',
        preco: 70,
        nomeArquivoImagem: "roupa  (9).png",
        feminino: true,
    },
    {
        id: '10',
        nome: 'Conjunto Vermelho',
        marca: 'Pri Fitness',
        preco: 120,
        nomeArquivoImagem: "roupa  (10).png",
        feminino: true,
    },
];


export function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify (informacao) );
}

export function lerLocalStorage(chave){
  return JSON.parse (localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave){
localStorage.removeItem(chave);
}


export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto){

    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById(idContainerHtml);
  
    const elementoArticle = document.createElement('article');
    const articleClasses = [ 
        "flex", 
        "bg-stone-200", 
        "rounded-lg", 
        "p-1", 
        "relative",
        "mb-2",
        "w-96"
    ];
  
   for (const articleClasse of articleClasses){
  
    elementoArticle.classList.add(articleClasse);
  
   }
  
    const cartaoProdutoCarrinho = `
      <img src="./image/${produto.nomeArquivoImagem}
      " alt="Carrinho: ${produto.nome}
      " class="h-24 rounded-lg">
    
    <div class="p-2 flex flex-col justify-between">
    <p class="text-slate-900 text-sm">${produto.nome}</p>
    <p class="text-slate-400 text-xs">Tamanho: Único</p>
    <p class="text-green-700 text-lg">R$${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
        <p id="quantidade-${produto.id}" class="ml-2">
        ${quantidadeProduto}</p>
  
    </div>`; 
  
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
  
    containerProdutosCarrinho.appendChild(elementoArticle);
  
   
  
  }