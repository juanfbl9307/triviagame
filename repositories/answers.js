const mysql = require('../lib/mysql');

const database = mysql;
const Answer = module.exports;

Answer.createAns = async (answerId, questionId, response, usernameEmail) => {
    const created = await database.createAnswer(answerId, questionId, response, usernameEmail);
    return created;
};

Answer.deleteAns = async (answerId) => {
    const deleted = await database.deleteAnswer(answerId);
    return deleted;
};

Answer.updateAns = async (answerId, response) => {
    const updated = await database.updateAnswer(answerId, response);
    return updated;
};

Answer.getQuestionById = async (questionId, userEmail) => {
    const exist = await database.questionById(questionId, userEmail);
    return exist
};

Answer.getQuestionById = async (answerId) => {
    const exist = await database.answerById(answerId);
    return exist
};





