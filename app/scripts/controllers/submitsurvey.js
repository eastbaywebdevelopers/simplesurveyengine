simpleSurveyEngineApp.controller('SurveySubmitCtrl', ['$scope', '$log', '$route', 'survey', function($scope, $log, $route, surveySvc) {

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

                surveySvc.saveSurveyResponses($scope.selectedSurvey, responses);

                $scope.surveySubmitted = true;

        };

         surveySvc.getSurvey($scope, $route.current.params['id']);

        $scope.showSurvey = false;
        $scope.surveySubmitted = false;


}]);