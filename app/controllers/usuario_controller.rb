class UsuarioController < ApplicationController
	before_action :authenticate_usuario!

	def tela_ver_produto_estoque
	end

	def tela_cadastrar_produto
	end

	def tela_editar_produto
	end

	def tela_pedidos_vendedor
	end

	def tela_pedidos_comprador
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

				{
					produto_id: item[:id],
					produto_nome: produto.present? ? produto.nome : nil,
					produto_preco: produto.present? ? produto.preco : nil,
					quantidade: item[:quantidade],
					comprador_id: current_usuario.id,
					vendedor_id: produto.present? ? produto.usuario_id : nil
				}

			end
			
			if Pedido.insert_all(pedidos)
				flash[:success] = "A compra foi finalizada com sucesso!"
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
