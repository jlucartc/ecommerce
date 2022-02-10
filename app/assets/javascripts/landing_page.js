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

var registra_eventos = function(){
		
		var botoes_adicionar_carrinho = Array.from(document.getElementsByClassName('botao-adicionar-carrinho'))

		botoes_adicionar_carrinho.forEach((item) => {
			item.removeEventListener('click',function(){ adiciona_item_carrinho(item.id.split('-').pop()) })
		})

		botoes_adicionar_carrinho.forEach((item) => {
			item.addEventListener('click',function(){ adiciona_item_carrinho(item.id.split('-').pop()) })
		})

}

document.onreadystatechange = function(){

	if(document.readyState === 'complete'){

		registra_eventos()

	}

}