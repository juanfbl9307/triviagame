const Quizz = require('../repositories/quizzes');
const id = require('uuid');
const axios = require('axios');

const QuizzService = module.exports;

const getQuestions = async () => {
    const listQuestions = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean').then(result => {
        const data = result.data.results;
        var questions = [];

        for (let index = 0; index < 10; index++) {
            questions[index] = unescape(data[index].question)
        }
        return questions

    }).catch(err => {
        console.log(err)
    })
    return listQuestions
};

const getAnswers = async () => {
    const listAnswer = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean').then(result => {
        const data = result.data.results;
        var questions = [];

        for (let index = 0; index < 10; index++) {
            questions[index] = data[index].correct_answer.toLowerCase()
        }
        return questions

    }).catch(err => {
        console.log(err)
    })
    return listAnswer
};

QuizzService.create = async (quizzName) => {
    const quizzByName = await Quizz.getByName(quizzName);
    if (quizzByName) {
        let creation = {
            message: 'This Quizz name already exist',
            status: 400
        };
        return creation
    };
    const questions = await getQuestions();
    const answers = await getAnswers();
    const quizzId = id.v4();
    const quizzCreated = await Quizz.newQuizz(quizzName, quizzId);
    for (let i = 0; i < 10; i++) {
        await Quizz.newQuestion(id.v4(), quizzId, questions[i], answers[i])
    }
    if (quizzCreated) {
        let creation = {
            message: 'Quizz successfully created',
            quizz: questions,
            status: 200
        };
        return creation
    } else {
        let creation = {
            message: 'Error en el servidor',
            status: 500
        };
        return creation
    }
};

QuizzService.deleteQuizz = async (quizzName) => {
    const quizzByName = await Quizz.getByName(quizzName);
    if (!quizzByName) {
        let creation = {
            message: `Quizz ${quizzName} doesn't exist`,
            status: 400
        };
        return creation
    };
    const quizzDeletion = await Quizz.deleteQuizz(quizzName);
    if (quizzDeletion) {
        let creation = {
            message: `Quizz ${quizzName} deleted`,
            status: 200
        }
        return creation;
    } else {
        let creation = {
            message: 'Internal server error',
            status: 500
        };
        return creation;
    }

};

QuizzService.listAllQuizzes = async () => {
    const list = await Quizz.listQuizzes();
    let result = {
        status: 200,
        message: list
    };
    return result
};

QuizzService.editQuizz = async (quizzName, newQuizzName) => {
    const quizzId = await Quizz.getByName(quizzName);
    if (!quizzId) {
        let creation = {
            message: `Bad quizz information`,
            status: 400
        };
        return creation
    };

    const questions = await getQuestions();
    const answers = await getAnswers();
    const response = await Quizz.updateQuizz(quizzName, newQuizzName);
    for (let i = 0; i < 10; i++) {
        await Quizz.updateQuestions(quizzId, questions[i], answers[i])
    }
    if (response) {
        let result = {
            status: 200,
            message: `Quizz ${quizzName} updated by the name ${newQuizzName} `
        };
        return result;
    } else {
        let result = {
            status: 500,
            message: `Internal server error`
        };
        return result;
    }

};

QuizzService.userResults = async (quizzId, usernameEmail) => {
    const getResults = await Quizz.results(quizzId, usernameEmail);
    let score = 0;
    for (let i = 0; i < getResults.length; i++) {
        if (getResults[i].correct_answer === getResults[i].response) {
            score += 1;
        }

    }
    score = `You have response ${(score / getResults.length) * 100}% of the questions well`
    return score;
};



