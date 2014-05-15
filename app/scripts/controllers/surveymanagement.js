simpleSurveyEngineApp.controller('SurveyManagementCtrl', ['$scope', '$location','survey', function($scope, $location, surveyMgr) {

        $scope.surveysLoaded = false;

        $scope.surveys = surveyMgr.getSurveys();

        $scope.surveys.$on('loaded', function() {
                $scope.surveysLoaded = true;
        });

        $scope.newSurvey = function() {
                $location.path('/survey/create');
        };

        $scope.editSurvey = function(key) {
                $location.path('/survey/edit/' + key)
        };

        $scope.removeSurvey = function(key) {
                surveyMgr.removeSurvey(key);
        };

  }]);