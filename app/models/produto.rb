class Produto < ApplicationRecord
	validates :nome, :preco, :quantidade, :usuario_id, presence: true
	after_destroy :exclui_imagens
	after_create :salva_imagens

	attr_accessor :imagens

	def exclui_imagens
		Imagem.where(produto_id: self.id).destroy_all
	end

	def salva_imagens
		if self.imagens.present?
			self.imagens = self.imagens.map{|imagem| Imagem.new(produto_id: self.id, path: "#{SecureRandom.hex(20)}.#{imagem.content_type.split('/').last}", tempfile: imagem.tempfile)}
			self.imagens.each{|imagem| imagem.save }
		end
	end

	def has_imagem?
		Imagem.where(produto_id: self.id).present?
	end

end
