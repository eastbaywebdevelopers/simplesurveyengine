'use strict';

var simpleSurveyEngineApp = angular
  .module('simpleSurveyEngineApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/survey/submit/:id', {
        templateUrl: 'views/survey.html',
        controller: 'SurveySubmitCtrl'
      })
      .when('/survey/:action', {
        templateUrl: 'views/editsurvey.html',
        controller: 'SurveyCreateEditCtrl'
      })
      .when('/surveymanagement', {
        templateUrl: 'views/surveymanagement.html',
        controller: 'SurveyManagementCtrl'
      })
      .when('/survey/:action/:id', {
        templateUrl: 'views/editsurvey.html',
        controller: 'SurveyCreateEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
