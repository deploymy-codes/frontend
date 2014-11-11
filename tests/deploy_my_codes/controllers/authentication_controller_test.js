describe('AuthenticationCtrl', function() {
  beforeEach(module('DeployMyCodes'));

  var authenticationSpy, dashboardSpy, FakeAuthenticationService, FakeState, logoutSpy, scope, signInSpy;

  beforeEach(module(function($provide) {
    FakeAuthenticationService = {};
    FakeState                 = {};
    authenticationSpy         = sinon.spy();
    dashboardSpy              = sinon.spy();
    logoutSpy                 = sinon.spy();
    signInSpy                 = sinon.spy();
    $provide.value('AuthenticationService', FakeAuthenticationService);
  }));

  beforeEach(inject(function($q) {
    FakeAuthenticationService.authenticate = function(provider) {
      var deferred = $q.defer();
      if (provider === 'github') {
        authenticationSpy();
        deferred.resolve({});
      } else {
        deferred.reject({});
      }

      return deferred.promise;
    };

    FakeAuthenticationService.logout = function(provider) {
      var deferred = $q.defer();
      logoutSpy();
      deferred.resolve({});
      return deferred.promise;
    };

    FakeState.go = function(state) {
      switch (state) {
        case 'dashboard':
          dashboardSpy();
          break;
        case 'sign_in':
          signInSpy();
          break;
      }
    };
  }));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('AuthenticationCtrl', { $scope: scope, $state: FakeState, AuthenticationService: FakeAuthenticationService });
    scope.$digest();
  }));

  describe('when action #authenticate is called', function() {
    it('redirects to the dashboard', function() {
      scope.authenticate('github');
      scope.$digest();
      sinon.assert.calledOnce(authenticationSpy);
      sinon.assert.calledOnce(dashboardSpy);
    });
  });

  describe('when action #authenticate is called', function() {
    it('redirects to the sign in', function() {
      scope.logout();
      scope.$digest();
      sinon.assert.calledOnce(logoutSpy);
      sinon.assert.calledOnce(signInSpy);
    });
  });
});
