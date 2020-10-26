require('./server/db');

const express = require('express');
const morgan = require('morgan');
const app = require('express')();
const path = require('path');
const logger = require('./server/lib/logger');

//  BodyParser Middleware
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));

//  Use Routes
app.use('/api/reply', require('./server/routes/reply'));
app.use('/api/tickets', require('./server/routes/tickets'));
app.use('/api/answer', require('./server/routes/answer'));
app.use('/api/users', require('./server/routes/users'));
app.use('/api/projects', require('./server/routes/projects'));
app.use('/api/auth', require('./server/routes/auth'));

//  Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
