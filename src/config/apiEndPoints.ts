interface APIEndPoints {
    userLogin: string,
    userRegistration: string,
    getTodosForDateSelected: string,
    writeTodoItem: string,
    updateDoneState: string,
    deleteTodoItem: string,
    getAllTodosForUser: string,
}

export const apiEndPoints:APIEndPoints = {

    //Endpoints for Local Server
    // userLogin: 'http://localhost:8090/users/verify',
    // userRegistration: 'http://localhost:8090/users/registerUser',
    // getTodosForDateSelected: 'http://localhost:8090/todos/read',
    // writeTodoItem: 'http://localhost:8090/todos/write',
    // updateDoneState: 'http://localhost:8090/todos/updateDoneState',
    // deleteTodoItem: 'http://localhost:8090/todos/deleteItem',
    // getAllTodosForUser: 'http://localhost:8090/todos/readAllItemsForUser',

    //Endpoints for Heruku Server
    userLogin: 'https://doitnow-restapi-heroku.herokuapp.com/users/verify',
    userRegistration: 'https://doitnow-restapi-heroku.herokuapp.com/users/registerUser',
    getTodosForDateSelected: 'https://doitnow-restapi-heroku.herokuapp.com/todos/read',
    writeTodoItem: 'https://doitnow-restapi-heroku.herokuapp.com/todos/write',
    updateDoneState: 'https://doitnow-restapi-heroku.herokuapp.com/todos/updateDoneState',
    deleteTodoItem: 'https://doitnow-restapi-heroku.herokuapp.com/todos/deleteItem',
    getAllTodosForUser: 'https://doitnow-restapi-heroku.herokuapp.com/todos/readAllItemsForUser',

}
