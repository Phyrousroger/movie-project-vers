import {
  Box,
  Card,
  Container,
  Flex,
  Title,
  Text,
  Divider,
} from "@mantine/core";
import PosterFallBack from "../../../assets/no-poster.png";
import useHomeStore from "../../../store/movieslice";
import { CastBio } from "../../../types/CastType/CastBio";
import { FC, useState } from "react";
import InfoData from "../../../components/InfoData/InfoData";
import dayjs from "dayjs";
import Skelton from "../../../components/Skeleton/Skeleton";

interface CastBioProps {
  castBio?: CastBio;
  loading: boolean;
}

const CastDetailbanner: FC<CastBioProps> = ({ castBio, loading }) => {
  const { url } = useHomeStore();
  const [fullBiography, setFullBiography] = useState<boolean>(false);

  return (
    <Container my={20} size={"lg"}>
      {!loading ? (
        <Flex
          gap={20}
          justify={"space-between"}
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          <Box w={"30%"}>
            <Card
              p={0}
              style={{
                width: 300,
                height: 400,
              }}
            >
              <img
                width={"100%"}
                height={"100%"}
                src={
                  castBio?.profile_path
                    ? url.profile + castBio.profile_path
                    : PosterFallBack
                }
                alt="cast image"
              />
            </Card>
          </Box>
          <Box w={"70%"}>
            <Flex
              direction={"column"}
              gap={10}
              sx={{
                position: "relative",
              }}
            >
              <Title color="white">{castBio?.name}</Title>
              <Title mt={20} size={25}>
                BioGraphy
              </Title>

              <Text fw={500} size={18} color="white">
                {fullBiography
                  ? castBio?.biography
                  : castBio?.biography.substring(0, 700)}

                {castBio?.biography && castBio?.biography.length > 1000 && (
                  <span
                    style={{
                      fontWeight: 500,
                      marginLeft: 20,
                      cursor: "pointer",
                      color: "gray",
                    }}
                    onClick={() => setFullBiography(!fullBiography)}
                  >
                    See {fullBiography ? "Less" : "More"}
                  </span>
                )}
              </Text>
              <Box>
                <Flex gap={20} mt={20}>
                  {castBio?.birthday && (
                    <InfoData
                      label={"Born"}
                      value={[dayjs(castBio.birthday).format("MMM-D-YYYY")]}
                    />
                  )}
                  {castBio?.place_of_birth && (
                    <InfoData
                      label={"Birth-Place"}
                      value={[castBio.place_of_birth]}
                    />
                  )}
                </Flex>
                <Divider />
                {castBio?.deathday && (
                  <>
                    <Flex gap={20} mt={20}>
                      <InfoData label={"died"} value={[castBio.deathday]} />
                    </Flex>
                    <Divider />
                  </>
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Skelton style={false} />
      )}
    </Container>
  );
};

export default CastDetailbanner;
