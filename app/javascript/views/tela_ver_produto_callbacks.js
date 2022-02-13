var carroussel_mouse_scroll = null

function adiciona_item_carrinho(evento){
	var carrinho = 	JSON.parse(localStorage.getItem('carrinho'))
	var id = evento.target.id.split('-').pop()

	if(carrinho === null || carrinho === undefined){
		localStorage.setItem('carrinho',JSON.stringify([id]))
	}else{
		if(!carrinho.includes(id)){
			carrinho.push(id)
			localStorage.setItem('carrinho',JSON.stringify(carrinho))
		}
	}
}

function interrompe_deslocamento_carroussel(){
	clearInterval(carroussel_mouse_scroll)
}


function desloca_carroussel_continuo_cima(){
	carroussel_mouse_scroll = setInterval(function(){desloca_carroussel_cima()},50)
}

function desloca_carroussel_continuo_baixo(){
	carroussel_mouse_scroll = setInterval(function(){desloca_carroussel_baixo()},50)
}

function desloca_carroussel_cima(){
	var carroussel = document.getElementById('produto-carroussel-imagens')
	var cover = document.getElementById('produto-carroussel-cover')
	var imagens = carroussel.getElementsByClassName('produto-carroussel-imagem')
	if(carroussel.offsetTop > -(carroussel.offsetHeight - cover.offsetHeight)){
		carroussel.style.top = (carroussel.offsetTop - 20).toString()+'px';
	}
}

function desloca_carroussel_baixo(){
	var carroussel = document.getElementById('produto-carroussel-imagens')
	var cover = document.getElementById('produto-carroussel-cover')
	var imagens = carroussel.getElementsByClassName('produto-carroussel-imagem')
	if(carroussel.offsetTop < 0){
		carroussel.style.top = (carroussel.offsetTop + 20).toString()+'px';
	}
}

function desloca_carroussel(evento){
	if(evento.deltaY > 0){
		desloca_carroussel_cima()
	}else{
		desloca_carroussel_baixo()
	}
}

export {
	adiciona_item_carrinho,
	desloca_carroussel_cima,
	desloca_carroussel_baixo,
	desloca_carroussel,
	interrompe_deslocamento_carroussel,
	desloca_carroussel_continuo_cima,
	desloca_carroussel_continuo_baixo
}