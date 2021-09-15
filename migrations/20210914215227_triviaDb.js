
exports.up = function (knex) {
    knex.raw('CREATE DATABASE triviadb')
    return knex.schema
        .createTable('quizzes', function (table) {
            table.string('id').notNullable().primary()
            table.string('name', 255).notNullable()
        })
        .createTable('questions', function (table) {
            table.string('id').notNullable().primary()
            table.string('quizz_id', 255).notNullable()
                .references('id')
                .inTable('quizzes')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.string('question', 255)
            table.string('correct_answer', 255).notNullable()
        })
        .createTable('answers', function (table) {
            table.string('id').notNullable().primary()
            table.string('question_id', 255).notNullable()
                .references('id')
                .inTable('questions')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.string('response', 255)
            table.string('user_email').notNullable()
        })

};

exports.down = function (knex) {
    return knex.schema.dropTable('quizzes').dropTable('questions').dropTable('answers')
};
