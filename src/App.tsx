import { useEffect, useRef } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";

import { Loading } from "./components/Loading";
import { AnimeList } from "./components/AnimeList";
import { GET_PAGE } from "./queries";
import { useIntersection } from "./hooks/useIntersection";

const App = () => {
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_PAGE, {
    notifyOnNetworkStatusChange: true,
  });

  const listEndRef = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersection(listEndRef, { rootMargin: "10%" });

  useEffect(() => {
    const currentPage = data?.Page?.pageInfo?.currentPage;
    const lastPage = data?.Page?.pageInfo?.lastPage;

    if (isIntersecting && currentPage && currentPage !== lastPage) {
      fetchMore({
        variables: { page: currentPage + 1 },

        updateQuery(previousQueryResult, options) {
          return {
            Page: {
              media: [
                ...(previousQueryResult.Page?.media || []),
                ...(options.fetchMoreResult.Page?.media || []),
              ],
              pageInfo: options?.fetchMoreResult?.Page?.pageInfo,
            },
          };
        },
      });
    }
  }, [data, fetchMore, isIntersecting]);

  return (
    <>
      <AnimeList data={data?.Page?.media} />
      <div ref={listEndRef} />

      {loading && (
        <Loading fullScreen={networkStatus !== NetworkStatus.fetchMore} />
      )}
    </>
  );
};

export default App;
