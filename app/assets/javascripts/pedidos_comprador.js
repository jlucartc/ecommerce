
var limpa_carrinho = function(){

	var mensagem_sucesso = document.getElementById('success')

	if(mensagem_sucesso != null && mensagem_sucesso != undefined){
		localStorage.removeItem('carrinho')
	}
}

document.onreadystatechange = function(){

	if(document.readyState === 'complete'){

		limpa_carrinho()

	}

}