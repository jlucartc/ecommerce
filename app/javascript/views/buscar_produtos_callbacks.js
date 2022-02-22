function ver_produto(evento){
	var produto_id = evento.target.parentElement.id.split('-').pop()
	window.location.assign('/produtos/ver/'+produto_id)
}

export {ver_produto}