const mysql = require('mysql');
const dotenv = require('dotenv').config();;


var connection;

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'triviaDb',
};

const handleConnection = () => {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error('Db error', err);
            setTimeout(handleConnection, 2000);
        } else {
            console.log('Conexion a la base de datos exitosa');
        }
    });

    connection.on('error', err => {
        console.error('Database error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        } else {
            throw err;
        }
    });
};
handleConnection();

const createQuizz = async (quizzName, quizzId) => {
    let keys = [`id, name`];
    let values = [`'${quizzId}', '${quizzName}'`];
    let query = `INSERT INTO quizzes (${keys}) VALUES (${values})`;
    const quizzCreation = connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return null;
        };
        return result;
    });
    return quizzCreation;
};

const createQuestion = async (questionId, quizzId, question, answer) => {
    let keys = [`id, quizz_id, question, correct_answer`];
    let values = [`'${questionId}', '${quizzId}', '${question}', '${answer}'`];
    let query = `INSERT INTO questions (${keys}) VALUES (${values})`;
    const questionCreation = connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return null;
        };
        return result;
    });
    return questionCreation;
};

const createAnswer = async (answerId, questionId, response, usernameEmail) => {
    let keys = [`id, question_id, response, user_email`];
    let values = [`'${answerId}', '${questionId}', '${response}', '${usernameEmail}'`];
    let query = `INSERT INTO answers (${keys}) VALUES (${values})`;
    const answerCreation = connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return null;
        };
        return result;
    });
    return answerCreation;
};

const deleteQuizz = async (name) => {
    let query = `DELETE FROM quizzes WHERE name = '${name}'`;
    const nameDeleted = connection.query(query, (err, result) => {

        if (err) {
            return console.log(err);
        };
        return result;
    });
    return nameDeleted;
};

const deleteAnswer = async (answerId) => {
    let query = `DELETE FROM answers WHERE id = '${answerId}'`;
    const answerDeleted = connection.query(query, (err, result) => {

        if (err) {
            return console.log(err);
        };
        return result;
    });
    return answerDeleted;
};

const updateQuizzName = async (quizzName, quizzNewName) => {
    let query = `UPDATE quizzes SET name = '${quizzNewName}' WHERE name = '${quizzName}'`;
    const updated = connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
            return;
        };
        return result;
    });
    return updated;
};

const updateQuestion = async (quizzId, question, answer) => {
    let query = `UPDATE questions SET question = '${question}', correct_answer = '${answer}' WHERE quizz_id = '${quizzId}'`;
    const updated = connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
            return;
        };
        return result;
    });
    return updated;
};

const updateAnswer = async (answerId, response) => {
    let query = `UPDATE answers SET response = '${response}' WHERE id = '${answerId}'`;
    const updated = connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
            return;
        };
        return result;
    });
    return updated;
};

const listTable = async (table) => {
    let query = `SELECT * FROM ${table}`;
    let list = new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
    });
    return list.then(result => {
        return result;
    }).catch(e => { throw e });

};

const quizzByName = async (quizzName) => {
    let quizz = new Promise((resolve, reject) => {
        let query = `SELECT * FROM quizzes WHERE name = '${quizzName}'`;

        connection.query(query, (err, result) => {

            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(result)));
        })

    })
    return quizz.then(result => {
        if (result.length == 0) {
            return false
        }
        result = Object.values(result[0])
        return result[0];
    }).catch(e => { throw e });
};

const quizzById = async (quizzId) => {
    let quizz = new Promise((resolve, reject) => {
        let query = `SELECT * FROM quizzes WHERE name = '${quizzId}'`;

        connection.query(query, (err, result) => {

            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(result)));
        })

    })
    return quizz.then(result => {
        if (result.length == 0) {
            return false
        }
        result = Object.values(result[0])
        return result[0];
    }).catch(e => { throw e });
};

const questionById = async (questionId, userEmail) => {
    let quizz = new Promise((resolve, reject) => {
        let query = `SELECT * FROM answers WHERE question_id = '${questionId}' AND user_email = '${userEmail}'`;

        connection.query(query, (err, result) => {

            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(result)));
        })

    })
    return quizz.then(result => {
        if (result.length == 0) {
            return false
        }
        result = Object.values(result[0])
        return result[0];
    }).catch(e => { throw e });
};

const answerById = async (answerId) => {
    let quizz = new Promise((resolve, reject) => {
        let query = `SELECT * FROM answers WHERE id = '${answerId}'`;

        connection.query(query, (err, result) => {

            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(result)));
        })

    })
    return quizz.then(result => {
        if (result.length == 0) {
            return false
        }
        result = Object.values(result[0])
        return result[0];
    }).catch(e => { throw e });
};

const getResults = async (quizzId, usernameEmail) => {
    let quizz = new Promise((resolve, reject) => {
        let query = `SELECT quizz_id, correct_answer, response FROM questions INNER JOIN answers ON questions.id = answers.question_id WHERE questions.quizz_id = '${quizzId}' AND answers.user_email = '${usernameEmail}'`;
        connection.query(query, (err, result) => {

            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(JSON.parse(JSON.stringify(result)));
        })

    })
    return quizz.then(result => {
        if (result.length == 0) {
            return false
        }
        return result;
    }).catch(e => { throw e });

}


module.exports = {
    createQuizz,
    createQuestion,
    createAnswer,
    deleteQuizz,
    deleteAnswer,
    listTable,
    updateQuizzName,
    updateQuestion,
    updateAnswer,
    quizzByName,
    quizzById,
    questionById,
    answerById,
    getResults
};