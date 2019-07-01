const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');


app.use(cors());
mongoose.connect('mongodb://localhost:27017/graphql');
mongoose.connection.once('open', ()=> {
  console.log('connected to mongo db')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.listen(4000, () => {
    console.log(`Listening on port 4000`)
})