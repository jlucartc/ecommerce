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

var inicia_carroussel = function(){
	var imagens = Array.from(document.getElementsByClassName('carroussel-imagem'))
	if(imagens.length > 0){
		imagens[0].style.display = ''
		imagens.slice(1).forEach((el) => {el.style.display = 'none'})
	}
}

var inicia_carroussel_fim = function(){
	var imagens = Array.from(document.getElementsByClassName('carroussel-imagem'))
	if(imagens.length > 0){
		imagens[imagens.length-1].style.display = ''
		imagens.slice(0,imagens.length-1).forEach((el) => {el.style.display = 'none'})	
	}
}

var move_carroussel_esquerda = function(){
	var carroussel_imagens = Array.from(document.getElementsByClassName('carroussel-imagem'))
	
	if(carroussel_imagens.length > 0){
		var carroussel_imagens_escondidas = carroussel_imagens.filter((el) => {return el.style.display == 'none'})
		var carroussel_imagem_banner = carroussel_imagens.filter((el) => {return el.style.display != 'none'})[0]

		if(carroussel_imagens_escondidas.length == 0){
			inicia_carroussel()
		}else{
			if(carroussel_imagens.indexOf(carroussel_imagem_banner) == 0){
				carroussel_imagem_banner.style.display = ''
				inicia_carroussel_fim()
			}else{
				carroussel_imagem_banner.style.display = 'none'
				carroussel_imagem_banner.previousElementSibling.style.display = ''
			}
		}
	}
}

var move_carroussel_direita = function(){
	var carroussel_imagens = Array.from(document.getElementsByClassName('carroussel-imagem'))
	
	if(carroussel_imagens.length > 0){
		var carroussel_imagens_escondidas = carroussel_imagens.filter((el) => {return el.style.display == 'none'})
		var carroussel_imagem_banner = carroussel_imagens.filter((el) => {return el.style.display != 'none'})[0]

		if(carroussel_imagens_escondidas.length == 0){
			inicia_carroussel()
		}else{
			if(carroussel_imagens.indexOf(carroussel_imagem_banner) == carroussel_imagens.length-1){
				carroussel_imagem_banner.style.display = ''
				inicia_carroussel()
			}else{
				carroussel_imagem_banner.style.display = 'none'
				carroussel_imagem_banner.nextElementSibling.style.display = ''
			}
		}
	}
}

var visualizar_produto = function(elemento){
	var link = Array.from(elemento.getElementsByClassName('oferta-produto-link'))[0]
	link.dispatchEvent(new MouseEvent('click'))
}

var ajustar_imagens_ofertas = function(){
	var ofertas_produtos_imagens = Array.from(document.getElementsByClassName('oferta-produto-imagem'))
	ofertas_produtos_imagens.forEach((item) => {
		item.style.backgroundImage = 'url('+item.src+')';
		item.style.backgroundPosition = 'center';
		item.style.backgroundSize = 'cover';
		item.src = '';
	})
}

var registra_eventos = function(){
		
		var botoes_adicionar_carrinho = Array.from(document.getElementsByClassName('botao-adicionar-carrinho'))
		var carroussel_left = Array.from(document.getElementsByClassName('carroussel-cover-left'))
		var carroussel_right = Array.from(document.getElementsByClassName('carroussel-cover-right'))
		var oferta_produtos = Array.from(document.getElementsByClassName('oferta-produto'))

		oferta_produtos.forEach((elemento) => {
			elemento.removeEventListener('click',function(){ visualizar_produto(elemento) })
		})

		oferta_produtos.forEach((elemento) => {
			elemento.addEventListener('click',function(){ visualizar_produto(elemento) })
		})

		carroussel_left.forEach((elemento) =>{
			elemento.removeEventListener('click',function(){ move_carroussel_esquerda() })
		})

		carroussel_left.forEach((elemento) => {
			elemento.addEventListener('click',function(){ move_carroussel_esquerda() })
		})

		carroussel_right.forEach((elemento) =>{
			elemento.removeEventListener('click',function(){ move_carroussel_direita() })
		})

		carroussel_right.forEach((elemento) => {
			elemento.addEventListener('click',function(){ move_carroussel_direita() })
		})

		botoes_adicionar_carrinho.forEach((elemento) => {
			elemento.removeEventListener('click',function(){ adiciona_item_carrinho(elemento.id.split('-').pop()) })
		})

		botoes_adicionar_carrinho.forEach((elemento) => {
			elemento.addEventListener('click',function(){ adiciona_item_carrinho(elemento.id.split('-').pop()) })
		})

}

document.addEventListener('turbo:load',function(){

	registra_eventos()
	inicia_carroussel()
	ajustar_imagens_ofertas()

})