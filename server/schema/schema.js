const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema, 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
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
                // return authors.filter(author => 
                //         author.id == parent.authorId)[0];
                return Author.findById(parent.authorId);

            }
        }
    })
});

const AuthorType =  new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                // return books.filter(book => book.authorId == parent.id)
                return Book.find({
                    authorId: parent.id
                });
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
           async resolve(parent, args) {
                const {name, age } = args;
                let author = new Author({
                    name,
                    age
                });
                await author.save();
                return author;
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: {type:GraphQLString},
                authorId: {type:GraphQLString},
                genre: {type: GraphQLString}

            },
            async resolve(parent, args) {
                const {name, authorId, genre} = args;
                let book = new Book({
                    name, authorId, genre
                })
                await book.save();
                return book;
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                // code to get data from database
                // return books.filter((book) => book.id == args.id)[0];
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent,args) {
                // return authors.filter((author) => author.id == args.id)[0];
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve() {
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return Author.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});