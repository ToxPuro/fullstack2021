import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query allBooksByGenre($genre: String){allBooks(genre: $genre){title genres author{name} id published }}`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author{
      name
    }
    published
    id
    genres
  }
}
`

export const ALL_AUTHORS = gql`
  query{
    allAuthors {
      name
      born
      bookCount
      id
    }
  }`

export const UPDATE_BIRTHYEAR = gql`
mutation editBirtYear($name: String!, $birthyear: Int!) {
  editAuthor( name: $name, setBornTo: $birthyear) {
  name
  born
  bookCount
  id
  }
}
`

export const ME = gql`
query{
  me{favoriteGenre}
}`