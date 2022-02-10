var remove_item_carrinho = function(evento,id){
	var carrinho = JSON.parse(localStorage.getItem('carrinho'))
	if(carrinho.includes(id)){
		localStorage.setItem('carrinho',JSON.stringify(carrinho.slice(0,-1)))
	}
	var item = document.getElementById('carrinho-item-'+id)
	var item_container = item.parentNode
	item_container.removeChild(item)
}

var html_item_carrinho = function(data){
	var carrinho_item = document.createElement('div')
	var informacoes = document.createElement('div')
	var quantidade = document.createElement('div')
	var controles = document.createElement('div')
	var nome = document.createElement('p')
	var preco = document.createElement('p')
	var remover = document.createElement('button')
	var input_quantidade = document.createElement('input')
	var aumenta_quantidade = document.createElement('button')
	var diminui_quantidade = document.createElement('button')

	carrinho_item.className = 'carrinho-item'
	carrinho_item.id = 'carrinho-item-'+data.id
	informacoes.className = 'item-carrinho-informacoes'
	quantidade.className = 'item-carrinho-quantidade'
	controles.className = 'item-carrinho-controles'
	nome.className = 'item-carrinho-informacoes-nome'
	preco.className = 'item-carrinho-informacoes-preco'
	remover.className = 'item-carrinho-controles-remover'
	remover.id = 'item-carrinho-controles-remover-'+data.id
	input_quantidade.className = 'item-carrinho-quantidade-input'
	aumenta_quantidade.className = 'item-carrinho-quantidade-aumenta'
	diminui_quantidade.className = 'item-carrinho-quantidade-diminui'
	remover.innerText = 'Remover'
	aumenta_quantidade.innerText = '+'
	diminui_quantidade.innerText = '-'
	input_quantidade.type = 'number'
	input_quantidade.min = 1
	input_quantidade.mac = data.quantidade
	nome.innerText = data.nome
	preco.innerText = 'R$ '+data.preco

	informacoes.appendChild(nome)
	informacoes.appendChild(preco)
	quantidade.appendChild(diminui_quantidade)
	quantidade.appendChild(input_quantidade)
	quantidade.appendChild(aumenta_quantidade)
	controles.appendChild(remover)
	carrinho_item.appendChild(informacoes)
	carrinho_item.appendChild(quantidade)
	carrinho_item.appendChild(controles)

	return carrinho_item
}


var gera_itens_carrinho = function(itens){
	var itens_container = document.getElementById('carrinho-itens')
	if(itens != null && itens != undefined){
		itens.forEach((item) => {
			if(document.getElementById('item-carrinho-controles-remover-'+item.id) == null){
				itens_container.appendChild(html_item_carrinho(item))
			}
		})
	}
	registra_eventos()
}

var consulta_produtos = function(){
	var itens_carrinho = JSON.parse(localStorage.getItem('carrinho'))
	var ajax = new XMLHttpRequest();
	ajax.onload = function(e){
		gera_itens_carrinho(JSON.parse(e.target.response))
	}
	ajax.open('POST','/consultar_produtos')
	ajax.setRequestHeader("Content-type", "application/json");
	ajax.setRequestHeader("X-CSRF-Token", document.getElementsByName('csrf-token')[0].content);
	ajax.send('{"data":'+JSON.stringify(itens_carrinho)+"}")
}

var registra_eventos = function(){
		var botoes_remover_carrinho = Array.from(document.getElementsByClassName('item-carrinho-controles-remover'))

		botoes_remover_carrinho.forEach((item) => {
			item.removeEventListener('click',function(e){ remove_item_carrinho(e,item.id.split('-').pop()) })
		})

		botoes_remover_carrinho.forEach((item) => {
			item.addEventListener('click',function(e){ remove_item_carrinho(e,item.id.split('-').pop()) })
		})
}

document.onreadystatechange = function(){

	if(document.readyState === 'complete'){

		consulta_produtos()

	}

}