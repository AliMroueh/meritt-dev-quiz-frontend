import { gql } from "@apollo/client";


// GraphQL Mutation
export const CREATE_CONTACTUS = gql`
  mutation CreateContactus($input: ContactUsCreateInput!) {
    createContactus(input: $input) {
      item {
        _id
        full_name
        phone_number
        subject
        body
      }
      error {
        field
        message
      }
    }
  }
`;