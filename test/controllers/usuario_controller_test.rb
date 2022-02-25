require "test_helper"

class UsuarioControllerTest < ActionDispatch::IntegrationTest

  setup do
    cria_arquivo_de_imagem_teste
    desabilita_autenticacao_csrf
  end

  teardown do
    apaga_arquivo_de_imagem_teste
    habilita_autenticacao_csrf
  end

  test "deve modificar nome do produto" do
    sign_in(usuarios(:vendedor))
    nome = "Novo nome produto"
    produto = produtos(:one)
    post confirmar_edicao_produto_path params: {nome: nome, produto_id: produto.id}
    assert Produto.find(produtos(:one).id).nome == nome
  end

  test "deve modificar preco do produto" do
    sign_in(usuarios(:vendedor))
    preco = 100.55
    produto = produtos(:one)
    post confirmar_edicao_produto_path params: {preco: preco, produto_id: produto.id}
    assert Produto.find(produtos(:one).id).preco == preco
  end

  test "não deve modificar preco se não houver um usuario logado" do
    preco = 100.55
    produto = produtos(:one)
    post confirmar_edicao_produto_path params: {preco: preco, produto_id: produto.id}
    assert_redirected_to new_usuario_session_path
  end

end