require "application_system_test_case"

class EstoquesTest < ApplicationSystemTestCase

  setup do
    cria_arquivo_de_imagem_teste
    limpar_local_storage
  end

  teardown do
    apaga_arquivo_de_imagem_teste
    limpar_local_storage
  end

  test "garante que ao clicar em excluir o produto é excluído do banco" do
    sign_in usuarios(:vendedor)
    visit estoque_path
    item_produto = page.find('.produto',match: :first)
    produto_id = item_produto[:id].split('-').last
    botao_excluir = item_produto.find('.produto-estoque-excluir',match: :first)
    botao_excluir.click
    botao_confirmar = page.find('.excluir-produto-confirmar',match: :first)
    botao_confirmar.click
    visit estoque_path
    assert Produto.where(id: produto_id).empty?
  end
end
