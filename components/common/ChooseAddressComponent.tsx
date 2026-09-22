import { Box, Button, Text } from "@/components/design-system";
import React from "react";

const ChooseAddressComponent = () => (
  <Box direction="column" gap="xl">
    <Text variant="bodyMedium">Choose your delivery location.</Text>
    <Text variant="body">
      Select a delivery location to see product availability and delivery
      options.
    </Text>
    <Button label="Sign in to see your address" size="lg" />
  </Box>
);

export default ChooseAddressComponent;
