class CreatePedidos < ActiveRecord::Migration[7.0]
  def change
    create_table :pedidos do |t|
      t.integer :produto_id
      t.string :produto_nome
      t.float :produto_preco
      t.integer :pedido_id
      t.integer :quantidade
      t.integer :comprador_id
      t.integer :vendedor_id
      t.timestamps
    end
  end
end
