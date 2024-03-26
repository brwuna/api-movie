require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(express.json())
app.use(routes)

app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))







/* 
    app.get("/message/:id/:user", (req, res) => {
        const { id, user } = req.params
        res.send(`ID da mensagem: ${id}. Para o usuário ${user}`);
    })

    // Ex: http://localhost:3333/message/5/bruna
    // ID da mensagem: 5. Para o usuário bruna

    app.get("/users", (req, res) => {
        const { page, limit } = req.query

        res.send(`Page: ${page}. Limit: ${limit}`);
    })

    // Ex: http://localhost:3333/users?page=2&limit=10
    // Page: 10. Limit: 10.
*/