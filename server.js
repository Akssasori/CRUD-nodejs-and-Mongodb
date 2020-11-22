const express = require("express");
const bodyParser = require("body-parser");// ajuda a analisar a solicotacao e criar o req.body objeto
const cors = require("cors");// fornece middleware Express para habilitar CORS com varias opcoes

const app = express();

var corsOptions = {
    origin:"http://localhost:8081"
};

app.use(cors(corsOptions));

//pass a requisição do conteudo para o tipo - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// rota simples
app.get("/", (req, res) =>{
    res.json({ message: "Bem vindo a aplicacao"});
});

require("./app/routes/tutorial.routes")(app);
// set port, listen for requests

//setar a porta que ouve a requisição
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

 
   




