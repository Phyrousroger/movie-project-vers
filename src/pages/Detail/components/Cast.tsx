import { CastType } from "../../../types/MovieDetail/Credits";
import { FC } from "react";
import { Card, Container, Skeleton, Title, Text } from "@mantine/core";
import useHomeStore from "../../../store/movieslice";
import Avator from "../../../assets/avatar.png";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useStyle } from "../../../styles/UseStyles";

interface CastProps {
  cast?: CastType[];
  loading: boolean;
}

const Cast: FC<CastProps> = ({ cast, loading }) => {
  const { classes } = useStyle();
  const url = useHomeStore((state) => state.url);
  const navigate = useNavigate();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");

  return (
    <Container
      size={"lg"}
      style={{
        position: "relative",
        zIndex: 9,
      }}
      my={20}
    >
      {cast && cast?.length > 0 && (
        <Title my={20} size={20}>
          Top Cast
        </Title>
      )}
      <Carousel
        slidesToScroll={5}
        slideSize={isSmallerThanTable ? "40%" : "20%"}
        slideGap="md"
        withControls={false}
        align="start"
      >
        {cast?.map((actor, index) => {
          const actorUrl = actor.profile_path
            ? url.profile + actor.profile_path
            : Avator;

          return (
            <Carousel.Slide key={index}>
              <Card
                h={300}
                p={0}
                style={{ cursor: "pointer", position: "relative" }}
                onClick={() => navigate(`/cast/${actor.id}`)}
              >
                {loading ? (
                  <Skeleton height={300} className={classes.sketon} />
                ) : (
                  <img
                    width={"100%"}
                    height={"100%"}
                    src={actorUrl}
                    alt="cast-image"
                  />
                )}
              </Card>

              <Text my={10} align="center" size={20} fw={700}>
                {actor.name}
              </Text>
              <Text align="center" fw={500} opacity={0.7}>
                {actor.character}
              </Text>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default Cast;
