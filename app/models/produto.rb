class Produto < ApplicationRecord
	after_destroy :exclui_imagens

	def exclui_imagens
		Imagem.where(produto_id: self.id).destroy_all
	end
end
