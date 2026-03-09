import RequestPasswordResetScreen from "@/modules/auth/screens/RequestPasswordResetScreen";
import PublicAuthEntryBoundary from "@/modules/auth/components/PublicAuthEntryBoundary";

export default function PublicRequestPasswordResetPage() {
  return (
    <PublicAuthEntryBoundary>
      <RequestPasswordResetScreen />
    </PublicAuthEntryBoundary>
  );
}
