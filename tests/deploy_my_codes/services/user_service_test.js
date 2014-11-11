describe('UserService', function() {
  beforeEach(module('DeployMyCodes'));

  var FakeAuth, FakeLocalStorage, localStorageDB, rootScope, savedSpy, subject;

  beforeEach(module(function($provide) {
    localStorageDB   = {};
    savedSpy         = sinon.spy();
    FakeLocalStorage = {};
    FakeAuth         = {};
    $provide.value('LocalStorage', FakeLocalStorage);
    $provide.value('$auth',        FakeAuth);
  }));

  beforeEach(inject(function() {
    FakeLocalStorage.set = function(name, content) {
      savedSpy();
      localStorageDB[name] = content;
    };

    FakeLocalStorage.get = function(name) {
      return localStorageDB[name];
    };

    FakeLocalStorage.remove = function(name) {
      delete localStorageDB[name];
    };

    FakeAuth.getToken = function() {
      return 'XXXX-XXXX-XXXX-XXXX';
    };
  }));

  beforeEach(inject(function(UserService, $rootScope) {
    rootScope = $rootScope;
    subject   = UserService;
  }));

  describe('when #register method is called', function() {
    it('logs in the current user', function() {
      subject.register({ name: 'John Doe' }).then(function(user) {
        expect(user.name).to.eql('John Doe');
        expect(user.isLoggedIn).to.eql(true);
      });
      rootScope.$digest();
      expect(savedSpy).to.have.been.calledOnce;
    });
  });

  describe('when #get method is called', function() {
    describe('when user has a token and a logged in user', function() {
      beforeEach(function() {
        FakeLocalStorage.set('deploy_my_codes_current_user', { name: 'John Doe', isLoggedIn: true });
      });

      it('returns the user', function() {
        subject.get().then(function(user) {
          expect(user.name).to.eql('John Doe');
          expect(user.isLoggedIn).to.eql(true);
        });
        rootScope.$digest();
      });
    });

    describe('when user has no token but a logged in user', function() {
      beforeEach(function() {
        FakeAuth.getToken = function() {};
        FakeLocalStorage.set('deploy_my_codes_current_user', { name: 'John Doe', isLoggedIn: true });
      });

      it('returns a null user', function() {
        subject.get().then(function(user) {
          expect(user.isLoggedIn).to.eql(false);
        });
        rootScope.$digest();
      });
    });

    describe('when user has a token and not a logged in user', function() {
      it('returns a null user', function() {
        subject.get().then(function(user) {
          expect(user.isLoggedIn).to.eql(false);
        });
        rootScope.$digest();
      });
    });
  });
});
