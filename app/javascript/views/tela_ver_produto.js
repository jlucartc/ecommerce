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

var desloca_carroussel_cima = function(){
	var carroussel = document.getElementById('produto-carroussel-imagens')
	var cover = document.getElementById('produto-carroussel-cover')
	var imagens = carroussel.getElementsByClassName('produto-carroussel-imagem')
	if(carroussel.offsetTop > -(carroussel.offsetHeight - cover.offsetHeight)){
		carroussel.style.top = (carroussel.offsetTop - 20).toString()+'px';
	}
}

var desloca_carroussel_baixo = function(){
	var carroussel = document.getElementById('produto-carroussel-imagens')
	var cover = document.getElementById('produto-carroussel-cover')
	var imagens = carroussel.getElementsByClassName('produto-carroussel-imagem')
	if(carroussel.offsetTop < 0){
		carroussel.style.top = (carroussel.offsetTop + 20).toString()+'px';
	}
}

var desloca_carroussel = function(evento){
	console.log(evento)
	if(evento.deltaY > 0){
		desloca_carroussel_baixo()
	}else{
		desloca_carroussel_cima()
	}
}

var registra_eventos = function(){
		
		var botoes_adicionar_carrinho = Array.from(document.getElementsByClassName('botao-adicionar-carrinho'))
		var carroussel = document.getElementById('produto-carroussel-cover')
		var carroussel_up = document.getElementById('produto-carroussel-up')
		var carroussel_down = document.getElementById('produto-carroussel-down')
		var carroussel_mouse_scroll = ''

		botoes_adicionar_carrinho.forEach((elemento) => {
			elemento.removeEventListener('click',function(){ adiciona_item_carrinho(elemento.id.split('-').pop()) })
		})

		botoes_adicionar_carrinho.forEach((elemento) => {
			elemento.addEventListener('click',function(){ adiciona_item_carrinho(elemento.id.split('-').pop()) })
		})

		carroussel.removeEventListener('wheel',function(evento){ desloca_carroussel(evento) })

		carroussel.addEventListener('wheel',function(evento){ desloca_carroussel(evento) })

		carroussel_up.removeEventListener('mouseleave',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_up.removeEventListener('mouseup',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_up.removeEventListener('mousedown',function(){ carroussel_mouse_scroll = setInterval(function(){ desloca_carroussel_baixo()},50) })

		carroussel_up.addEventListener('mouseleave',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_up.addEventListener('mouseup',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_up.addEventListener('mousedown',function(){ carroussel_mouse_scroll = setInterval(function(){ desloca_carroussel_baixo()},50) })

		carroussel_down.removeEventListener('mouseleave',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_down.removeEventListener('mouseup',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_down.removeEventListener('mousedown',function(){ carroussel_mouse_scroll = setInterval(function(){ desloca_carroussel_cima()},50) })

		carroussel_down.addEventListener('mouseleave',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_down.addEventListener('mouseup',function(){ clearInterval(carroussel_mouse_scroll)})
		carroussel_down.addEventListener('mousedown',function(){ carroussel_mouse_scroll = setInterval(function(){ desloca_carroussel_cima()},50) })
}

document.addEventListener('turbo:load',function(){

	registra_eventos()

})