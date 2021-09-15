const routes = require('express').Router();

const AnswersController = require('./controller/answer');
const QuizzController = require('./controller/quizz');

routes.post('/answers/create', AnswersController.createAnswers);
routes.post('/answers/delete', AnswersController.deleteAnswer);
routes.post('/answers/update', AnswersController.updateAnswers);
routes.get('/answers/list', AnswersController.listAllAnswers);

routes.post('/quizz/questions', QuizzController.getQuizzQuestions)

routes.post('/quizz/delete', QuizzController.deleteQuizz);
routes.post('/quizz/update', QuizzController.updateQuizz);
routes.post('/quizz/create', QuizzController.create);
routes.get('/quizz/list', QuizzController.listQuizzes);
routes.post('/quizz/results', QuizzController.quizzResults)

module.exports = routes;