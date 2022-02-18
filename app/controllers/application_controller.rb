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
		@imagens = Imagem.where(produto_id: params[:id])
	end

	def consultar_produtos
		produtos = JSON.parse(Produto.where('quantidade > 0 and id in (?)',params[:data]).select(:id,:nome,:preco,:quantidade).to_json)
		produtos.delete("created_at") if produtos.present?
		produtos.delete("updated_at") if produtos.present?
		produtos = produtos.map do |produto|
			produto.as_json.merge({"icone_path" => Imagem.where(produto_id: produto["id"]).present? ? Imagem.where(produto_id: produto["id"]).first.full_path : ActionController::Base.helpers.asset_path('dummy')})
		end
		render json: produtos
	end

end
