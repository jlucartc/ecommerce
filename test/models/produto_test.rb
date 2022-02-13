require "test_helper"

class ProdutoTest < ActiveSupport::TestCase
  test "deletar um produto não deve afetar os pedidos associados" do
    quantidade_pedidos_associados = Pedido.where(produto_id: produtos(:one)[:id]).count
    produtos(:one).delete
    assert quantidade_pedidos_associados == Pedido.where(produto_id: produtos(:one)[:id]).all.count
  end

  test "as imagens de um produto devem ser deletadas quando ele for deletado" do
    imagem_path = imagens(:one)[:path]
    File.open("app/assets/images/#{imagem_path}",'w')
    produtos(:one).destroy
    assert Imagem.where(produto_id: produtos(:one)[:id]).count == 0
    refute File.exist?(imagem_path)
  end

end
