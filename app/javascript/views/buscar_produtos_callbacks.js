function apresentar_grade(evento){
	var lista = document.getElementById('lista-produtos')
	if(lista != null && lista != undefined){
		lista.id = 'grade-produtos';
	}
}

function apresentar_lista(evento){
	var grade = document.getElementById('grade-produtos')
	if(grade != null && grade != undefined){
		grade.id = 'lista-produtos'
	}
}

function ver_produto(evento){
	var produto_id = evento.target.parentElement.id.split('-').pop()
	window.location.assign('/produtos/ver/'+produto_id)
}

export {
	ver_produto,
	apresentar_lista,
	apresentar_grade
}