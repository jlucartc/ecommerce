class ApplicationController < ActionController::Base

	def tela_landing_page
		@produtos = Produto.all
	end

	def tela_buscar_produtos
	end

	def tela_carrinho
	end

	def tela_ver_produto
	end

	def consultar_produtos
		produto = JSON.parse(Produto.where(id: params[:data]).select(:id,:nome,:preco,:quantidade).to_json)
		produto.delete("created_at") if produto.present?
		produto.delete("updated_at") if produto.present?
		render json: produto
	end

end
