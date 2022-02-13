var adiciona_item_carrinho = function(id){
	var carrinho = 	JSON.parse(localStorage.getItem('carrinho'))

	if(carrinho === null || carrinho === undefined){
		localStorage.setItem('carrinho',JSON.stringify([id]))
	}else{
		if(!carrinho.includes(id)){
			carrinho.push(id)
			localStorage.setItem('carrinho',JSON.stringify(carrinho))
		}
	}
}


var registra_eventos = function(){
		
		var botoes_adicionar_carrinho = Array.from(document.getElementsByClassName('botao-adicionar-carrinho'))

		botoes_adicionar_carrinho.forEach((elemento) => {
			elemento.removeEventListener('click',function(){ adiciona_item_carrinho(elemento.id.split('-').pop()) })
		})

		botoes_adicionar_carrinho.forEach((elemento) => {
			elemento.addEventListener('click',function(){ adiciona_item_carrinho(elemento.id.split('-').pop()) })
		})

}

document.addEventListener('turbo:load',function(){

	registra_eventos()

})