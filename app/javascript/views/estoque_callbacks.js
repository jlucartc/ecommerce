import * as helpers from './helpers'

function reseta_dropdown(evento){
	var quantidade = evento.target.parentElement.getElementsByClassName('quantidade-estoque')[0]
	quantidade.value = 0
}

function alterna_dropdown(evento){
	var dropdown_button = evento.target
	var dropdown = Array.from(dropdown_button.parentElement.getElementsByClassName('produto-dropdown')).pop()
	if(dropdown.style.display != ''){
		dropdown.style.display = ''
	}else{
		dropdown.style.display = 'none'
	}
	reseta_dropdown(evento)
}

function inicializa_dropdowns(){
	var dropdowns = Array.from(document.getElementsByClassName('produto-dropdown'))
	dropdowns.forEach((item) => {
		item.style.display = 'none'
	})
}

function aumenta_quantidade(evento){
	var input = evento.target.previousElementSibling
	if(parseInt(input.value) != parseInt(input.value)){
		input.value = 1
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
	var quantidade_produto = evento.target.parentElement.getElementsByClassName('quantidade-estoque')[0].value
	var produto_id = evento.target.parentElement.parentElement.parentElement.id.split('-').pop()
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
	alterna_dropdown,
	inicializa_dropdowns,
	aumenta_quantidade,
	diminui_quantidade,
	aumentar_estoque
}