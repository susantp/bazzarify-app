import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { FlatList } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { settingList } from "@/modules/account/data/settings/settingList";
import useSettingScreen from "@/modules/account/hooks/settings/useSettingScreen";
import { Button, PageContent } from "@/components/design-system";

const SettingScreen = () => {
  const { handleLogout, isLoggingOut, renderSettingItem } = useSettingScreen();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title={"Settings"} />
      <PageContent>
        <FlatList
          style={{ flex: 1 }}
          data={settingList}
          keyExtractor={(item) => item.id}
          renderItem={renderSettingItem}
        />
        <Button
          label={isLoggingOut ? "Logging out..." : "Log Out"}
          onPress={handleLogout}
          disabled={isLoggingOut}
          style={{ width: "100%", marginTop: 16 }}
        />
      </PageContent>
    </SafeAreaWrapper>
  );
};

export default SettingScreen;
