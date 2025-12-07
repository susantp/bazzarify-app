import { Text } from "react-native";

const PageTitle = ({ title }: { title: string }) => (
  <Text className="text-primary text-3xl font-bold">{title}</Text>
);

export default PageTitle;
