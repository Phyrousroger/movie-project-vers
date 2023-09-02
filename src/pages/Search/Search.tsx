import { Box, Container, Flex, Loader, Pagination, Title } from "@mantine/core";
import Layout from "../../layout/Layout";
import { useQuery } from "react-query";
import fetchDataFromApi from "../../api";
import { useParams } from "react-router-dom";
import { movieType } from "../../types/MovieType/movietype";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useState } from "react";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const { query } = useParams();
  const { data: Searchdata, isLoading } = useQuery<movieType>({
    queryKey: ["search-data", query, page],
    queryFn: () => fetchDataFromApi(`search/multi?query=${query}&page=${page}`),
  });
  console.log(Searchdata);
  if (isLoading) {
    console.log("hello");
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Layout>
      <Container size={"lg"}>
        <Flex my={20}>
          <Title size={20}>Search Result :{query}</Title>
        </Flex>
        {isLoading ? (
          <Flex h="100vh" justify="center" align="center">
            <Loader />
          </Flex>
        ) : (
          <Flex
            justify="center"
            my={30}
            style={{
              flexFlow: "row wrap",
              justifyContent: "start",
            }}
            w="100%"
          >
            {Searchdata?.results?.map((explore, index) => {
              if (explore.media_type === "person") return;
              return (
                <Box key={index} w={"20%"} my={20}>
                  <MovieCard
                    explore={explore}
                    mediatype={explore?.media_type}
                  />
                </Box>
              );
            })}
          </Flex>
        )}
        <Flex justify="end" my={20}>
          <Pagination
            total={Searchdata?.total_pages || 0}
            value={page}
            onChange={handlePageChange}
            position="center"
            styles={() => ({
              control: {
                "&[data-active]": {
                  background: "#173d77",
                  border: 0,
                },
              },
            })}
          />
        </Flex>
      </Container>
    </Layout>
  );
};

export default Search;
