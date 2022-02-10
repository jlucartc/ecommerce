require "test_helper"

class ProdutoTest < ActiveSupport::TestCase
  test "deletar um produto não deve afetar os pedidos associados" do
    quantidade_pedidos_associados = Pedido.where(produto_id: produtos(:one)[:id]).count
    produtos(:one).delete
    assert quantidade_pedidos_associados == Pedido.where(produto_id: produtos(:one)[:id]).all.count
  end
end
