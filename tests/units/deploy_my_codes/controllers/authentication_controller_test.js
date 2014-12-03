describe('AuthenticationCtrl', function() {
  var promise        = require('test_helpers/promise');
  var describedClass = require('deploy_my_codes/controllers/authentication_controller');
  var authenticationSpy, dashboardSpy, fakeAuthenticationService, fakeScope, fakeState, logoutSpy, signInSpy, subject;

  beforeEach(function() {
    authenticationSpy = sinon.spy();
    dashboardSpy      = sinon.spy();
    fakeAuthenticationService = {};
    fakeScope = {};
    fakeState = {};
    logoutSpy = sinon.spy();
    signInSpy = sinon.spy();
    subject   = describedClass(fakeScope, fakeState, fakeAuthenticationService);
  });

  beforeEach(function() {
    fakeAuthenticationService.authenticate = function(provider) {
      var deferred = promise.defer();
      if (provider === 'github') {
        authenticationSpy();
        deferred.resolve({});
      } else {
        deferred.reject({});
      }

      return deferred.promise;
    };

    fakeAuthenticationService.logout = function(provider) {
      var deferred = promise.defer();
      logoutSpy();
      deferred.resolve({});
      return deferred.promise;
    };

    fakeState.go = function(state) {
      switch (state) {
        case 'dashboard':
          dashboardSpy();
          break;
        case 'sign_in':
          signInSpy();
          break;
      }
    };
  });

  describe('when action #authenticate is called', function() {
    it('redirects to the dashboard', function() {
      fakeScope.authenticate('github');
      sinon.assert.calledOnce(authenticationSpy);
      sinon.assert.calledOnce(dashboardSpy);
    });
  });

  describe('when action #authenticate is called', function() {
    it('redirects to the sign in', function() {
      fakeScope.logout();
      sinon.assert.calledOnce(logoutSpy);
      sinon.assert.calledOnce(signInSpy);
    });
  });
});
