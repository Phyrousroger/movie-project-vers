// import { useStyle } from "@/styles/UseStyles";
import { Flex, Box, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import { useStyle } from "../../styles/UseStyles";

interface skeletonprops {
  style: boolean;
}

const Skelton: FC<skeletonprops> = ({ style }) => {
  const { classes } = useStyle();
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  return (
    <Flex
      style={{
        flexFlow: "row wrap",
      }}
      w={"100%"}
      gap={20}
      justify={"start"}
    >
      <Box w={isSmallerThanTable ? "100%" : "30%"}>
        <Skeleton
          className={classes.sketon}
          w={style ? "100%" : 300}
          h={style ? 500 : 400}
        />
      </Box>
      <Box w={isSmallerThanTable ? "100%" : "65%"}>
        <Skeleton h={30} className={classes.sketon} w="70%" radius="xl" />
        <Skeleton h={30} mt={6} className={classes.sketon} radius="xl" />
        {style && (
          <Flex gap={20} mt={20}>
            <Skeleton
              h={20}
              w={"10%"}
              mt={6}
              className={classes.sketon}
              radius="xl"
            />
            <Skeleton
              h={20}
              w={"10%"}
              mt={6}
              className={classes.sketon}
              radius="xl"
            />
          </Flex>
        )}
        <Box mt={30}>
          <Skeleton
            h={30}
            w={"30%"}
            mb={10}
            className={classes.sketon}
            radius="xl"
          />
          <Skeleton h={100} className={classes.sketon} radius="lg" />
        </Box>
        <Box mt={30}>
          <Skeleton
            h={30}
            w={"50%"}
            mb={10}
            className={classes.sketon}
            radius="xl"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default Skelton;
