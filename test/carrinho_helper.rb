module CarrinhoHelper
  def limpar_local_storage
    visit landing_page_path
    evaluate_script("localStorage.clear()")
    visit carrinho_path
    evaluate_script("localStorage.clear()")
  end

  def adiciona_produto_ao_carrinho
    visit landing_page_path
    botao_adicionar = find_button(class: 'botao-adicionar-carrinho', match: :first)
    produto_id = recupera_id(botao_adicionar[:id])
    botao_adicionar.click
    produto_id
  end

  def recupera_id(string)
    string.split('-').last
  end

  def carrinho
    carrinho = evaluate_script("JSON.parse(localStorage.getItem('carrinho'))")
    carrinho = [] if carrinho.nil?
    carrinho
  end
end