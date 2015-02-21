require_relative '../spec_helper'

describe 'Add project' do
  context 'when user is not authenticated' do
    it 'redirects to the sign in page' do
      visit '/application/#/add-project'
      page.find('.m-landing')
      expect(page).to have_path '/'
    end
  end

  context 'when user is authenticated' do
    it 'displays all the contexts' do
      authenticate_user
      visit '/application/#/add-project'
      expect(page.all('.m-add_project-organization h3').map(&:text)).to eql ['deploymycodes', 'deploymy-codes']
    end

    it 'displays organization projects' do
      authenticate_user
      visit '/application/#/add-project'
      expect(page.all('.m-add_project-project').length).to eql 0
      page.all('.m-add_project-organization')[1].click
      expect(page).to have_selector('.m-add_project-project--name')
      expect(page.all('.m-add_project-project--name').map(&:text)).to eql ['deploymy-codes/api', 'deploymy-codes/frontend', 'deploymy-codes/native']
    end

    it 'displays user projects' do
      authenticate_user
      visit '/application/#/add-project'
      expect(page.all('.m-add_project-project').length).to eql 0
      page.all('.m-add_project-organization')[0].click
      expect(page).to have_selector('.m-add_project-project--name')
      expect(page.all('.m-add_project-project--name').map(&:text)).to eql ['deploymycodes/awesome-test-project', 'deploymycodes/lets-chat']
    end
  end
end
