describe('UserService', function() {
  var promise        = require('test_helpers/promise');
  var describedClass = require('deploy_my_codes/services/user_service');

  var fakeAuth, fakeLocalStorage, localStorageDB, savedSpy, subject;

  beforeEach(function() {
    localStorageDB   = {};
    savedSpy         = sinon.spy();
    fakeLocalStorage = {};
    fakeAuth         = {};
    subject          = describedClass(fakeAuth, promise, fakeLocalStorage);
  });

  beforeEach(function() {
    fakeLocalStorage.set = function(name, content) {
      savedSpy();
      localStorageDB[name] = content;
    };

    fakeLocalStorage.get = function(name) {
      return localStorageDB[name];
    };

    fakeLocalStorage.remove = function(name) {
      delete localStorageDB[name];
    };

    fakeAuth.getToken = function() {
      return 'XXXX-XXXX-XXXX-XXXX';
    };
  });

  describe('when #register method is called', function() {
    it('logs in the current user', function() {
      subject.register({ name: 'John Doe' }).then(function(user) {
        expect(user.name).to.eql('John Doe');
        expect(user.isLoggedIn).to.eql(true);
      });
      expect(savedSpy).to.have.been.calledOnce;
    });
  });

  describe('when #get method is called', function() {
    describe('when user has a token and a logged in user', function() {
      beforeEach(function() {
        fakeLocalStorage.set('deploy_my_codes_current_user', { name: 'John Doe', isLoggedIn: true });
      });

      it('returns the user', function() {
        subject.get().then(function(user) {
          expect(user.name).to.eql('John Doe');
          expect(user.isLoggedIn).to.eql(true);
        });
      });
    });

    describe('when user has no token but a logged in user', function() {
      beforeEach(function() {
        fakeAuth.getToken = function() {};
        fakeLocalStorage.set('deploy_my_codes_current_user', { name: 'John Doe', isLoggedIn: true });
      });

      it('returns a null user', function() {
        subject.get().then(function(user) {
          expect(user.isLoggedIn).to.eql(false);
        });
      });
    });

    describe('when user has a token and not a logged in user', function() {
      it('returns a null user', function() {
        subject.get().then(function(user) {
          expect(user.isLoggedIn).to.eql(false);
        });
      });
    });
  });
});
