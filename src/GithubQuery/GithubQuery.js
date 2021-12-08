import gql from 'graphql-tag';

export const SearchUsersQuery = gql`
  query SearchUsers(
    $query: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    search(
      type: USER
      query: $query
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      userCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ... on User {
            name
            email
            bio
            login
            avatarUrl
            location
            url
          }
        }
      }
    }
  }
`;

export const SearchReposQuery = gql`
  query SearchRepos($query: String!, $first: Int) {
    search(type: REPOSITORY, query: $query, first: $first) {
      repositoryCount
      userCount
      wikiCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ... on Repository {
            databaseId
            id
            name
            description
            forkCount
            isFork
            nameWithOwner
            watchers {
              totalCount
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;
export const SearchIssueQuery = gql`
  query SearchIssue($query: String!, $first: Int) {
    search(first: $first, type: ISSUE, query: $query) {
      issueCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Issue {
            createdAt
            title
            url
            author {
              login
            }
          }
        }
      }
    }
  }
`;
