const express = require('express');
const html_routes = require('./routes/htmlRoutes')
const api_routes = require('./routes/apiRoutes')
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(html_routes)
app.use(api_routes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});