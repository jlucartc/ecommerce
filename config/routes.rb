Rails.application.routes.draw do
  devise_for :usuarios
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "application#tela_landing_page"
  get "/landing_page", to: "application#tela_landing_page", as: "landing_page"
  get "/buscar_produtos", to: "application#tela_buscar_produtos", as: "buscar_produto"
  get "/carrinho", to: "application#tela_carrinho", as: "carrinho"
  get "/produtos/ver/:id", to: "application#tela_ver_produto", as: "ver_produto"
  get "/estoque/produtos/:id", to: "usuario#tela_ver_produto_estoque", as: "ver_produto_estoque"
  get "/produtos/novo", to: "usuario#tela_cadastrar_produto", as: "cadastrar_produto"
  get "/produtos/editar/:id", to: "usuario#tela_editar_produto", as: "editar_produto"
  get "/vendedor/pedidos", to: "usuario#tela_pedidos_vendedor", as: "pedidos_vendedor"
  get "/comprador/pedidos", to: "usuario#tela_pedidos_comprador", as: "pedidos_comprador"
  get "/estoque", to: "usuario#tela_estoque", as: "estoque"
  get "/confirmacao_pedido", to: "usuario#tela_confirmacao_pedido", as: "confirmacao_pedido"
  post "/produtos/novo/confirmar", to: "usuario#adicionar_produto_estoque", as: "confirmar_cadastro_produto"
  post "/remover_produto", to: "usuario#remover_produto_estoque", as: "remover_produto"
  post "/finalizar_compra", to: "usuario#finalizar_compra", as: "finalizar_compra"
  post "/consultar_produtos", to: "application#consultar_produtos", as: "consultar_produtos"
end
