var limpa_carrinho = function(){

	var mensagem_sucesso = document.getElementById('success')

	if(mensagem_sucesso != null && mensagem_sucesso != undefined){
		localStorage.removeItem('carrinho')
	}
}

document.addEventListener('turbo:load',function(){

		limpa_carrinho()

})