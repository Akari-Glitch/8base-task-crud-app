import { gql } from '@apollo/client';

/**
 * Query the current task details
 */
export const GET_TASK_DATA = gql`
  query MyQuery {
    tasksList {
      items {
        title
        text
        id
        completed
      }
    }
  }
`;

/**
 * Query the current users details.
 */
export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;

/**
 * Sign up a new user mutation.
 */
export const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
      lastName
      firstName
    }
  }
`;

export const CHECKED_TASK_MUTATION = gql`
  mutation TaskUpdate($id: ID!, $completed: Boolean!) {
    taskUpdate(filter: { id: $id }, data: { completed: $completed }) {
      id
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation TaskUpdate($id: ID!, $title: String!, $text: String!) {
    taskUpdate(filter: { id: $id }, data: { title: $title, text: $text }) {
      id
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation TaskDelete($id: ID!) {
    taskDelete(filter: { id: $id }) {
      success
    }
  }
`;
