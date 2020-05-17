const express = require('express');
const todoController = require('./controllers/todoController');
const app = express();

const port = process.env.PORT || 8000


//ejs template engine
app.set('view engine', 'ejs');


app.use(express.static('./public'))

todoController(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})