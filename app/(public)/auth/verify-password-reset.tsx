import VerifyPasswordResetScreen from "@/modules/auth/screens/VerifyPasswordResetScreen";
import PublicAuthEntryBoundary from "@/modules/auth/components/PublicAuthEntryBoundary";

export default function PublicVerifyPasswordResetPage() {
  return (
    <PublicAuthEntryBoundary>
      <VerifyPasswordResetScreen />
    </PublicAuthEntryBoundary>
  );
}
