function inicia_carroussel(){
	var imagens = Array.from(document.getElementsByClassName('carroussel-imagem'))
	if(imagens.length > 0){
		imagens[0].style.display = ''
		imagens.slice(1).forEach((el) => {el.style.display = 'none'})
	}
}

function inicia_carroussel_fim(evento){
	var imagens = Array.from(document.getElementsByClassName('carroussel-imagem'))
	if(imagens.length > 0){
		imagens[imagens.length-1].style.display = ''
		imagens.slice(0,imagens.length-1).forEach((el) => {el.style.display = 'none'})	
	}
}

function move_carroussel_esquerda(evento){
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

function move_carroussel_direita(evento){
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

function visualizar_produto(evento){
	var elemento = evento.target
	while(elemento.className != 'oferta-produto'){
		elemento = elemento.parentElement
	}
	var link = Array.from(elemento.getElementsByClassName('oferta-produto-link'))[0]
	link.dispatchEvent(new MouseEvent('click'))
}

export {
	inicia_carroussel,
	inicia_carroussel_fim,
	move_carroussel_direita,
	move_carroussel_esquerda,
	visualizar_produto
}