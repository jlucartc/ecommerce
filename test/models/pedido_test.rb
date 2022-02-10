require "test_helper"

class PedidoTest < ActiveSupport::TestCase
  test "deve subtrair a quantidade do pedido da quantidade do produto" do
    quantidade_produto = produtos(:one)[:quantidade]
    novo_pedido = Pedido.create(produto_id: produtos(:one)[:id], nome: produtos(:one)[:nome], preco: produtos(:one)[:preco], quantidade: 3, comprador_id: usuarios(:one)[:id], vendedor_id: usuarios(:vendedor)[:id])
    produtos(:one).reload
    assert quantidade_produto - novo_pedido.quantidade == produtos(:one).quantidade
  end
end
