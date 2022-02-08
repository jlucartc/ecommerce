class CreatePedidoItens < ActiveRecord::Migration[7.0]
  def change
    create_table :pedido_itens do |t|

      t.timestamps
    end
  end
end
