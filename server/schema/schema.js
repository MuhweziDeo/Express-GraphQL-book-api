const graphql = require('graphql');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema, 
    GraphQLInt
     } = graphql;

const books = [
    {name:'ddd', id:1},
    {name:'dee', id:2},
    {name:'mee', id:3},
]
const authors = [
    {name:'ddd', id:1, age: 33},
    {name:'dee', id:2, age: 33},
    {name:'mee', id:3, age: 33},
]

const BookType =  new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const AuthorType =  new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                // code to get data from database
                return books.filter((book) => book.id == args.id)[0];
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent,args) {
                return authors.filter((author) => author.id == args.id)[0];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});