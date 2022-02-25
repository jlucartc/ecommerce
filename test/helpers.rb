module CarrinhoHelper
  def limpar_local_storage
    visit landing_page_path
    evaluate_script("localStorage.clear()")
    visit carrinho_path
    evaluate_script("localStorage.clear()")
  end

  def adiciona_produto_ao_carrinho
    visit landing_page_path
    produto = find_all(class: 'oferta-produto').first
    produto.click
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
    link = page.find(:css,".oferta-produto > .oferta-produto-link[href='#{ver_produto_path(produtos(:esgotado).id)}']",visible: false).ancestor(:css,'.oferta-produto')
    link.click
    botao_adicionar = find_button(id: "botao-adicionar-carrinho-#{produtos(:esgotado).id}", match: :first)
    produto_id = recupera_id(botao_adicionar[:id])
    botao_adicionar.click
    produto_id
  end

  def finaliza_compra
    visit carrinho_path
    botao_finalizar_compra = find_button(id: 'finalizar-compra', match: :first)
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

  def cria_arquivo_de_imagem_teste
    imagem = File.open("app/assets/images/produtos/imagem_teste.png",'w')
    imagem.write(File.open("app/assets/images/dummy.png",'r').read)
  end

  def apaga_arquivo_de_imagem_teste
    File.delete("app/assets/images/produtos/imagem_teste.png") if File.exist?("app/assets/images/produtos/imagem_teste.png")
  end

  def desabilita_autenticacao_csrf
    ActionController::Base.allow_forgery_protection = false
  end

  def habilita_autenticacao_csrf
    ActionController::Base.allow_forgery_protection = true
  end

end