const app = require('./config/express');
const port = app.get('port');

app.get('/api/helloworld', function(req, res) {
    res.status(200).json({data: 'hello world'});
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} !`);
});