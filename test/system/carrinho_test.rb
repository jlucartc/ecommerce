require "application_system_test_case"

class CarrinhoTest < ApplicationSystemTestCase

  setup do
    cria_arquivo_de_imagem_teste
    limpar_local_storage
  end

  teardown do
    apaga_arquivo_de_imagem_teste
    limpar_local_storage
  end

  test "adiciona produto ao carrinho" do
    produto_id = adiciona_produto_ao_carrinho
    contem_id_produto = evaluate_script("JSON.parse(localStorage.getItem('carrinho')).includes(String(#{produto_id}))")
    assert contem_id_produto
  end

  test "remove produto do carrinho" do
    produto_id = adiciona_produto_ao_carrinho
    carrinho_inicio = carrinho
    visit carrinho_path
    botao_remover = find_button(class: 'item-carrinho-controles-remover', match: :first)
    botao_remover.click
    carrinho_fim = carrinho
    assert carrinho_inicio.include?(produto_id)
    refute carrinho_fim.include?(produto_id)
  end

  test "deve finalizar compra apenas para usuarios logados" do
    adiciona_produto_ao_carrinho
    finaliza_compra
    assert page.current_path == new_usuario_session_path
  end

  test "deve finalizar compra apenas se todos os produtos existirem" do
    sign_in usuarios(:one)
    adiciona_produto_inexistente_ao_carrinho
    assert_raises(Capybara::ElementNotFound){ finaliza_compra }
  end

  test "deve finalizar compra apenas se houver quantidade suficiente no estoque para todos os produtos" do
    sign_in usuarios(:one)
    adiciona_produto_esgotado_ao_carrinho
    assert_raises(Capybara::ElementNotFound){ finaliza_compra }
  end

  test "o comprador deve ser capaz de visualizar o pedido após a finalização da compra" do
    sign_in usuarios(:two)
    produto_id = adiciona_produto_ao_carrinho
    finaliza_compra
    visit minhas_compras_path
    assert_selector "p", class: "pedido-nome",text: Produto.find(produto_id).nome
  end

  test "o usuario deve ser redirecionado para a pagina de pedidos ao finalizar sua compra" do
    sign_in usuarios(:two)
    adiciona_produto_ao_carrinho
    finaliza_compra
    assert page.current_path == minhas_compras_path
  end

  test "o carrinho só deve mostrar produtos que estão presentes no estoque" do
    sign_in usuarios(:two)
    adiciona_produto_esgotado_ao_carrinho
    visit carrinho_path
    assert_raises(Capybara::ElementNotFound){ page.find(:css,"#carrinho-item-#{produtos(:esgotado).id}") }
  end

end
