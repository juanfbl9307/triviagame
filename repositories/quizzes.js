const mysql = require('../lib/mysql');

const database = mysql;
const Quizz = module.exports;

Quizz.newQuizz = async (quizzName, quizzId) => {
    const newQuizz = await database.createQuizz(quizzName, quizzId);
    return newQuizz;
};

Quizz.newQuestion = async (questionId, quizzId, question, answer) => {
    const questions = await database.createQuestion(questionId, quizzId, question, answer)
    return questions
}

Quizz.deleteQuizz = async (name) => {
    const quizzDeleted = await database.deleteQuizz(name);
    return quizzDeleted;
};

Quizz.updateQuizz = async (quizzName, quizzNewName) => {
    const quizzUpdated = await database.updateQuizzName(quizzName, quizzNewName);
    return quizzUpdated;
};

Quizz.updateQuestions = async (quizzId, question, answer) => {
    const answerUpdated = await database.updateQuestion(quizzId, question, answer);
    return answerUpdated;
};

Quizz.getByName = async (quizzName) => {
    const exist = await database.quizzByName(quizzName);
    return exist;
};

Quizz.getById = async (quizzId) => {
    const exist = await database.quizzById(quizzId);
    return exist;
};

Quizz.results = async (quizzId, usernameEmail) => {
    const result = await database.getResults(quizzId, usernameEmail);
    return result;
}