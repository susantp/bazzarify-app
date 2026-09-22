import { Text } from "@/components/design-system";

const PageTitle = ({ title }: { title: string }) => (
  <Text variant="displayCompact" color="primary">
    {title}
  </Text>
);

export default PageTitle;
