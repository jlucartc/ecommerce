function aumenta_quantidade_item(evento){
	var input = evento.target.parentElement.getElementsByClassName('item-carrinho-quantidade-input')[0]
	if(input.value < input.max){
		input.value = parseFloat(input.value) + 1
	}
}

function diminui_quantidade_item(evento){
	var input = evento.target.parentElement.getElementsByClassName('item-carrinho-quantidade-input')[0]
	if(input.value > 1){
		input.value = parseFloat(input.value) - 1
	}
}

function atualiza_total_item(evento){
	var input = evento.target.parentElement.getElementsByClassName('item-carrinho-quantidade-input')[0]
	var preco = evento.target.parentElement.parentElement.getElementsByClassName('item-carrinho-informacoes-preco')[0]
	var total = evento.target.parentElement.parentElement.getElementsByClassName('item-carrinho-total')[0]
	total.innerText = 'R$ '+(parseFloat(preco.innerText.split(' ').pop()) * parseFloat(input.value))
}

function remove_item_carrinho(evento){
	var id = evento.target.id.split('-').pop()
	var carrinho = JSON.parse(localStorage.getItem('carrinho'))
	if(carrinho.includes(id)){
		carrinho.splice(carrinho.indexOf(id),1)
		localStorage.setItem('carrinho',JSON.stringify(carrinho))
		var item = document.getElementById('carrinho-item-'+id)
		var item_container = item.parentNode
		item_container.removeChild(item)
	}
}

function atualizar_total_carrinho(){
	var total = document.getElementById('valor-total-value')
	total.innerText = soma_produtos_carrinho()
}

function soma_produtos_carrinho(){
	var itens = Array.from(document.getElementsByClassName('carrinho-item'))
	var total = 0;
	itens.forEach((item) => {
		var preco = parseFloat(item.getElementsByClassName('item-carrinho-informacoes-preco')[0].innerText.split(' ').pop())
		var quantidade = parseFloat(item.getElementsByClassName('item-carrinho-quantidade-input')[0].value)
		total += preco * quantidade
	})
	return total
}


function html_carrinho_header(){
	var carrinho_header = document.createElement('div')
	var carrinho_titulo = document.createElement('div')
	carrinho_header.id = 'carrinho-header'
	carrinho_titulo.id = 'carrinho-titulo'
	carrinho_titulo.innerText = "Carrinho"
	carrinho_header.appendChild(carrinho_titulo)
	return carrinho_header
}

function html_total_compra(){
	var total_container = document.createElement('div')
	var label = document.createElement('label')
	var value = document.createElement('p')
	total_container.id = 'valor-total'
	label.id = 'valor-total-label'
	value.id = 'valor-total-value'
	value.innerText = soma_produtos_carrinho()
	label.innerText = 'Total: R$'
	total_container.appendChild(label)
	total_container.appendChild(value)
	return total_container
}

function html_finalizar_compra(){
	var finalizar_compra = document.createElement('input')
	finalizar_compra.type = "submit"
	finalizar_compra.value = 'Finalizar compra'
	finalizar_compra.id = 'finalizar-compra'

	return finalizar_compra
}

function html_item_carrinho(data){
	var carrinho_item = document.createElement('div')
	var icone_container = document.createElement('div')
	var icone_link = document.createElement('a')
	var icone_imagem = document.createElement('img')
	var informacoes = document.createElement('div')
	var quantidade = document.createElement('div')
	var controles = document.createElement('div')
	var nome = document.createElement('p')
	var preco = document.createElement('p')
	var remover = document.createElement('button')
	var input_quantidade = document.createElement('input')
	var input_produto_id = document.createElement('input')
	var aumenta_quantidade = document.createElement('button')
	var diminui_quantidade = document.createElement('button')
	var total = document.createElement('p')

	carrinho_item.className = 'carrinho-item'
	carrinho_item.id = 'carrinho-item-'+data.id
	icone_container.className = 'item-carrinho-icone-container'
	icone_link.className = 'item-carrinho-icone-link'
	icone_imagem.className = 'item-carrinho-icone-imagem'
	icone_imagem.src = data.icone_path
	informacoes.className = 'item-carrinho-informacoes'
	quantidade.className = 'item-carrinho-quantidade'
	controles.className = 'item-carrinho-controles'
	nome.className = 'item-carrinho-informacoes-nome'
	preco.className = 'item-carrinho-informacoes-preco'
	total.className = 'item-carrinho-total'
	remover.className = 'item-carrinho-controles-remover'
	remover.id = 'item-carrinho-controles-remover-'+data.id
	input_quantidade.className = 'item-carrinho-quantidade-input'
	input_quantidade.name = 'produtos[][quantidade]'
	input_quantidade.type = 'number'
	input_quantidade.min = 1
	input_quantidade.max = Math.max(data.quantidade,1)
	input_quantidade.value = 1
	input_produto_id.className = 'item-carrinho-produto-id'
	input_produto_id.name = 'produtos[][id]'
	input_produto_id.type = "text"
	input_produto_id.hidden = "true"
	input_produto_id.value = data.id
	aumenta_quantidade.className = 'item-carrinho-quantidade-aumenta'
	diminui_quantidade.className = 'item-carrinho-quantidade-diminui'
	aumenta_quantidade.type = 'button'
	diminui_quantidade.type = 'button'
	remover.innerText = 'Remover'
	aumenta_quantidade.innerText = '+'
	diminui_quantidade.innerText = '-'
	nome.innerText = data.nome
	preco.innerText = 'R$ '+data.preco
	total.innerText = 'R$ '+(input_quantidade.value * data.preco)

	icone_link.appendChild(icone_imagem)
	icone_container.appendChild(icone_link)
	informacoes.appendChild(nome)
	informacoes.appendChild(preco)
	quantidade.appendChild(diminui_quantidade)
	quantidade.appendChild(input_quantidade)
	quantidade.appendChild(aumenta_quantidade)
	controles.appendChild(remover)
	carrinho_item.appendChild(icone_container)
	carrinho_item.appendChild(informacoes)
	carrinho_item.appendChild(quantidade)
	carrinho_item.appendChild(controles)
	carrinho_item.appendChild(total)
	carrinho_item.appendChild(input_produto_id)

	return carrinho_item
}

function remove_lista_vazia(){
	var mensagem = document.getElementById('lista-vazia')
	if(mensagem != null && mensagem != undefined){
		mensagem.parentElement.removeChild(mensagem)
	}
}

function gera_itens_carrinho(itens){
	var itens_container = document.getElementById('carrinho-itens')
	var itens_total = document.getElementById('itens-total')
	var lista_carrinho = document.getElementById('lista-carrinho')
	if(itens_container != null && itens != undefined){
		if(itens != null && itens != undefined && typeof(itens) == 'object' && itens.length > 0){
			lista_carrinho.insertBefore(html_carrinho_header(),lista_carrinho.children[0])
			itens.forEach((item) => {
				remove_lista_vazia()
				if(document.getElementById('item-carrinho-controles-remover-'+item.id) == null){
					itens_container.appendChild(html_item_carrinho(item))
				}
			})
			itens_total.appendChild(html_total_compra())
			itens_total.appendChild(html_finalizar_compra())
		}
	}
	registra_eventos()
}

function consulta_produtos(){
	var itens_carrinho = JSON.parse(localStorage.getItem('carrinho'))
	var ajax = new XMLHttpRequest();
	ajax.onload = function(e){
		gera_itens_carrinho(JSON.parse(e.target.response))
	}
	ajax.open('POST','/consultar_produtos')
	ajax.setRequestHeader("Content-type", "application/json");
	ajax.setRequestHeader("X-CSRF-Token", document.getElementsByName('csrf-token')[0].content);
	ajax.send('{"data":'+JSON.stringify(itens_carrinho)+"}")
}

function registra_eventos(){
		var botoes_remover_carrinho = Array.from(document.getElementsByClassName('item-carrinho-controles-remover'))
		var itens_carrinho_quantidade_aumenta = Array.from(document.getElementsByClassName('item-carrinho-quantidade-aumenta'))
		var itens_carrinho_quantidade_diminui = Array.from(document.getElementsByClassName('item-carrinho-quantidade-diminui'))

		botoes_remover_carrinho.forEach((item) => {
			item.removeEventListener('click',function(e){ remove_item_carrinho(e); atualizar_total_carrinho(); })
		})

		botoes_remover_carrinho.forEach((item) => {
			item.addEventListener('click',function(e){ remove_item_carrinho(e); atualizar_total_carrinho(); })
		})

		itens_carrinho_quantidade_aumenta.forEach((item) => {
			item.removeEventListener('click',function(e){ aumenta_quantidade_item(e); atualiza_total_item(e); atualizar_total_carrinho(); })
		})

		itens_carrinho_quantidade_aumenta.forEach((item) => {
			item.addEventListener('click',function(e){ aumenta_quantidade_item(e); ; atualiza_total_item(e); atualizar_total_carrinho(); })
		})

		itens_carrinho_quantidade_diminui.forEach((item) => {
			item.removeEventListener('click',function(e){ diminui_quantidade_item(e); ; atualiza_total_item(e); atualizar_total_carrinho(); })
		})

		itens_carrinho_quantidade_diminui.forEach((item) => {
			item.addEventListener('click',function(e){ diminui_quantidade_item(e); ; atualiza_total_item(e); atualizar_total_carrinho(); })
		})

}

export {
	remove_item_carrinho,
	remove_lista_vazia,
	consulta_produtos,
	aumenta_quantidade_item,
	diminui_quantidade_item,
	atualiza_total_item
}