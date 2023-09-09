const { buildSchema } = require('graphql');


// ! means required
module.exports = buildSchema(`

    type User {
      id: ID!
      email: String!
    }

    input UserInputData {
      email: String!
      password: String!
    }

    type Mutation {
      createUser(userInput: UserInputData): User!
    }

    type Query {
      hello: String
    }

    schema {
      query: Query
      mutation: Mutation
    }
`);

// {
//     "query": "{ hello { text views } }"
// }

// // ! means required
// module.exports = buildSchema(`

//     type TestData {
//         text: String!
//         views: Int!
//     }

//     type Query {
//         hello: TestData!
//     }

//     schema {
//         query: Query
//     }
// `);