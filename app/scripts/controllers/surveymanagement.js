simpleSurveyEngineApp.controller('SurveyManagementCtrl', ['$scope', '$location','survey', function($scope, $location, surveyMgr) {

        $scope.surveysLoaded = false;

        $scope.surveys = [];
        surveyMgr.setSurveysToScope($scope);

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