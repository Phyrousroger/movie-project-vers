// import { resultType } from "@/types/MovieType/movietype";
import { Card, Text } from "@mantine/core";
import dayjs from "dayjs";
// import PosterFallback from "@/assets/no-poster.png";
import PosterFallback from "../../assets/no-poster.png"
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../Circular/CircularProgress";
import useHomeStore from "../../store/movieslice";
import { resultType } from "../../types/MovieType/movietype";
// import useHomeStore from "@/store/movieslice";

interface exploreProps {
  mediatype?: string | string[];
  explore: resultType;
}

const MovieCard: FC<exploreProps> = ({ explore, mediatype }) => {
  const { url } = useHomeStore();
  const navigate = useNavigate();
  const postUrl = explore.poster_path
    ? url.poster + explore.poster_path
    : PosterFallback;

  return (
    <div>
      <Card
        h={300}
        w={200}
        p={0}
        color="red"
        style={{ cursor: "pointer", position: "relative" }}
        onClick={() => navigate(`/${mediatype}/${explore.id}`)}
      >
        <img width={"100%"} height={"100%"} src={postUrl} alt="movie-list" />
      </Card>
      <div className="circular-progress-movie">
        <CircularProgress rating={explore.vote_average.toFixed(1)} />
      </div>
      <Text fw={700} size={18}>
        {explore.title?.substring(0, 20) || explore.name?.substring(0, 20)}...
      </Text>
      <Text>{dayjs(explore.release_date).format("D-MM-YYYY")}</Text>
    </div>
  );
};

export default MovieCard;
