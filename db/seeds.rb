# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


usuario = Usuario.create([
	{email: 'vendedor@gmail.com', password: '123456', password_confirmation: '123456'},
	{email: 'comprador@gmail.com', password: '123456', password_confirmation: '123456'}
])
produtos = Produto.create([
	{nome: 'Televisao', preco: 1000.00, quantidade: 5, usuario_id: 1},
	{nome: 'Mesa', preco: 200.00, quantidade: 2, usuario_id: 1},
	{nome: 'Headset', preco: 95.00, quantidade: 0, usuario_id: 1}
])