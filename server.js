const http = require('http');
const app = require('./app.js');
const path = require('path');
const express = require('express');
const app = express();
const userAPIRoute = require('./routes/api/User/user');
const eventAPIRoute = require('./routes/api/Events/Events');
const server = http.createServer(app);
const PORT = process.env.PORT;

require('./db/mongoose');
//parse json from request body
app.use(express.json());
//parse x-form-urlencoded-data
app.use(express.urlencoded({ extended: true }));
//use express router with api routes
app.use('/api/user', userAPIRoute);
app.use('/api/events', eventAPIRoute);

server.listen(PORT, () => {
	console.log(`Server Up and running on port ${PORT}`);
});
//serve static assest in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, '/client/build', 'index.html'));
	});
}
module.exports = app;