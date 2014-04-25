'use strict';

var TrelloService = function TrelloService($q, $window, $timeout, $log) {
  this.Trello = $window.Trello;
  this.$q = $q;
  this.$timeout = $timeout;
  this.$log = $log;
};

/**
 *
 * @param interactive  {Boolean}  If false, don’t redirect or popup, only use the stored token
 * @param type         {String}   "redirect" or "popup" Whether authorization should be done in a new window, or by leaving the current page
 * @param name         {String}   name of your application, which is displayed during the authorization process
 * @param allowRead    {Boolean}  allow read permissions
 * @param allowWrite   {Boolean}  allow write permissions
 * @param allowAccount {Boolean}  allow account permissions
 * @returns {Promise}
 */
TrelloService.prototype.authorize = function (interactive, type, name, allowRead, allowWrite, allowAccount) {
  var deferred = this.$q.defer();

  var onAuthorize = function () {
    deferred.resolve();
  };

  var onError = function () {
    deferred.reject();
  };

  var authorizeOptions = {
    interactive: interactive,
    success: onAuthorize,
    error: onError
  };

  if (angular.isString(type)) {
    if ((type === 'redirect' || type === 'popup')) {
      authorizeOptions.type = type;
    } else {
      $log.error('TrelloService authorize passed an invalid type. Use redirect or popup. type given:' + type);
    }
  }

  if (angular.isString(name)) {
    authorizeOptions.name = name;
  }

  var scopeOptions = {read: true, write: false, account: false};
  //only need to change if the value is not the same as the default
  if (angular.isDefined(allowRead) && allowRead === false) {
    scopeOptions.read = false;
  }
  if (angular.isDefined(allowWrite) && allowWrite === true) {
    scopeOptions.write = true;
  }
  if (angular.isDefined(allowAccount) && allowAccount === true) {
    scopeOptions.account = true;
  }
  authorizeOptions.scope = scopeOptions;

  this.Trello.authorize(authorizeOptions);

  if (interactive === false) {
    this.$timeout(function () {
      deferred.reject();
    }, 2000);
  }

  return deferred.promise;
};

TrelloService.prototype.authorized = function () {
  return this.Trello.authorized();
};

TrelloService.prototype.deauthorize = function () {
  this.Trello.deauthorize();
};

angular.module('angular-trello').service('TrelloService', TrelloService);