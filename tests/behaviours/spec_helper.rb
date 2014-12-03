require 'rspec'
require 'capybara/poltergeist'
require 'capybara/rspec'
require 'pry'
require 'vcr'

Dir['./tests/behaviours/spec_helpers/**/*.rb'].each(&method(:require))

Capybara.app = Rack::Builder.new do
  run Proc.new { |environment|
    base_path  = './build'
    request    = Rack::Request.new(environment)
    index_file = File.join(base_path, request.path_info, 'index.html')
    request.path_info += 'index.html' if File.exists?(index_file)

    Rack::Directory.new(base_path).call(environment)
  }
end

RSpec.configure do |config|
  config.mock_with :rspec
  config.include Capybara::DSL
  config.include AuthenticationHelper
  config.before(:each) { sign_out_user }
end

VCR.configure do |config|
  config.cassette_library_dir     = './tests/behaviours/cassettes'
  config.default_cassette_options = { record: :new_episodes }
end

Capybara.default_driver = :poltergeist
