simpleSurveyEngineApp.controller('SurveyManagementCtrl', ['$scope', '$location','survey', function($scope, $location, surveySvc) {

        $scope.surveysLoaded = false;

        $scope.surveys = [];
        surveySvc.setSurveysToScope($scope);

        $scope.newSurvey = function() {
                $location.path('/survey/create');
        };

        $scope.editSurvey = function(key) {
                $location.path('/survey/edit/' + key)
        };

        $scope.removeSurvey = function(key) {
                surveySvc.removeSurvey(key);
        };

  }]);