let categoriaCanecas = document.querySelector(".categoria")
let carrinho = document.querySelector(".lista-carrinho")
let listaProdutos = document.querySelector(".list-items")
let lateral = document.querySelector(".lateral")
let sectionCarrinho = document.querySelector(".carrinho")


let divPreco = document.createElement("div")
let divQuant = document.createElement("div")
let h2Quant = document.createElement("h2")
let pQuant = document.createElement("p")
let divTotal = document.createElement("div")
let h2Total = document.createElement("h2")
let pTotal = document.createElement("p")




function produtosLista(listaDeProdutos, secao){
    secao.innerHTML = ""

    for(let i = 0; i < listaDeProdutos.length; i++){
        let produto = listaDeProdutos[i]   
        if(secao == listaProdutos){
          let cardProduto = criarCard(produto)
              secao.appendChild(cardProduto)
          }else if(secao == carrinho){
            let cardProduto = criarCardCarrinho(produto)
            secao.appendChild(cardProduto)
            let total = soma(carrinhoCompras)
            
           if(carrinhoCompras.length > 0){
                    

        
                divPreco.classList.add("preco-final")
                divQuant.classList.add("quantidade-container")
                h2Quant.classList.add("quantidade-texto")
                pQuant.classList.add("quantidade-numero")
                divTotal.classList.add("total-container")
                h2Total.classList.add("total-texto")
                pTotal.classList.add("total-valor")
        
                h2Quant.innerText = "Quantidade:"
                pQuant.innerText = carrinhoCompras.length
        
                
                h2Total.innerText = "Total:"
                pTotal.innerText = `R$ ${total}`.replace("." , ",")
                lateral.appendChild(divPreco)
                divPreco.appendChild(divQuant)
                divQuant.appendChild(h2Quant)
                divQuant.appendChild(pQuant)
                divPreco.appendChild(divTotal)
                divTotal.appendChild(h2Total)
                divTotal.appendChild(pTotal)
        
            }else if(carrinhoCompras.length > 1){
                pQuant.innerText = carrinhoCompras.length
                
                pTotal.innerText = `R$ ${total}`.replace("." , ",")
            }  


          }
        
      
        }
}

produtosLista(data, listaProdutos)



function criarCard(produto){
    let nome = produto.nameItem
    let preco = produto.value
    let categoria = produto.tag
    let image = produto.img
    let description = produto.description
    let id = produto.id

    let li = document.createElement("li")
    let img = document.createElement("img")
    let pCategoria = document.createElement("p")
    let h2 = document.createElement("h2")
    let pText = document.createElement("p")
    let pPrice = document.createElement("p")
    let button = document.createElement("button")

    li.classList.add("item")
    img.classList.add("image-item")
    pCategoria.classList.add("categoria")
    h2.classList.add("nome")
    pText.classList.add("texto")
    pPrice.classList.add("preco")
    button.classList.add("botao-carrinho")


    img.src = image
    img.alt = nome
    h2.innerText = nome
    pCategoria.innerText = categoria
    pText.innerText = description
    pPrice.innerText = `R$ ${preco}`.replace("." , ",")
    button.innerText = "Adicionar ao Carrinho"
    button.setAttribute("id", id)

    li.appendChild(img)
    li.appendChild(pCategoria)
    li.appendChild(h2)
    li.appendChild(pText)
    li.appendChild(pPrice)
    li.appendChild(button)

    return li
  }



let inputBusca = document.querySelector(".pesquisa-campo")
let btnBusca = document.querySelector(".pesquisa-botao")

btnBusca.addEventListener("click", function(){
    
    let pesquisaUsuario = inputBusca.value
    let buscaResultado = busca(pesquisaUsuario)
    
    produtosLista(buscaResultado)

})

function busca(valorBusca){
    let resultadoBusca = []
    for (let i = 0; i < data.length; i++){
        let nomeMinusculo = data[i].nameItem.toLowerCase()
        let busca = valorBusca.toLowerCase()
        if(nomeMinusculo.includes(busca)){
            resultadoBusca.push(data[i])
        }
    
    }

    return resultadoBusca
}


        
listaProdutos.addEventListener("click", interceptandoProduto)
        
let carrinhoCompras = []

function interceptandoProduto(event){

    let btnComprar = event.target

    if(btnComprar.tagName == "BUTTON"){
        let idProduto = btnComprar.id

        let produto = data.find(function(produto){
            if(produto.id == idProduto){
                return produto
            }
        })
        adicionarCarrinho(produto)
    }
    

}


function adicionarCarrinho(produto){
    carrinhoCompras.push(produto)
    produtosLista(carrinhoCompras, carrinho)
}


function criarCardCarrinho(produto){
    let nome = produto.nameItem
    let preco = produto.value
    let image = produto.img
    let id = produto.id

    let li = document.createElement("li")
    let img = document.createElement("img")
    let div = document.createElement("div")
    let h2 = document.createElement("h2")
    let pPrice = document.createElement("p")
    let button = document.createElement("button")

    li.classList.add("item-carrinho")
    img.classList.add("image-item-carrinho")
    h2.classList.add("nome-carrinho")
    pPrice.classList.add("preco-carrinho")
    div.classList.add("content-carrinho")
    button.classList.add("botao-carrinho")
    button.classList.add("remover")


    img.src = image
    img.alt = nome
    h2.innerText = nome
    pPrice.innerText = `R$ ${preco}`.replace("." , ",")
    button.innerText = "Remover do Carrinho"
    button.setAttribute("id", id)

    li.appendChild(img)
    li.appendChild(div)
    div.appendChild(h2)
    div.appendChild(pPrice)
    div.appendChild(button)

    return li
  }


carrinho.addEventListener("click", interceptarCarrinho)

function interceptarCarrinho(event){
    let btnRemover = event.target
    if(btnRemover.tagName == "BUTTON"){
        let idCarrinho = btnRemover.id
        let produtoCarrinho = carrinhoCompras.findIndex(function(produto){
            if(produto.id == idCarrinho){
               return produto
            
            }
        })
        
        removerCarrinho(produtoCarrinho)
    }

    
}
function removerCarrinho(obj){
    carrinhoCompras.splice(obj, 1)
    produtosLista(carrinhoCompras, carrinho)
    if(carrinhoCompras.length == 0){
        carrinho.innerHTML = ""
        lateral.removeChild(divPreco)

        let liCarrinhoVazio = document.createElement("li")
        let h3CarrinhoVazio = document.createElement("h3")
        let pCarrinhoVazio = document.createElement("p")

        liCarrinhoVazio.classList.add("carrinho-vazio")
        h3CarrinhoVazio.classList.add("carrinho-maintext")
        pCarrinhoVazio.classList.add("carrinho-subtext")

        h3CarrinhoVazio.innerText = "Carrinho Vazio"
        pCarrinhoVazio.innerText = "Adicione Itens"
        
        carrinho.appendChild(liCarrinhoVazio)
        liCarrinhoVazio.appendChild(h3CarrinhoVazio)
        liCarrinhoVazio.appendChild(pCarrinhoVazio)
        
        
    }
}



    


function soma(valor){
    let somatorio = 0
        for(let i = 0; i < valor.length; i++){
            somatorio += valor[i].value  
            
        }
        return somatorio
}