'use strict';

describe('Directive: styleToggle', function () {

  // load the directive's module
  beforeEach(module('webLaseAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<style-toggle></style-toggle>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the styleToggle directive');
  }));
});
