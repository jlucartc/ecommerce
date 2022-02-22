Rails.application.routes.draw do
  devise_for :usuarios
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/", to: "application#tela_landing_page", as: "landing_page"
  get "/buscar_produtos", to: "application#buscar_produtos", as: "buscar_produtos"
  get "/carrinho", to: "application#tela_carrinho", as: "carrinho"
  get "/produtos/ver/:id", to: "application#tela_ver_produto", as: "ver_produto"
  get "/estoque/produtos/:id", to: "usuario#tela_ver_produto_estoque", as: "ver_produto_estoque"
  get "/produtos/novo", to: "usuario#tela_cadastrar_produto", as: "novo_produto"
  get "/produtos/editar/:id", to: "usuario#tela_editar_produto", as: "editar_produto"
  get "/minhas-vendas", to: "usuario#minhas_vendas", as: "minhas_vendas"
  get "/minhas-compras", to: "usuario#minhas_compras", as: "minhas_compras"
  get "/estoque", to: "usuario#tela_estoque", as: "estoque"
  get "/confirmacao_pedido", to: "usuario#tela_confirmacao_pedido", as: "confirmacao_pedido"
  post "/aumentar_estoque", to: "usuario#aumentar_estoque", as: "aumentar_estoque"
  post "/produtos/novo/confirmar", to: "usuario#cadastrar_produto", as: "cadastrar_produto"
  post "/remover_produto", to: "usuario#remover_produto_estoque", as: "remover_produto"
  post "/finalizar_compra", to: "usuario#finalizar_compra", as: "finalizar_compra"
  post "/consultar_produtos", to: "application#consultar_produtos", as: "consultar_produtos"
  root "application#tela_landing_page"
end
