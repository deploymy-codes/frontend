require_relative '../spec_helper'

describe 'Remote projects' do
  context 'when user is not authenticated' do
    it 'redirects to the sign in page' do
      visit '/application/#/remote-projects'
      page.find('.m-landing')
      expect(page).to have_path '/'
    end
  end

  context 'when user is authenticated' do
    it 'displays all the remote projects' do
      authenticate_user
      visit '/application/#/remote-projects'
      expect(page.all('.m-remote-project span').map(&:text)).to eql ['rails', 'activeform', 'turbolinks']
    end
  end
end
