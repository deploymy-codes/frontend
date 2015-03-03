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
      expect(page.all('.m-add_project-project--name').map(&:text)).to eql ['api', 'frontend', 'native']
    end

    it 'displays user projects' do
      authenticate_user
      visit '/application/#/add-project'
      expect(page.all('.m-add_project-project').length).to eql 0
      page.all('.m-add_project-organization')[0].click
      expect(page).to have_selector('.m-add_project-project--name')
      expect(page.all('.m-add_project-project--name').map(&:text)).to eql ['awesome-test-project', 'lets-chat']
    end

    context 'when user click to import a project' do
      it 'imports the project' do
        authenticate_user
        visit '/application/#/add-project'
        page.all('.m-add_project-organization')[0].click
        expect(page).to have_selector('.m-add_project-project--name')
        within('.m-add_project-project:first-child') do
          find('a').click
        end
        expect(page).to have_selector('.m-user_feedback_message')
        expect(page.find('.m-user_feedback_message').text).to eql('Project awesome-test-project has been successfully imported.')
      end
    end
  end
end
