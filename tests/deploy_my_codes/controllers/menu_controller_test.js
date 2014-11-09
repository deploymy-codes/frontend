describe('MenuCtl', function() {
  beforeEach(module('DeployMyCodes'));

  var FakeUserService, scope, userSpy;

  beforeEach(module(function($provide) {
    userSpy = sinon.spy();
    FakeUserService = {};
    $provide.value('UserService', FakeUserService);
  }));

  beforeEach(inject(function($q) {
    var users = ['user_1', 'user_1_bis'];
    FakeUserService.get = function() {
      return $q(function(resolve, reject) {
        userSpy();
        resolve(users.shift());
      });
    };
  }));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('MenuCtl', { $scope: scope, UserService: FakeUserService });
    scope.getUser();
    scope.$digest();
  }));

  describe('when controller is Loaded', function() {
    it('loads the current user on startup', function() {
      sinon.assert.calledOnce(userSpy);
      expect(scope.user).to.eql('user_1');
    });
  });

  describe('when "successfullyLogin" message is brodacast', function() {
    it('reloads the current user', function() {
      expect(scope.user).to.eql('user_1');
      scope.$broadcast('successfullyLogin');
      scope.$digest();
      sinon.assert.calledTwice(userSpy);
      expect(scope.user).to.eql('user_1_bis');
    });
  });

  describe('when "successfullyLogout" message is brodacast', function() {
    it('reloads the current user', function() {
      expect(scope.user).to.eql('user_1');
      scope.$broadcast('successfullyLogout');
      scope.$digest();
      sinon.assert.calledTwice(userSpy);
      expect(scope.user).to.eql('user_1_bis');
    });
  });
});
