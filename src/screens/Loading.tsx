import { Grid, Spinner } from "@chakra-ui/react";

import Seo from "../components/Seo";

export default function Loading() {
  return (
    <Seo title="Loading - Games">
      <Grid
        placeItems="center"
        w="full"
        h="100vh"
        bgColor="black"
        color="white"
      >
        <Spinner size="xl" />
      </Grid>
    </Seo>
  );
}
