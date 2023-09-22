function graphqlMiddleware(req, res, next) {
  return graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true, // web ide

    // // format error for graphql
    // formatError(error) {
    //     if(!error.originalError) { // means if not error during runtime
    //         return error;
    //     }
    //     const data = error.originalError.data;
    //     const message = error.message || 'Something wrong happens';
    //     const statusCode = error.originalError.code || 500;
    //     return { message: message, statusCode: statusCode, data: data };
    // }
  });
}


module.exports = { graphqlMiddleware };