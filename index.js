const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
let message = "";
const pokedex = [];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
    setTimeout(() => {
        message = "";
      }, 500);
    res.render("index",{
    message,
    pokedex
    });
  });
app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});
app.post("/new", (req, res) => {
    const {numero, nome, tipo, imagem, descricao, altura, peso, categoria, habilidade}  = req.body;
    let pokemon = {numero: numero, nome: nome, tipo: tipo, imagem: imagem, descricao: descricao, altura: altura, peso: peso, categoria: categoria, habilidade: habilidade};
    pokedex.push(pokemon);
    message = "O Pokemon foi cadastrado!";
    res.redirect("/");
  });
  app.get("/detalhes/:id", (req, res) => {
    const id = req.params.id;
    const pokemon = pokedex[id];
    res.render("detalhes", {
      pokemon,
    });
  });

app.listen(port);

