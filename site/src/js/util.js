export const graphql = (query, variables = {}) => {
  return fetch(process.env.KEYSTONE_API, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      variables,
      query
    })
  })
    .then(result => result.json())
    .catch(error => console.log(error));
};
export const getAuthenticatedUser = () =>
  graphql(`
    {
      authenticatedUser {
        id
        name
        bookmarks {
          id
          path
          name
        }
      }
    }
  `).then(result => {
    if (result && result.data) {
      const {
        data: { authenticatedUser }
      } = result;
      return authenticatedUser;
    }
    return false;
  });

export const validateInputs = fields =>
  fields.every(field => field.value !== "");
export const fetchData = (query, data) => {
  return graphql(query, data).then(({ data }) => {
    if (data) {
      if (data.allPages) {
        return data.allPages[0] || {};
      } else if (data.allComments) {
        return { comments: data.allComments };
      } else if (data.addComment) {
        return data.addComment;
      } else if (data.clap) {
        return data.clap;
      }
      // unknown data
      return data;
    }
    return {};
  });
};
