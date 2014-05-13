simpleSurveyEngineApp.controller('SurveyCreateEditCtrl', ['$scope', '$log', '$location', '$route', 'survey', function($scope, $log, $location, $route, surveySvc) {

    if($route.current.params['action'] === 'create') {
        $scope.selectedSurvey = surveySvc.newSurvey();
    }
    else if ($route.current.params['action'] === 'edit') {
        surveySvc.getSurvey($scope, $route.current.params['id']);
    }

    $scope.newQuestion = surveySvc.newQuestion();

    $scope.cancelSurveyUpdate = function() {
            $location.path('/surveymanagement');
    };

    $scope.addQuestion = function() {
            if($scope.newQuestion !== undefined) {
                surveySvc.addQuestion(angular.copy($scope.newQuestion), $scope.selectedSurvey.questions);
                $scope.newQuestion = surveySvc.newQuestion();
            }
    };

    $scope.removeQuestion = function(index) {
                surveySvc.removeQuestion(index, $scope.selectedSurvey.questions);
    };

    $scope.saveSurvey = function(id) {
                //$log.info($scope.selectedSurvey);
                surveySvc.updateSurvey($scope.selectedSurvey);
                $scope.selectedSurvey = undefined;
                $scope.newQuestion = surveySvc.newQuestion();
                $location.path('/surveymanagement');
    };

    $scope.resetOptions= function(question) {
            if(question.type !== 'singlechoice') {
                question.options = [];
            }
    };

}]);