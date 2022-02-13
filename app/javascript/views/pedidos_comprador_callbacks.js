function limpa_carrinho(){

	var mensagem_sucesso = document.getElementById('success')

	if(mensagem_sucesso != null && mensagem_sucesso != undefined){
		localStorage.removeItem('carrinho')
	}
}

export { limpa_carrinho }
