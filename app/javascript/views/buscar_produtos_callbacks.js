function apresentar_grade(evento){
	var lista = document.getElementById('lista-produtos')
	console.log(lista.id)
	lista.id = 'grade-produtos';
}

function apresentar_lista(evento){
	var grade = document.getElementById('grade-produtos')
	console.log(grade.id)
	grade.id = 'lista-produtos'
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