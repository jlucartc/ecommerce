class UsuarioController < ApplicationController
	before_action :authenticate_usuario!

	def tela_ver_produto_estoque
	end

	def tela_cadastrar_produto
	end

	def tela_editar_produto
	end

	def tela_pedidos_vendedor
		@pedidos = Pedido.where(vendedor_id: current_usuario)
	end

	def tela_pedidos_comprador
		@pedidos = Pedido.where(comprador_id: current_usuario)
	end

	def tela_estoque
	end

	def tela_confirmacao_pedido
	end

	def adicionar_produto_estoque
	end

	def remover_produto_estoque
	end

	def finalizar_compra
		produtos = finalizar_compra_produtos_parametros(params)
		
		if produtos.present?
			pedidos = produtos.map do |item|
				
				produto = Produto.find(item[:id])

				pedido = Pedido.new(
					produto_id: item[:id],
					comprador_id: current_usuario.id,
					quantidade: item[:quantidade]
				)

				if produto.present?
					pedido.nome = produto.nome
					pedido.preco = produto.preco
					pedido.vendedor_id = produto.usuario_id
				end

				pedido

			end
			
			pedidos.each do |pedido|
				if pedido.invalid?
					pedidos.each{|linha| linha.delete if linha.id? }
					break
				else
					pedido.save
				end
			end

			if pedidos.pluck(:id).exclude?(nil)
				flash[:success] = "A compra foi finalizada com sucesso!"
				redirect_to pedidos_comprador_path
			else
				flash[:danger] = 'Erro: a compra não pode ser efetuada.'
				redirect_to carrinho_path
			end		
		else
			flash[:danger] = 'Não há produtos no carrinho.'
			redirect_to carrinho_path
		end

	end

	private

		def finalizar_compra_produtos_parametros(params)
			params.permit(produtos: [:id,:quantidade]).to_h[:produtos]
		end

end
