ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"
require 'simplecov'
require 'carrinho_helper'
SimpleCov.start

class ActiveSupport::TestCase
  include Devise::Test::IntegrationHelpers
  include CarrinhoHelper
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
