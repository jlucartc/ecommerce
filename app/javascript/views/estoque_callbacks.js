import * as helpers from './helpers'

function aumenta_quantidade(evento){
	var input = evento.target.previousElementSibling
	if(parseInt(input.value) != parseInt(input.value)){
		input.value = 0
	}else{
		input.value = parseInt(input.value) + 1 
	}
}

function diminui_quantidade(evento){
	var input = evento.target.nextElementSibling
	if(parseInt(input.value) >= 1){
		input.value = parseInt(input.value) - 1
	}
}

function atualiza_pagina(){
	window.location.reload(true)
}

function aumentar_estoque(evento){
	var quantidade_produto = evento.target.parentElement.getElementsByClassName('produto-adiciona-estoque-quantidade')[0].value
	var produto_id = evento.target.parentElement.parentElement.id.split('-').pop()
	var ajax = new XMLHttpRequest();
	ajax.onload = function(e){
		atualiza_pagina()
	}
	ajax.open('POST','/aumentar_estoque')
	ajax.setRequestHeader("Content-type", "application/json");
	ajax.setRequestHeader("X-CSRF-Token", document.getElementsByName('csrf-token')[0].content);
	ajax.send('{"data":'+JSON.stringify({produto: parseInt(produto_id), quantidade: parseInt(quantidade_produto)})+"}")
}

export {
	aumenta_quantidade,
	diminui_quantidade,
	aumentar_estoque
}