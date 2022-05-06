const express = require('express');
var cors = require('cors');
const crypto = require('crypto');

const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const menu = require('./static/menu-data.json');
const gqlSchema = require('./static/gql-schema');

const port = 3000;
const app = express();

const genID = () => {
    return crypto.randomBytes(5).toString('hex');
};

const genDish = ({name, price}) => {
    return {
        id: genID(),
        name: name,
        price: price,
    };
};

app.use(cors());

app.get('/api/v1/menu', (req, res) => {
    res.json(menu);
});

var root = {
    menu: () => menu,
    addStarter: (name, price) => {
        let dish = genDish(name, price);
        menu.starters.push(dish);
        return dish.id;
    },
    addMain: (name, price) => {
        let dish = genDish(name, price);
        menu.mains.push(dish);
        return dish.id;
    },
    addDessert: (name, price) => {
        let dish = genDish(name, price);
        menu.desserts.push(dish);
        return dish.id;
    },
};

app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(gqlSchema),
        rootValue: root,
        graphiql: true,
    })
);

app.listen(port, () => {
    console.log(`The API server is running at http://localhost:${port}/api`);
    console.log(`The GraphQL server is running at http://localhost:${port}/graphql`);
});
