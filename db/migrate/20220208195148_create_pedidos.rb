class CreatePedidos < ActiveRecord::Migration[7.0]
  def change
    create_table :pedidos do |t|
      t.integer :usuario_id
      t.timestamps
    end
  end
end
