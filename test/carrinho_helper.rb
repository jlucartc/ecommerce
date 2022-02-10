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

  def adiciona_produto_inexistente_ao_carrinho
    visit landing_page_path
    novo_carrinho = carrinho << 0 
    evaluate_script("localStorage.setItem('carrinho',JSON.stringify(#{novo_carrinho.to_s}))")
    return "0"
  end

  def adiciona_produto_esgotado_ao_carrinho
    visit landing_page_path
    botao_adicionar = find_button(id: "botao-adicionar-carrinho-#{produtos(:esgotado).id}", match: :first)
    produto_id = recupera_id(botao_adicionar[:id])
    botao_adicionar.click
    produto_id
  end

  def finaliza_compra
    visit carrinho_path
    botao_finalizar_compra = find_button(class: 'botao-finalizar-compra', match: :first)
    botao_finalizar_compra.click
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