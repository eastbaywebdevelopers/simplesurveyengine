simpleSurveyEngineApp.factory('survey', function($firebase) {

    var surveyUrl = "https://eastbaydevmeetup.firebaseio.com/surveys/";
    var surveyRef = new Firebase(surveyUrl);

    /**
     * Generates a guid value
     * @private
     */
    var guid = (function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
          }
          return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                   s4() + '-' + s4() + s4() + s4();
          };
    })();

    /**
     * Gets an existing survey from the Firebase database.
     * @private
     */
     var getSurveyFromDb = function(id) {
        var ref = new Firebase(surveyUrl + id);
        return $firebase(ref);
    };

    /**
     * Increments the number of submittals for a specific survey
     * @param {String} id The ID of the survey
     * @private
     */
    var incrementSurveySubmittalCount = function(id) {

        var countRef = new Firebase("https://eastbaydevmeetup.firebaseio.com/surveys/" + id + '/submitCount');
        countRef.transaction(function(current_value) {
          return current_value + 1;
        });

    };

    /**
     * Generates an empty survey object
     * @public
     */
    var newSurvey = function() {

        return {
                "id": null,
                "title": null,
                "category": null,
                "description": null,
                "questions": [],
                "submitCount": 0
            };

    };

    /**
     * Generates an empty survey question object
     * @public
     */
    var newQuestion = function() {
            return {
                    "id": null,
                    "text": null,
                    "type": null,
                    "required": true,
                    "optionText": null,
                    "options": [],
                    "response": ""
            };

    };

    /**
     * Adds a question to the existing questions collection of a survey
     * @public
     */
    var addQuestion = function(question, questions) {
        if(questions) {
            question.id = guid();
            questions.push(question);
        }
    };

    /**
     * Removes a question from the existing questions collection of a survey
     * @public
     */
    var removeQuestion = function(index, questions) {
        if(questions) {
            questions.splice(index, 1);
        }
    };

    /**
     * Saves a survey to the firebase collection (create new)
     * @param {object} survey The survey to be added.
     * @public
     */
    var addSurvey = function(survey) {
        survey.id = guid(); //id is obsolete now that surveys are in Firebase
        surveys.push(survey);
    };

    /**
     * This is an upsert method; it either adds a new survey or updates an existing one in Firebase
     * @param {object} survey The survey to be added or updated.
     * @public
     */
    var updateSurvey = function(survey) {
         if(survey.questions && survey.questions.length) {
             for(var i = 0; i < survey.questions.length; i++) {
                            survey.questions[i] = angular.fromJson(angular.toJson(survey.questions[i]));
              };
        }
            if(!survey.id) {
                    var surveys = new Firebase(surveyUrl);
                    survey.id = guid();  //id is obsolete now that surveys are in Firebase
                    surveys.push(survey);
            } else {
                    var ref = new Firebase(surveyUrl);
                    ref = survey;
                    ref.$save();
            }
    };

    /**
     * Deletes an existing survey from Firebase
     * @public
     */
    var removeSurvey = function(id) {
        var s = getSurveyFromDb(id);
        s.$remove();
    };

    /**
     * Gets an existing survey from Firebase and inserts it into the relavant controller's scope
     * @param {object} scope Scope of the controller making the call
     * @param {string} id The survey ID.
     * @public
     */
    var getSurvey = function(scope, id) {
        scope.selectedSurvey = getSurveyFromDb(id);
    };

    /**
     * Gets the list of existing surveys in Firebase and inserts them into the calling controller's scope
     * @param {object} scope Scope of the controller making the call
     * @public
     */
    var setSurveysToScope = function(scope) {
            scope.surveys = $firebase(surveyRef);

            scope.surveys.$on('loaded', function() {
                scope.surveysLoaded = true;
            });
    };

    /**
     * Saves the responses of a submitted survey
     * @param {object} survey The survey being submitted.
     * @param {array} responses An array of response objects to be inserted into Firebase for the survey.
     * @public
     */
    var saveSurveyResponses = function(survey, responses) {
            var surveyResponseUrl = "https://eastbaydevmeetup.firebaseio.com/surveyresponses/";
            var surveyResponses = new Firebase(surveyResponseUrl);
            surveyResponses.push(responses);
            incrementSurveySubmittalCount(survey.$id);
    };

    return {
        getSurvey: getSurvey,
        updateSurvey: updateSurvey,
        removeSurvey: removeSurvey,
        newSurvey: newSurvey,
        newQuestion: newQuestion,
        addQuestion: addQuestion,
        removeQuestion: removeQuestion,
        setSurveysToScope: setSurveysToScope,
        saveSurveyResponses: saveSurveyResponses
    };


});