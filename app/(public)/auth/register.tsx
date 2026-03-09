import RegisterScreen from "@/modules/auth/screens/RegisterScreen";
import PublicAuthEntryBoundary from "@/modules/auth/components/PublicAuthEntryBoundary";

export default function PublicRegisterPage() {
  return (
    <PublicAuthEntryBoundary>
      <RegisterScreen />
    </PublicAuthEntryBoundary>
  );
}
