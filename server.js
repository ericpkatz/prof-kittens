const express = require('express');
const path = require('path');

const app = express();

const staticMiddleware = express.static(path.join(__dirname, 'public'));

app.use(staticMiddleware);



const kittens = [
  {
    id: 1,
    name: 'socks',
    description: 'This was the Clintons kitten'
  },
  {
    id: 3,
    name: 'felix',
    description: 'Felix is a curious kitten'
  },
  {
    id: 5,
    name: 'Garfield',
    description: 'The cat not the president'
  },
];

const logger = (req, res, next)=> {
  console.log(req.url);
  next();
};

app.use(logger);

app.get('/', (req, res, next)=> {
  res.send('<h1>Welcome</h1>');
});

app.get('/puppies', (req, res, next)=> {
  res.send('<h1>Welcome to Puppies</h1>');
});

app.get('/kittens', (req, res, next)=> {
  res.send(`
    <html>
      <head>
        <title>Kittens</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <h1>Kittens</h1>
        <ul>
        ${
          kittens.map( kitten => {
            return `
              <li>
                <a href='/kittens/${kitten.id}'>
                ${ kitten.name }
                </a>
              </li>
            `;
          }).join('')
        }
        </ul>
      </body>
    </html>
  `);
});

app.get('/kittens/:id', (req, res )=> {
  const kitten = kittens.find(kitten => kitten.id === req.params.id*1);
  res.send(`<html>
      <head>
        <title>Kitten</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
      <a href='/kittens'>Back to kittens</a>
      <h1>${ kitten.name }</h1>
      <p>${ kitten.description }</p>
      </body>
    </html>
  `);
});

app.listen(3000, ()=> console.log('listening on port 3000'));

