simpleSurveyEngineApp.controller('SurveyCreateEditCtrl', ['$scope', '$log', '$location', '$route', 'survey', function($scope, $log, $location, $route, surveyMgr) {

    if($route.current.params['action'] === 'create') {
        $scope.selectedSurvey = surveyMgr.newSurvey();
    }
    else if ($route.current.params['action'] === 'edit') {
        $scope.selectedSurvey = surveyMgr.getSurvey($route.current.params['id']);
    }

    $scope.newQuestion = surveyMgr.newQuestion();

    $scope.cancelSurveyUpdate = function() {
            $location.path('/surveymanagement');
    };

    $scope.addQuestion = function() {
            if($scope.newQuestion !== undefined) {
                surveyMgr.addQuestion(angular.copy($scope.newQuestion), $scope.selectedSurvey.questions);
                $scope.newQuestion = surveyMgr.newQuestion();
            }
    };

    $scope.removeQuestion = function(index) {
                surveyMgr.removeQuestion(index, $scope.selectedSurvey.questions);
    };

    $scope.saveSurvey = function(id) {
                //$log.info($scope.selectedSurvey);
                surveyMgr.updateSurvey($scope.selectedSurvey);
                $scope.selectedSurvey = undefined;
                $scope.newQuestion = surveyMgr.newQuestion();
                $location.path('/surveymanagement');
    };

    $scope.resetOptions= function(question) {
            if(question.type !== 'singlechoice') {
                question.options = [];
            }
    };

}]);