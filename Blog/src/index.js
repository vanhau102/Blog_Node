const path = require('path');
const { engine } = require('express-handlebars');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { log } = require('console');
const port = 3000;

const router = require('./router');
const db = require('./config/db');

//Connect to DB
db.connect();

//Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(morgan('combined'));

app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','views'));
// app.set('views', path.join(__dirname, 'resources\\views'));

// Router init
router(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
