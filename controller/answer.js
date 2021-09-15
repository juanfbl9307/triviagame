const AnswerServices = require('../services/answerService');

const answerController = module.exports;

answerController.createAnswers = async (req, res) => {
    const { usernameEmail, questionId, response } = req.body;
    return AnswerServices.newAnswers(usernameEmail, questionId, response).then(result => res.status(result.status).send(result.message))
        .catch(() => res.status(500).send('Internal server error'));

};

answerController.deleteAnswer = async (req, res) => {
    const { answerId } = req.body;
    return AnswerServices.deleteAnswers(answerId).then(result => res.status(result.status).send(result.message))
        .catch(() => res.status(500).send('Internal server error'));

};

answerController.updateAnswers = async (req, res) => {
    const { answerId, response } = req.body;
    return AnswerServices.modifyAnswers(answerId, response).then(result => res.status(result.status).send(result.message))
        .catch(() => res.status(500).send('Internal server error'));

};

answerController.listAllAnswers = async (req, res) => {
    return AnswerServices.listAnswers().then(result => res.status(result.status).send(result.message))
        .catch(() => res.status(500).send('Internal server error'));

};