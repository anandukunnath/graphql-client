import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
query GetMovies {
    getMovies {
      _id
      rating
      title
      year
    }
  }
`;

export const useGetAll = () => {
  const { error, data, loading } = useQuery(GET_MOVIES);

  return {
    error,
    data,
    loading,
  };
};
