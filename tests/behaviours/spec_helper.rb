require 'billy/rspec'
require 'rspec'
require 'capybara/poltergeist'
require 'capybara/rspec'
require 'pry'

Dir['./tests/behaviours/spec_helpers/**/*.rb'].each(&method(:require))

Capybara.server_port = 59533
Capybara.app = Rack::Builder.new do
  run Proc.new { |environment|
    base_path  = './build'
    request    = Rack::Request.new(environment)
    index_file = File.join(base_path, request.path_info, 'index.html')
    request.path_info += 'index.html' if File.exists?(index_file)

    Rack::Directory.new(base_path).call(environment)
  }
end

Billy.configure do |config|
  config.logger     = nil
  config.cache      = true
  config.ignore_cache_port = true
  config.ignore_params = [
    'http://fonts.googleapis.com/css?family=Source+Sans+Pro%7COpen+Sans:300italic,400italic,600italic,700italic,400,600,700,300%7CInconsolata',
    'https//avatars.githubusercontent.com:443/u/822839?v=3'
  ]
  config.persist_cache = true
  config.cache_path = 'tests/behaviours/cassettes/'
end

RSpec.configure do |config|
  config.mock_with :rspec
  config.include Capybara::DSL
  config.include AuthenticationHelper

  config.before(:each) { sign_out_user }
end

Capybara.default_driver = :poltergeist_billy
