import { Text } from "react-native";

const PageTitle = ({ title }: { title: string }) => (
  <Text className="text-3xl font-bold text-primary">{title}</Text>
);

export default PageTitle;
