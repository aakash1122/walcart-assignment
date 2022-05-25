import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query ($pagination: PaginationInput) {
    getCategories(pagination: $pagination) {
      result {
        count
        categories {
          createdAt
          inActiveNote
          isActive
          name
          parent {
            uid
            name
          }
          parents {
            uid
            name
          }
          uid
          updatedAt
        }
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation ($category: CategoryCreateInput!) {
    createCategory(category: $category) {
      message
      statusCode
      result {
        uid
        name
        parent {
          uid
          name
        }
        parents {
          uid
          name
        }
        isActive
        inActiveNote
        createdAt
        updatedAt
      }
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation ($categoryUid: String!, $category: updateCategoryCreateInput!) {
    updateCategory(categoryUid: $categoryUid, category: $category) {
      message
      statusCode
      result {
        uid
        name
        parent {
          uid
          name
        }
        parents {
          uid
          name
        }
        isActive
        inActiveNote
        createdAt
        updatedAt
      }
    }
  }
`;
