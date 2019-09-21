var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.set('views','./views');

app.use('/store', function (req, res, next) {
    console.log('Jestem pośrednikiem dla endpointu \'/store\'');
    next();
});

app.get('/', function(req, res) {
    console.log('To jest homesite -> console');
    res.send('To jest homesite (web browser)');    
});

app.get('/first-template', function(req, res) {
    res.render('first-template', {
        name: "Carribean Queen",
        url: "http://carribeanqueen.nl",
        user: {
            name: 'Johnny',
            age: 20
        },
        mail: 'info@zebra.nl'
    });
});

app.get('/auth/google',function(req, res) {
    res.render('google-login');
})

app.get('/auth/google/logged',function(req, res) {
    res.render('google-logged', {
        user: {
            f_name: req.query.first_name,
            l_name: req.query.last_name
        }
    });
});

app.get('/store', function(req, res) {
    console.log('To jest SKLEP -> console');
    res.send('To jest SKLEP (web browser)'); 
});

var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.use(function(req, res, next) {
    res.status(404).send('Very Fatal Error (code: ' + res.statusCode + '), everything gone very bad');
});
