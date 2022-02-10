class Pedido < ApplicationRecord
	validates :produto_id, :produto_nome, :produto_preco, :quantidade, :comprador_id, :vendedor_id, presence: true
	validate :produto_possui_estoque

	def produto_possui_estoque
		
		if self.produto_id.present?
			produto = Produto.find(self.produto_id)
			if produto.present?
				errors.add(:estoque,'insuficiente') if produto.quantidade < self.quantidade
			else
				errors.add(:produto,'inexistente')
			end
		end
	end

end
