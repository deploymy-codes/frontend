require 'ostruct'

module AuthenticationHelper
  def authenticate_user
    visit '/application/?code=XXXX#/authorize'
  end

  def sign_out_user
    visit '/'
    Capybara.evaluate_script('window.localStorage.clear()')
  end
end
