const express = require('express');
//const express = require('./routes');

const app = express();

app.use(express.json());

//app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
