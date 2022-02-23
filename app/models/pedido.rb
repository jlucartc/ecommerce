class Pedido < ApplicationRecord
	validates :produto_id, :nome, :preco, :quantidade, :comprador_id, :vendedor_id, presence: true
	validate :produto_possui_estoque
	after_create :subtrai_quantidade_de_produto

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

	def subtrai_quantidade_de_produto
		if self.produto_id.present?
			produto = Produto.find(self.produto_id)
			if produto.present?
				produto.update(quantidade: produto.quantidade - self.quantidade)
			end
		end
	end

	def icone_path
		if Produto.where(id: self.produto_id).present?
			Produto.find(self.produto_id).icone_path
		else
			'dummy'
		end
	end

end
