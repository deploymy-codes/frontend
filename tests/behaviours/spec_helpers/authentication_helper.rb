require 'ostruct'

module AuthenticationHelper
  def authenticate_user
    visit '/application/#/sign_in'

    [
      OpenStruct.new(key: 'deploy_my_codes_current_user', value: '{ "api_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDU3NTdlZjVmYzgyYzBiMDA4ZjI4ODUiLCJpYXQiOjE0MTUwMTAyODcsImV4cCI6MTQxNjIxOTg4N30.XGpRHLFYbDae8IZfQq6sek39LbE0F3n7NshOD-QYpko","isLoggedIn":true,"name":"John Doe"}')
    ].each do |entry|
      javascript_script = "window.localStorage['#{entry.key}'] = JSON.stringify(#{entry.value})"
      Capybara.evaluate_script(javascript_script)
    end
  end

  def sign_out_user
    visit '/'
    Capybara.evaluate_script('window.localStorage.clear()')
  end
end
