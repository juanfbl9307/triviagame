const Answers = require('../repositories/answers');
const id = require('uuid')

const AnswerService = module.exports;

AnswerService.newAnswers = async (usernameEmail, questionId, response) => {
    const answered = await Answers.getQuestionById(questionId, usernameEmail);
    if (answered) {
        let response = {
            message: 'Question already answered',
            status: 400
        }
        return response
    }
    const AnswerId = id.v4();
    const answer = await Answers.createAns(AnswerId, questionId, response, usernameEmail);
    if (answer) {
        let response = {
            message: 'Question answered',
            status: 200
        }
        return response
    } else {
        let response = {
            message: 'Internal server error',
            status: 500
        }
    }
};

AnswerService.deleteAnswers = async (answerId) => {
    const checkInfo = await Answers.getQuestionById(answerId);
    if (!checkInfo) {
        let response = {
            message: "Bad information",
            status: 400
        }
        return response
    }
    const deleteAnswer = await Answers.deleteAns(answerId);
    if (deleteAnswer) {
        let response = {
            message: `Answers deleted`,
            status: 200
        }
        return response
    } else {
        let response = {
            message: `Internal server error`,
            status: 500
        }
        return response
    }

};

AnswerService.modifyAnswers = async (answerId, response) => {
    const checkInfo = await Answers.getQuestionById(answerId);
    if (!checkInfo) {
        let response = {
            message: "Bad information",
            status: 400
        }
        return response
    }

    const update = await Answers.updateAns(answerId, response);
    if (update) {
        let response = {
            message: `Answers updated`,
            status: 200
        }
        return response
    } else {
        let response = {
            message: `Internal server error`,
            status: 500
        }
        return response
    }


};

AnswerService.listAnswers = async () => {
    const allAnswers = await Answers.getAnswers();
    if (allAnswers) {
        let response = {
            message: allAnswers,
            status: 200
        }
        return response
    }
}
