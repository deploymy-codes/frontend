describe('AddProjectController', function() {
  var _              = require('underscore');
  var scope          = require('test_helpers/scope');
  var promise        = require('test_helpers/promise');
  var describedClass = require('deploy_my_codes/controllers/add_project_controller');
  var fakeOrganizationService, fakeProjectService, fakeScope, fakeUserService, subject;

  var USER_ORGANIZATIONS = [
    { name: 'organization1', avatar_url: 'http://fake.url/organization1' },
    { name: 'organization2', avatar_url: 'http://fake.url/organization2' },
    { name: 'organization3', avatar_url: 'http://fake.url/organization3' },
  ];

  var PROJECTS_ORGANIZATIONS = {
    organization1: [
      { name: 'organization1/project1', imported: false },
      { name: 'organization1/project2', imported: true },
      { name: 'organization1/project3', imported: false },
    ],
    organization2: [
      { name: 'organization2/project1', imported: false },
    ],
    organization3: []
  };

  var PROJECTS_USER = [
    { name: 'user/project1', imported: false },
    { name: 'user/project2', imported: false },
  ];

  beforeEach(function() {
    fakeScope               = scope();
    fakeOrganizationService = {};
    fakeProjectService      = {};
    fakeUserService         = {};
  });

  beforeEach(function() {
    fakeOrganizationService.getOrganizations = function() {
      var deferred = promise.defer();
      deferred.resolve(USER_ORGANIZATIONS);
      return deferred.promise;
    };

    fakeProjectService.getProjectsforOrganization = function(organization) {
      var deferred = promise.defer();
      deferred.resolve(PROJECTS_ORGANIZATIONS[organization.name]);
      return deferred.promise;
    };

    fakeProjectService.getProjectsforUser = function() {
      var deferred = promise.defer();
      deferred.resolve(PROJECTS_USER);
      return deferred.promise;
    };

    fakeUserService.get = function() {
      var deferred = promise.defer();
      deferred.resolve({ full_name: 'User', username: 'user', isLoggedIn: true });
      return deferred.promise;
    };
  });

  beforeEach(function() {
    subject = describedClass(fakeScope, fakeOrganizationService, fakeProjectService, fakeUserService);
  })

  describe('when controller is loaded', function() {
    it('loads the organization list', function() {
      expect(fakeScope.organizations).to.eql(USER_ORGANIZATIONS);
    });
  });

  describe('when context is selected', function() {
    it('selects the good user', function() {
      expect(3).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
      expect(undefined).to.be.eql(fakeScope.user.selected);

      fakeScope.selectUser();

      expect(3).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
      expect(true).to.be.eql(fakeScope.user.selected);
    });

    it('selects the good organization', function() {
      expect(3).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
      expect(undefined).to.be.eql(fakeScope.user.selected);

      fakeScope.selectOrganization(fakeScope.organizations[1]);

      expect(2).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
      expect(1).to.be.eql(_.select(fakeScope.organizations, function(organization) { return organization.selected; }).length);
      expect(false).to.be.eql(fakeScope.user.selected);

      expect(true).to.be.eql(fakeScope.organizations[1].selected);
    });

    it('loads the projects belonging at this user', function() {
      expect([]).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));

      fakeScope.selectUser();

      expect(['user/project1', 'user/project2']).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));
    });

    it('loads the projects belonging at this organization', function() {
      expect([]).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));

      fakeScope.selectOrganization(fakeScope.organizations[1]);

      expect(['organization2/project1']).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));
    });

    describe('and an other organization was already selected', function() {
      beforeEach(function() {
        fakeScope.selectOrganization(fakeScope.organizations[1]);
      });

      it('selects the good organization', function() {
        expect(2).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
        expect(1).to.be.eql(_.select(fakeScope.organizations, function(organization) { return organization.selected; }).length);
        expect(false).to.be.eql(fakeScope.user.selected);
        expect(true).to.be.eql(fakeScope.organizations[1].selected);

        fakeScope.selectOrganization(fakeScope.organizations[0]);

        expect(2).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
        expect(1).to.be.eql(_.select(fakeScope.organizations, function(organization) { return organization.selected; }).length);
        expect(false).to.be.eql(fakeScope.user.selected);
        expect(true).to.be.eql(fakeScope.organizations[0].selected);
      });

      it('selects the good user', function() {
        expect(2).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
        expect(1).to.be.eql(_.select(fakeScope.organizations, function(organization) { return organization.selected; }).length);
        expect(false).to.be.eql(fakeScope.user.selected);
        expect(true).to.be.eql(fakeScope.organizations[1].selected);

        fakeScope.selectUser();

        expect(3).to.be.eql(_.select(fakeScope.organizations, function(organization) { return !organization.selected; }).length);
        expect(true).to.be.eql(fakeScope.user.selected);
      });

      it('loads the projects belonging at this organization', function() {
        expect(['organization2/project1']).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));

        fakeScope.selectOrganization(fakeScope.organizations[0]);

        expect(['organization1/project1', 'organization1/project2', 'organization1/project3']).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));
      });

      it('loads the projects belonging at this user', function() {
        expect(['organization2/project1']).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));

        fakeScope.selectUser();

        expect(['user/project1', 'user/project2']).to.be.eql(_.map(fakeScope.projects, function(project) { return project.name }));
      });
    });
  });
});
