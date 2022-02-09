var adiciona_item_carrinho = function(id){
	var carrinho = 	JSON.parse(localStorage.getItem('carrinho'))

	if(carrinho === null || carrinho === undefined){
		localStorage.setItem('carrinho',JSON.stringify([]))
	}else{
		if(!carrinho.includes(id)){
			carrinho.push(id)
			localStorage.setItem('carrinho',JSON.stringify(carrinho))
		}
	}
}

var remove_item_carrinho = function(id){
	var carrinho = JSON.parse(localStorage.getItem('carrinho'))
	if(carrinho.includes(id)){
		localStorage.setItem('carrinho',JSON.stringify(carrinho.slice(0,-1)))
	}
}


var gera_itens_carrinho = function(itens){
	var itens_container = document.getElementById('carrinho-itens')
	if(itens != null && itens != undefined){
		itens.forEach((item) => {
			if(document.getElementById('botao-remover-carrinho-'+item.id) == null){
				botao_remover_carrinho = document.createElement('button')
				botao_remover_carrinho.className = 'botao-remover-carrinho'
				botao_remover_carrinho.id = 'botao-remover-carrinho-'+item.id
				botao_remover_carrinho.innerHTML = 'Remover'
				itens_container.appendChild(botao_remover_carrinho)
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
	ajax.send('{"data":'+JSON.stringify(itens_carrinho)+"}")
}

var registra_eventos = function(){
		var botoes_adicionar_carrinho = Array.from(document.getElementsByClassName('botao-adicionar-carrinho'))
		var botoes_remover_carrinho = Array.from(document.getElementsByClassName('botao-remover-carrinho'))

		botoes_adicionar_carrinho.forEach((item) => {
			item.removeEventListener('click',function(){ adiciona_item_carrinho(item.id.split('-').pop()) })
		})

		botoes_adicionar_carrinho.forEach((item) => {
			item.addEventListener('click',function(){ adiciona_item_carrinho(item.id.split('-').pop()) })
		})

		botoes_remover_carrinho.forEach((item) => {
			item.removeEventListener('click',function(){ remove_item_carrinho(item.id.split('-').pop()) })
		})

		botoes_remover_carrinho.forEach((item) => {
			item.addEventListener('click',function(){ remove_item_carrinho(item.id.split('-').pop()) })
		})
}

document.onreadystatechange = function(){

	if(document.readyState === 'complete'){

		consulta_produtos()

	}

}