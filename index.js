// Importa os módulos necessários: express, body-parser e qrcode
const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");


// Configura o EJS como engine de template e usa o body-parser como middleware
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());


// Define uma rota para a página inicial
app.get("/", (req, res) => {
  res.render("index");
});

// Define uma rota para a ação de escanear e gerar o QR code
app.post("/scan", (req, res) => {
  const url = req.body.url;

    // Verifica se a entrada está vazia e retorna um erro caso esteja
  if (url.length === 0) res.send("Empty Data!");

  // Converte a entrada em um QR code na forma de um Data URI (Uniform Resource Identifier) em formato PNG
  // Em caso de erro, armazena o erro na variável "err" e o exibe

  qr.toDataURL(url, (err, src) => {
      if (err) res.send("Error occured");

// Retorna a imagem do QR code como resposta e a define como a origem usada na página
      res.render("scan", { src });
  });
});


// Define a porta em que o servidor irá ouvir e exibe uma mensagem de que o servidor está rodando
const port = 5000;
app.listen(port, () => console.log("Server at 5000"));
