class ApplicationController < ActionController::Base

	def after_sign_in_path_for(resource)
		landing_page_path
	end

	def after_sign_out_path_for(resource)
		landing_page_path
	end

	def tela_landing_page
		@produtos = Produto.all
	end

	def tela_buscar_produtos
	end

	def tela_carrinho
	end

	def tela_ver_produto
		@icone = Imagem.where(produto_id: params[:id]).present? ? Imagem.where(produto_id: params[:id]).first : Imagem.new(path: 'dummy.png', produto_id: params[:id])
	end

	def consultar_produtos
		produto = JSON.parse(Produto.where(id: params[:data]).select(:id,:nome,:preco,:quantidade).to_json)
		produto.delete("created_at") if produto.present?
		produto.delete("updated_at") if produto.present?
		render json: produto
	end

end
