const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const JWT_SECRET='SUPER_SECRET_SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://ToukoPuro:QOk1OEwRDlTcuKL9@cluster0.9ftzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})



const typeDefs = gql`

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if(args.genre){
        return Book.find({ genres: args.genre}).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root,args,context) => context.currentUser
  },
  Author: {
    bookCount: (root) => {
      const id = mongoose.Types.ObjectId(root.id)
      return Book.collection.countDocuments({author:{$in:[id]}})
    } 
  },
  Mutation: {
    addBook: async (root,args, context) => {
      console.log('addBook')
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }
      let author = await Author.findOne({name: args.author})
      if(!author){
        author = new Author({name: args.author})
        await author.save()
      }
      const book = new Book({ ...args, author: author._id})
      try{
        if(!author){
          author = new Author({name: args.author})
          await author.save()
        }
        await book.save()
        await Book.populate(book, { path: 'author'})
      }catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }
      const author = await  Author.findOne({name: args.name})
      try{
        if(args.setBornTo) author.born = args.setBornTo
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async(root,args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {invalidArgs: args})
        })
    },
    login: async(root,args) => {
      console.log('login')
      const user = await User.findOne({ username: args.username })
      if(!user || args.password !=='salasana'){
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    console.log(auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})