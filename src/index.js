const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const translate = require('translate-google');
app.use(bodyParser.json());
app.use(cors());

// Configuración CORS para Express
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Puedes ajustar esto según tus necesidades
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


// rutas
app.get('/',(req,res)=>{
    res.send('hola !')
})
app.post('/translate',  (req,res)=>{
    const {texto,origen,destino}= req.body;

    translate(texto, {from: `${origen}`, to: `${destino}`})
    .then((result) => {
        res.status(200).json(result)
        
    }).catch((err) => {
        res.status(500).json(err)
        
    });

})


app.listen(port,()=>{
    console.log("Server is running at port:" + port);
})