describe('AuthenticationService', function() {
  var promise        = require('test_helpers/promise');
  var scope          = require('test_helpers/scope');
  var describedClass = require('deploy_my_codes/services/authentication_service');

  var broadcastSpy, fakeAuth, fakeScope, fakeUserService, subject, userSpy;

  beforeEach(function() {
    fakeAuth        = { save: function() {} };
    fakeScope       = scope();
    fakeUserService = { register: function() {}, user: function() {}, remove: function() {} };
    userSpy         = sinon.spy();
    subject         = describedClass(promise, fakeScope, fakeAuth, fakeUserService);
  });

  beforeEach(function() {
    fakeAuth.save = function(code) {
      var deferred = promise.defer();
      deferred.resolve({ api_key: 'XXXX-XXXX-XXXX-XXXX', name: 'John Doe' });

      return deferred.promise;
    };

    fakeUserService.register = function(data) {
      var deferred = promise.defer();
      userSpy();
      deferred.resolve(data);
      return deferred.promise;
    };

    fakeUserService.remove = function() {
      var deferred = promise.defer();
      deferred.resolve();
      return deferred.promise;
    };
  });

  beforeEach(function() {
    broadcastSpy = sinon.spy(fakeScope, '$broadcast');
  });

  describe('when method #authenticate is called', function() {
    it('returns the auth response', function() {
      subject.authenticate('1337-42').then(function(response) {
        expect(response).to.eql({ api_key: 'XXXX-XXXX-XXXX-XXXX', name: 'John Doe' });
      });
    });

    it('registers the user as current user', function() {
      subject.authenticate('1337-42').then(function(response) { });
      expect(userSpy).to.have.been.called;
    });

    it('broadcasts a successfullyLogin event', function() {
      subject.authenticate('1337-42').then(function(response) { });
      expect(broadcastSpy).to.have.been.calledWith('successfullyLogin');
    });
  });

  describe('when method #logout is called', function() {
    it('broadcasts a successfullyLogout event', function() {
      subject.logout().then(function() { });
      expect(broadcastSpy).to.have.been.calledWith('successfullyLogout');
    });
  });
});
