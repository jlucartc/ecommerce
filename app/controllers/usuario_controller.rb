class UsuarioController < ApplicationController
	before_action :authenticate_usuario!

	def tela_ver_produto_estoque
	end

	def tela_cadastrar_produto
	end

	def confirmar_edicao_produto
		produto = Produto.where(id: params[:produto_id], usuario_id: current_usuario.id).first
		
		if produto.present?
			produto.nome = params[:nome] if params[:nome].present?
			produto.preco = params[:preco] if params[:preco].present?

			if produto.save
				flash[:success] = "Produto '#{produto.nome}' atualizado com sucesso!"
			else
				flash[:danger] = "Produto '#{produto.nome}' não pode ser atualizado."
			end
		else
			flash[:danger] = "Produto não foi encontrado"
		end

		redirect_to estoque_path
	end

	def tela_editar_produto
		@produto = Produto.where(id: params[:id], usuario_id: current_usuario.id ).first

		if !@produto.present?
			flash[:danger] = "Produto não encontrado"
			redirect_to estoque_path
		end
	end

	def excluir_produto
		produto = Produto.where(id: params[:produto_id], usuario_id: current_usuario.id).first
		if produto.present?
			if produto.destroy
				flash[:success] = "Produto '#{produto.nome}' excluído com sucesso!"
			else
				flash[:danger] = "Produto '#{produto.nome}' não pode ser excluído."
			end
		else
			flash[:danger] = "Produto '#{produto.nome}' não foi encontrado."
		end
		redirect_to estoque_path
	end

	def minhas_vendas
		@pedidos = Pedido.where(vendedor_id: current_usuario).order(created_at: :desc)
	end

	def minhas_compras
		@pedidos = Pedido.where(comprador_id: current_usuario).order(created_at: :desc)
	end

	def tela_estoque
		@produtos = Produto.where(usuario_id: current_usuario.id)
	end

	def tela_confirmacao_pedido
	end

	def cadastrar_produto
		produto = cadastrar_produto_parametros(params)
		produto = new_produto_from_params(produto)
		if produto.save
			flash[:success] = "Produto criado com sucesso"
			redirect_to estoque_path
		else
			flash[:danger] = "Erro na criação do produto"
			redirect_to novo_produto_path
		end
	end

	def remover_produto_estoque
	end

	def finalizar_compra
		produtos = finalizar_compra_produtos_parametros(params)
		
		if produtos.present?
			pedidos = produtos.map do |item|
				produto = Produto.find(item[:id])
				pedido = new_pedido_from_params(item)

				if produto.present?
					pedido.nome = produto.nome
					pedido.preco = produto.preco
					pedido.vendedor_id = produto.usuario_id
				end

				pedido
			end
			
			checa_validade_pedidos(pedidos)

			if pedidos.pluck(:id).exclude?(nil)
				flash[:success] = "A compra foi finalizada com sucesso!"
				redirect_to minhas_compras_path
			else
				flash[:danger] = 'Erro: a compra não pode ser efetuada.'
				redirect_to carrinho_path
			end		
		else
			flash[:danger] = 'Não há produtos no carrinho.'
			redirect_to carrinho_path
		end

	end

	def aumentar_estoque
		produto = Produto.find(params[:data][:produto])
		produto.update(quantidade: produto.quantidade + params[:data][:quantidade])
	end

	private

		def new_produto_from_params(params)
			Produto.new(
				nome: params[:nome],
				preco: params[:preco],
				quantidade: params[:quantidade],
				imagens: params[:imagens],
				usuario_id: current_usuario.id)
		end

		def new_pedido_from_params(params)
			Pedido.new(
				produto_id: params[:id],
				comprador_id: current_usuario.id,
				quantidade: params[:quantidade]
			)
		end

		def checa_validade_pedidos(pedidos)
			pedidos.each do |pedido|
				if pedido.invalid?
					pedidos.each{|linha| linha.delete if linha.id? }
					break
				else
					pedido.save
				end
			end
		end

		def finalizar_compra_produtos_parametros(params)
			params.permit(produtos: [:id,:quantidade]).to_h[:produtos]
		end

		def cadastrar_produto_parametros(params)
			params.permit(:nome,:quantidade,:preco,imagens: []).to_h
		end

end
