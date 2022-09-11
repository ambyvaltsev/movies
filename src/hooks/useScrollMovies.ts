import { useInView } from "react-intersection-observer";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

export function useScrollMovies<T extends { items?: any}, K extends { page: number }, U>(
  data: T,
  page: number,
  pages: number,
  setParams: Dispatch<SetStateAction<K>>
): {ref: any, movies: U[]} {
  const { ref, inView, entry } = useInView();

  const [movies, setMovies] = useState<any>([]);

  useEffect(() => {
    if (data && entry?.isIntersecting && page < pages) {
      console.log('77777')
      setParams((params) => ({ ...params, page: params.page + 1 }));
    }
  }, [inView]);

  useEffect(() => {
    if (page === 1) {
      data?.items && setMovies([...data?.items]);
    } else {
      data?.items && setMovies((prev: any) => [...prev, ...data?.items!]);
    }
  }, [data]);


  return { ref, movies };
}
