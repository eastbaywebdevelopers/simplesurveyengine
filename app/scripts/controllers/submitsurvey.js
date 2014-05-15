simpleSurveyEngineApp.controller('SurveySubmitCtrl', ['$scope', '$log', '$route', 'survey', function($scope, $log, $route, surveyMgr) {

        $scope.resetSurvey = function() {

                $scope.surveySubmitted = false;

                for(var i = 0; i < $scope.selectedSurvey.questions.length; i++) {
                            $scope.selectedSurvey.questions[i].response = "";
                 }
        };

        $scope.submitSurveyResponses = function() {

                var responses = [];

                for(var i = 0; i < $scope.selectedSurvey.questions.length; i++) {
                        responses.push({"qid": $scope.selectedSurvey.questions[i].id, "response": $scope.selectedSurvey.questions[i].response});
                }

                surveyMgr.saveSurveyResponses($scope.selectedSurvey, responses);

                $scope.surveySubmitted = true;

        };

        $scope.selectedSurvey = surveyMgr.getSurvey($route.current.params['id']);

        $scope.showSurvey = false;
        $scope.surveySubmitted = false;


}]);