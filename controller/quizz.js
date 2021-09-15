const QuizzServices = require('../services/quizzService');

const quizzController = module.exports;

quizzController.create = async (req, res) => {
    const { quizzName } = req.body;
    return QuizzServices.create(quizzName).then(result => res.status(result.status).send({ message: result.message, questions: result.quizz }))
        .catch(() => res.status(500).send('Internal server error'));

};

quizzController.deleteQuizz = async (req, res) => {
    const { quizzName } = req.body;
    return QuizzServices.deleteQuizz(quizzName).then(result => res.status(result.status).send(result.message))
        .catch(() => res.status(500).send('Internal server error'));
};


quizzController.updateQuizz = async (req, res) => {
    const { quizzName, newQuizzName } = req.body;
    return QuizzServices.editQuizz(quizzName, newQuizzName).then(result => res.status(result.status).send(result.message))
        .catch(() => res.status(500).send('Internal server error'));

};

quizzController.listQuizzes = async (req, res) => {
    return QuizzServices.listAllQuizzes().then(result => res.status(result.status).send(result.message))
        .catch(() => res.status(500).send('Internal server error'));

};

quizzController.quizzResults = async (req, res) => {
    const { quizzId, usernameEmail } = req.body;
    return QuizzServices.userResults(quizzId, usernameEmail).then(result => {
        res.status(200).send(result)
    }).catch((err) => res.status(500).send('Internal Server error'))
}

quizzController.getQuizzQuestions = async (req, res) => {
    const { quizzId } = req.body;
    return QuizzServices.quizzQuestions(quizzId).then(result => {
        res.status(200).send(result)
    }).catch((err) => res.status(500).send('Internal Server error'))
}