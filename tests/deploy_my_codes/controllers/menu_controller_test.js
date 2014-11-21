describe('MenuCtl', function() {
  var scope          = require('test_helpers/scope');
  var promise        = require('test_helpers/promise');
  var describedClass = require('deploy_my_codes/controllers/menu_controller');
  var fakeUserService, fakeScope, subject, userSpy;

  beforeEach(function() {
    fakeScope = scope();
    fakeUserService = {};
    userSpy   = sinon.spy();
    subject   = describedClass(fakeScope, fakeUserService);
  });

  beforeEach(function() {
    var users = ['user_1', 'user_1_bis'];
    fakeUserService.get = function() {
      var deferred = promise.defer();
      userSpy();
      deferred.resolve(users.shift());

      return deferred.promise;
    };
  });

  beforeEach(function() {
    fakeScope.getUser();
  });

  describe('when controller is Loaded', function() {
    it('loads the current user on startup', function() {
      sinon.assert.calledOnce(userSpy);
      expect(fakeScope.user).to.eql('user_1');
    });
  });

  describe('when "successfullyLogin" message is brodacast', function() {
    it('reloads the current user', function() {
      expect(fakeScope.user).to.eql('user_1');
      fakeScope.$broadcast('successfullyLogin');
      sinon.assert.calledTwice(userSpy);
      expect(fakeScope.user).to.eql('user_1_bis');
    });
  });

  describe('when "successfullyLogout" message is brodacast', function() {
    it('reloads the current user', function() {
      expect(fakeScope.user).to.eql('user_1');
      fakeScope.$broadcast('successfullyLogout');
      sinon.assert.calledTwice(userSpy);
      expect(fakeScope.user).to.eql('user_1_bis');
    });
  });
});
