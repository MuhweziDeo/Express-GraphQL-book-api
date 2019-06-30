const graphql = require('graphql');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema, 
    GraphQLInt,
    GraphQLList
     } = graphql;

const books = [
    {name:'ddd', id:1, authorId: "1"},
    {name:'dee', id:2, authorId: "2"},
    {name:'mee', id:3, authorId: "1"},
]
const authors = [
    {name:'ddd', id:1, age: 33, authorId: "1"},
    {name:'dee', id:2, age: 33, authorId: "2"},
    {name:'mee', id:3, age: 33, authorId: "3"},
]

const BookType =  new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // get nested data
                return authors.filter(author => 
                        author.id == parent.authorId)[0];

            }
        }
    })
});

const AuthorType =  new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                return books.filter(book => book.authorId == parent.id)
            }
        }
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
        },
        books:{
            type: new GraphQLList(BookType),
            resolve() {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});