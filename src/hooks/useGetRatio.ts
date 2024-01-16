import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (path: string) => fetch(path).then((res) => res.json());

const useGetRatio = () => {
  const { data, error } = useSWR("/api/ratio", fetcher);

  return {
    data,
    error,
  };
};

export default useGetRatio;
