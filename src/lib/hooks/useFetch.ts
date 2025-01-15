import useSWR from 'swr';
import axios from 'axios';

const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

const useFetch = <T>(filter: string) => {
  const { data, error, isLoading } = useSWR<T>(
    `${process.env.NEXT_PUBLIC_APP_URL}${filter}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isError: error,
    isLoading: isLoading || !data,
  };
};

export default useFetch;
