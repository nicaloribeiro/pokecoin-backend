const app = require('./config/express');
const port = app.get('port');

const database = require('./config/mongodb');

try {
    database.mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
      console.log('Conectado ao MongoDB!');
  });
} catch (error) {
    console.log('Houve um problema ao conectar ao mongodb.')
    console.log(error)
};

const dbhandler = database.mongoose.connection
dbhandler.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));

app.get('/api/helloworld', function(req, res) {
    res.status(200).json({data: 'hello world'});
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} !`);
});