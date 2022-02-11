class Imagem < ApplicationRecord
	validates :path, :produto_id, presence: true
	before_create :check_unique_path
	after_create :save_file
	after_destroy :deleta_imagem

	attr_accessor :tempfile

	def deleta_imagem
		File.delete("./#{self.path}")
	end

	def check_unique_path
		while File.exist?("app/assets/images/produtos/#{self.path}")
			self.path = "#{SecureRandom.hex(20)}.#{self.path.split('.').last}"
		end
	end

	def save_file
		imagem = File.open("app/assets/images/produtos/#{self.path}",'wb')
		imagem.write(File.open(self.tempfile,'r').read)
		imagem.close
	end

end
