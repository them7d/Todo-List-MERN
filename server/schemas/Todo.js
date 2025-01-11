const todo = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'title', 'completed', 'CreatedAt', 'UpdatedAt'],
        properties: {
            userId: {
                bsonType: 'string',
                description: 'must be a string and is required'
            },
            title: {
                bsonType: 'string',
                description: 'must be a string'
            },
            completed: {
                bsonType: 'bool',
                description: 'must be a boolean and defaults to false'
            },
            CreatedAt: {
                bsonType: 'date',
                description: 'must be a date and defaults to the current date'
            },
            UpdatedAt: {
                bsonType: 'date',
                description: 'must be a date and defaults to the current date'
            }
        }
    }
};

module.exports = todo;