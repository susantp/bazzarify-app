import { Box, Icon, Image, Text } from "@/components/design-system";
import { UserEditIcon } from "@/components/common/icons";
import { Link } from "expo-router";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  user: TUser | null;
}
const ProfileInfo = ({ user }: Props) => {
  return (
    <Box
      direction="row"
      align="center"
      gap="xs"
      paddingY="lg"
      style={styles.container}
    >
      <Box align="center" justify="center" style={styles.avatarColumn}>
        <Image
          source={require("@/assets/images/profile.png")}
          size={128}
          radius="none"
        />
      </Box>
      <Box direction="column" gap="sm" style={styles.detailsColumn}>
        <Text variant="bodyMedium">{user?.name || "User User"}</Text>
        <Box direction="row" align="center" gap="xs">
          <Icon size={20} color="primary">
            {({ color, size }) => (
              <Ionicons name="checkmark-circle" size={size} color={color} />
            )}
          </Icon>
          <Text variant="caption">Verified</Text>
        </Box>
        <Text variant="caption">0 WishList </Text>
        <Text variant="caption">2 Stores Followed </Text>
      </Box>
      <Box align="flex-end" style={styles.editColumn}>
        <Link href="/account/editProfile">
          <UserEditIcon />
        </Link>
      </Box>
    </Box>
  );
};

const styles = {
  container: { width: "100%" as const },
  avatarColumn: { flex: 1 / 3 },
  detailsColumn: { flex: 1 / 3 },
  editColumn: { flex: 1 / 4 },
};

export default ProfileInfo;
