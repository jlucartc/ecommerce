require "application_system_test_case"

class CarrinhoTest < ApplicationSystemTestCase

  setup do
    limpar_local_storage
  end

  teardown do
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
    finaliza_compra
    assert page.current_path == carrinho_path
  end

end
