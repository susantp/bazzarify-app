import { Text } from "react-native";

const PageTitle = ({ title }: { title: string }) => (
  <Text className="text-3xl font-bold text-orange-600">{title}</Text>
);

export default PageTitle;
