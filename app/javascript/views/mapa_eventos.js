import * as tela_carrinho_callbacks from './tela_carrinho_callbacks'
import * as pedidos_comprador_callbacks from './pedidos_comprador_callbacks'
import * as tela_ver_produto_callbacks from './tela_ver_produto_callbacks'
import * as tela_landing_page_callbacks from './tela_landing_page_callbacks'
import * as helpers from './helpers'


var mapa_classe_eventos_turbo_load = [
	{classe:'produto-carroussel-imagem',evento:'click',callbacks: [tela_ver_produto_callbacks.seleciona_imagem_carroussel]},
	{classe:'item-carrinho-controles-remover',evento:'click',callbacks:[tela_carrinho_callbacks.remove_item_carrinho]},
	{classe:'botao-adicionar-carrinho',evento:'click',callbacks:[tela_ver_produto_callbacks.adiciona_item_carrinho]},
	{classe:'carroussel-cover-left',evento:'click',callbacks:[tela_landing_page_callbacks.move_carroussel_esquerda]},
	{classe:'carroussel-cover-right',evento:'click',callbacks:[tela_landing_page_callbacks.move_carroussel_direita]},
	{classe:'oferta-produto',evento:'click',callbacks:[tela_landing_page_callbacks.visualizar_produto]}
]

var mapa_id_eventos_turbo_load = [
	{id:'produto-carroussel-imagens',evento:'wheel',callbacks:[tela_ver_produto_callbacks.desloca_carroussel]},
	{id:'produto-carroussel-up',evento:'mouseleave',callbacks:[tela_ver_produto_callbacks.interrompe_deslocamento_carroussel]},
	{id:'produto-carroussel-up',evento:'mouseup',callbacks:[tela_ver_produto_callbacks.interrompe_deslocamento_carroussel]},
	{id:'produto-carroussel-up',evento:'mousedown',callbacks:[tela_ver_produto_callbacks.desloca_carroussel_continuo_baixo]},
	{id:'produto-carroussel-down',evento:'mouseleave',callbacks:[tela_ver_produto_callbacks.interrompe_deslocamento_carroussel]},
	{id:'produto-carroussel-down',evento:'mouseup',callbacks:[tela_ver_produto_callbacks.interrompe_deslocamento_carroussel]},
	{id:'produto-carroussel-down',evento:'mousedown',callbacks:[tela_ver_produto_callbacks.desloca_carroussel_continuo_cima]}
]

var lista_executar_turbo_load = [
	tela_carrinho_callbacks.consulta_produtos,
	pedidos_comprador_callbacks.limpa_carrinho,
	tela_landing_page_callbacks.inicia_carroussel,
	tela_landing_page_callbacks.ajustar_imagens_ofertas
]

var mapa_classe_eventos_cria_carrinho = [
	{classe:'item-carrinho-quantidade-diminui',evento:'click',callbacks:[tela_carrinho_callbacks.diminui_quantidade_item,tela_carrinho_callbacks.atualiza_total_item,tela_carrinho_callbacks.atualizar_total_carrinho]},
	{classe:'item-carrinho-quantidade-aumenta',evento:'click',callbacks:[tela_carrinho_callbacks.aumenta_quantidade_item,tela_carrinho_callbacks.atualiza_total_item,tela_carrinho_callbacks.atualizar_total_carrinho]},
	{classe:'item-carrinho-controles-remover',evento:'click',callbacks:[tela_carrinho_callbacks.remove_item_carrinho,tela_carrinho_callbacks.atualizar_total_carrinho]},
]

var mapa_id_eventos_cria_carrinho = []

var lista_executar_cria_carrinho = []

function remove_event_listener(item){
	if(item.hasOwnProperty('classe')){
		var elementos = Array.from(document.getElementsByClassName(item.classe))
		elementos.forEach((elemento)=>{
			elemento.removeEventListener(item.evento,function(evento){
				item.callbacks.forEach((callback)=>{callback(evento)})
			})
		})
	}else if(item.hasOwnProperty('id')){
		var elemento = document.getElementById(item.id)
		if(helpers.exists(elemento)){
			elemento.removeEventListener(item.evento,function(evento){
				item.callbacks.forEach((callback)=>{callback(evento)})
			})
		}
	}
}

function adiciona_event_listener(item){
	if(item.hasOwnProperty('classe')){
		var elementos = Array.from(document.getElementsByClassName(item.classe))
		elementos.forEach((elemento)=>{
			elemento.addEventListener(item.evento,function(evento){
				item.callbacks.forEach((callback)=>{callback(evento)})
			})
		})
	}else if(item.hasOwnProperty('id')){
		var elemento = document.getElementById(item.id)
		if(helpers.exists(elemento)){
			elemento.addEventListener(item.evento,function(evento){
				item.callbacks.forEach((callback)=>{callback(evento)})
			})
		}	
	}
}

document.addEventListener('turbo:load',function(){

	mapa_classe_eventos_turbo_load.forEach((item)=>{
		remove_event_listener(item)
		adiciona_event_listener(item)
	})

	mapa_id_eventos_turbo_load.forEach((item)=>{
		remove_event_listener(item)
		adiciona_event_listener(item)
	})

	lista_executar_turbo_load.forEach((method) => {
		method()
	})

})


document.addEventListener('cria-carrinho',function(){

	mapa_classe_eventos_cria_carrinho.forEach((item)=>{
		remove_event_listener(item)
		adiciona_event_listener(item)
	})

	mapa_id_eventos_cria_carrinho.forEach((item)=>{
		remove_event_listener(item)
		adiciona_event_listener(item)
	})

	lista_executar_cria_carrinho.forEach((method) => {
		method()
	})

})