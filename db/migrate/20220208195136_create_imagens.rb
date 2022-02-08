class CreateImagens < ActiveRecord::Migration[7.0]
  def change
    create_table :imagens do |t|
      t.integer :produto_id
      t.string :path
      t.timestamps
    end
  end
end
