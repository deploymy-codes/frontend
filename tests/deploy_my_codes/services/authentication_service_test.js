describe('AuthenticationService', function() {
  beforeEach(module('DeployMyCodes'));

  var fakeAuth, rootScope, subject, fakeUserService, userSpy;

  beforeEach(module(function($provide) {
    fakeAuth        = { getToken: function() {} };
    fakeUserService = { register: function() {}, user: function() {} };
    userSpy         = sinon.spy();
    $provide.value('$auth', fakeAuth);
    $provide.value('UserService', fakeUserService);
  }));

  beforeEach(inject(function($q, $httpBackend) {
    fakeAuth.authenticate = function(provider) {
      var deferred = $q.defer();
      deferred.resolve({ data: { api_key: 'XXXX-XXXX-XXXX-XXXX', name: 'John Doe' }});

      return deferred.promise;
    };

    fakeAuth.logout = function(provider) {
      var deferred = $q.defer();
      deferred.resolve('some data');

      return deferred.promise;
    };

    fakeUserService.register = function(data) {
      var deferred = $q.defer();
      userSpy();
      deferred.resolve(data);
      return deferred.promise;
    };

    fakeUserService.get = function() {
      var deferred = $q.defer();
      deferred.resolve({ name: 'John Doe' });
      return deferred.promise;
    };
  }));

  beforeEach(inject(function(AuthenticationService, $rootScope) {
    rootScope    = $rootScope;
    subject      = AuthenticationService;
    broadcastSpy = sinon.spy(rootScope, '$broadcast');
  }));

  describe('when method #authenticate is called', function() {
    it('returns the auth response', function() {
      subject.authenticate('github').then(function(response) {
        expect(response).to.eql({ name: 'John Doe' });
      });
      rootScope.$digest();
    });

    it('registers the user as current user', function() {
      subject.authenticate('github').then(function(response) { });
      rootScope.$digest();
      expect(userSpy).to.have.been.called;
    });

    it('broadcasts a successfullyLogin event', function() {
      subject.authenticate('github').then(function(response) { });
      rootScope.$digest();
      expect(broadcastSpy).to.have.been.calledWith('successfullyLogin');
    });
  });

  describe('when method #logout is called', function() {
    it('returns the auth response', function() {
      subject.logout().then(function(response) {
        expect(response).to.eql('some data');
      });
      rootScope.$digest();
    });

    it('broadcasts a successfullyLogout event', function() {
      subject.logout().then(function(response) { });
      rootScope.$digest();
      expect(broadcastSpy).to.have.been.calledWith('successfullyLogout');
    });
  });
});
