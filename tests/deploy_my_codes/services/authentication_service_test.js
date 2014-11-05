describe('AuthenticationService', function() {
  beforeEach(module('DeployMyCodes'));

  var fakeAuth, rootScope, subject;

  beforeEach(module(function($provide) {
    fakeAuth = { getToken: function() {} };
    $provide.value('$auth', fakeAuth);
  }));

  beforeEach(inject(function($q, $httpBackend) {
    fakeAuth.authenticate = function(provider) {
      var deferred = $q.defer();
      deferred.resolve('user token');

      return deferred.promise;
    };

    fakeAuth.logout = function(provider) {
      var deferred = $q.defer();
      deferred.resolve('some data');

      return deferred.promise;
    };

    $httpBackend.whenGET(/assets\/templates/).respond(function() {
      return [200, '', {}];
    });
  }));

  beforeEach(inject(function(AuthenticationService, $rootScope) {
    rootScope    = $rootScope;
    subject      = AuthenticationService;
    broadcastSpy = sinon.spy(rootScope, '$broadcast');
  }));

  describe('when method #authenticate is called', function() {
    it('returns the auth response', function() {
      subject.authenticate('github').then(function(response) {
        expect(response).to.eql('user token');
      });
      rootScope.$digest();
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
