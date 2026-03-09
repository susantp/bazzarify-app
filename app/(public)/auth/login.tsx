import LoginScreen from "@/modules/auth/screens/LoginScreen";
import PublicAuthEntryBoundary from "@/modules/auth/components/PublicAuthEntryBoundary";

export default function PublicLoginPage() {
  return (
    <PublicAuthEntryBoundary>
      <LoginScreen />
    </PublicAuthEntryBoundary>
  );
}
