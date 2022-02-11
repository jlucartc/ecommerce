class Imagem < ApplicationRecord
	validates :path, :produto_id, presence: true
	after_destroy :deleta_imagem

	def deleta_imagem
		#binding.pry
		File.delete("./#{self.path}")
	end

end
