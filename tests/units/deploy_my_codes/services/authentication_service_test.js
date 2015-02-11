describe('AuthenticationService', function() {
  var promise        = require('test_helpers/promise');
  var scope          = require('test_helpers/scope');
  var describedClass = require('deploy_my_codes/services/authentication_service');

  var broadcastSpy, fakeAuth, fakeScope, fakeUserService, subject, userSpy;

  beforeEach(function() {
    fakeAuth        = { getToken: function() {} };
    fakeScope       = scope();
    fakeUserService = { register: function() {}, user: function() {} };
    userSpy         = sinon.spy();
    subject         = describedClass(fakeAuth, promise, fakeScope, fakeUserService);
  });

  beforeEach(function() {
    fakeAuth.authenticate = function(provider) {
      var deferred = promise.defer();
      deferred.resolve({ data: { api_key: 'XXXX-XXXX-XXXX-XXXX', name: 'John Doe' }});

      return deferred.promise;
    };

    fakeAuth.logout = function() {
      var deferred = promise.defer();
      deferred.resolve('some data');

      return deferred.promise;
    };

    fakeUserService.register = function(data) {
      var deferred = promise.defer();
      userSpy();
      deferred.resolve(data);
      return deferred.promise;
    };

    fakeUserService.get = function() {
      var deferred = promise.defer();
      deferred.resolve({ name: 'John Doe' });
      return deferred.promise;
    };
  });

  beforeEach(function() {
    broadcastSpy = sinon.spy(fakeScope, '$broadcast');
  });

  describe('when method #authenticate is called', function() {
    it('returns the auth response', function() {
      subject.authenticate('github').then(function(response) {
        expect(response).to.eql({ name: 'John Doe' });
      });
    });

    it('registers the user as current user', function() {
      subject.authenticate('github').then(function(response) { });
      expect(userSpy).to.have.been.called;
    });

    it('broadcasts a successfullyLogin event', function() {
      subject.authenticate('github').then(function(response) { });
      expect(broadcastSpy).to.have.been.calledWith('successfullyLogin');
    });
  });

  describe('when method #logout is called', function() {
    it('returns the auth response', function() {
      subject.logout().then(function(response) {
        expect(response).to.eql('some data');
      });
    });

    it('broadcasts a successfullyLogout event', function() {
      subject.logout().then(function(response) { });
      expect(broadcastSpy).to.have.been.calledWith('successfullyLogout');
    });
  });
});
