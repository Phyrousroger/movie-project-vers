import React from "react";
import { Carousel } from "@mantine/carousel";
import { Skeleton, Title } from "@mantine/core";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import MovieCard from "../MovieCard/MovieCard";
import { resultType } from "../../types/MovieType/movietype";
import { useStyle } from "../../styles/UseStyles";

interface CarouselProps {
  title?: string;
  data?: resultType[];
  loading: boolean;
  endpoint?: string | string[];
}

const CarouselComponent: React.FC<CarouselProps> = ({
  title,
  data,
  loading,
  endpoint,
}) => {
  const isSmallerThanTable = window.innerWidth < 768;
  const { classes } = useStyle();

  const hasData = data && data !== undefined && data?.length > 0;
  if (loading) {
    return (
      <Carousel
        my={20}
        slideSize={isSmallerThanTable ? "30%" : "20%"}
        slideGap={"lg"}
        loop
        align="start"
        classNames={classes}
        slidesToScroll={2}
        nextControlIcon={<BsFillArrowRightCircleFill size={30} color="#000" />}
        previousControlIcon={
          <BsFillArrowLeftCircleFill size={30} color="#000" />
        }
      >
        {[1, 2, 3, 4, 5]?.map((trend) => (
          <Carousel.Slide key={trend}>
            <Skeleton h={300} w={200} className={classes.sketon} />
            <Skeleton mt={20} h={20} w={"90%"} className={classes.sketon} />
            <Skeleton mt={20} h={20} w={"50%"} className={classes.sketon} />
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  }

  if (hasData)
    return (
      <>
        <Title fw={500} size={20}>
          {title}
        </Title>
        <Carousel
          my={20}
          slideSize={isSmallerThanTable ? "30%" : "20%"}
          slideGap={"lg"}
          loop
          align="start"
          withControls={data?.length > 5 ? true : false}
          slidesToScroll={2}
          classNames={classes}
          nextControlIcon={
            <BsFillArrowRightCircleFill size={30} color="#000" />
          }
          previousControlIcon={
            <BsFillArrowLeftCircleFill size={30} color="#000" />
          }
        >
          {data?.map((trend) => {
            if (trend.id) {
              return (
                <Carousel.Slide key={trend.id}>
                  <MovieCard
                    explore={trend}
                    mediatype={trend.media_type || endpoint}
                  />
                </Carousel.Slide>
              );
            }
          })}
        </Carousel>
      </>
    );
};

export default CarouselComponent;
