require_relative '../spec_helper'

describe 'Dashboard access' do
  context 'when user is authenticated' do
    it 'displays the dashboard' do
      authenticate_user
      visit '/application/#/dashboard'
      expect(page).to have_path '/application/#/dashboard'
    end
  end

  context 'when user is not authenticated' do
    it 'redirects to the sign in page' do
      visit '/application/#/dashboard'
      expect(page).to have_path '/application/#/sign_in'
    end
  end
end
