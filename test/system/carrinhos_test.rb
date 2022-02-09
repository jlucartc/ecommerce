require "application_system_test_case"

class CarrinhosTest < ApplicationSystemTestCase

  def limpar_local_storage
    visit landing_page_path
    evaluate_script("localStorage.clear()")
    visit carrinho_path
    evaluate_script("localStorage.clear()")
  end

  setup do
    limpar_local_storage
  end

  teardown do
    limpar_local_storage
  end

  test "adiciona produto ao carrinho" do
    visit landing_page_path
    carrinho_inicial = evaluate_script("JSON.parse(localStorage.getItem('carrinho'))")
    botao = find_button(class: 'botao-adicionar-carrinho', match: :first)
    botao.click
    contem_id_produto = evaluate_script("JSON.parse(localStorage.getItem('carrinho')).includes(String(#{botao[:id].split('-').last}))")
    assert_nil carrinho_inicial
    assert contem_id_produto
  end

  test "remove produto do carrinho" do
    visit landing_page_path
    carrinho_inicial = evaluate_script("JSON.parse(localStorage.getItem('carrinho'))")
    botao_adicionar = find_button(class: 'botao-adicionar-carrinho', match: :first)
    botao_adicionar.click
    contem_id_produto = evaluate_script("JSON.parse(localStorage.getItem('carrinho')).includes(String(#{botao_adicionar[:id].split('-').last}))")
    botao_adicionar_id = botao_adicionar[:id].split('-').last
    visit carrinho_path
    botao_remover = find_button(class: 'botao-remover-carrinho', match: :first)
    botao_remover.click
    ainda_contem_id_produto = evaluate_script("JSON.parse(localStorage.getItem('carrinho')).includes(String(#{botao_adicionar_id}))")
    assert_nil carrinho_inicial
    assert contem_id_produto
    refute ainda_contem_id_produto
  end
end
