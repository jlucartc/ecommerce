require "application_system_test_case"

class CarrinhoTest < ApplicationSystemTestCase

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
    binding.pry
    visit carrinho_path
    botao_finalizar_compra = find_button(class: 'botao-finalizar-compra', match: :first)
    botao_finalizar_compra.click
    assert false
  end

end
