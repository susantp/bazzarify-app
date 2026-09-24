import { EmptyState } from "@/components/design-system/feedback/empty-state";
import { ErrorState } from "@/components/design-system/feedback/error-state";

type EmptyFeedbackProps = {
  kind: "empty";
  title: string;
  description?: string;
};

type ErrorFeedbackProps = {
  kind: "error";
  title: string;
  description: string;
  retryLabel: string;
  onRetry: () => void;
};

type VendorProductGridFeedbackProps = EmptyFeedbackProps | ErrorFeedbackProps;

export function VendorProductGridFeedback(
  props: VendorProductGridFeedbackProps,
) {
  if (props.kind === "empty") {
    return (
      <EmptyState
        title={props.title}
        description={props.description}
        testID="vendor-product-grid-empty"
      />
    );
  }

  return (
    <ErrorState
      title={props.title}
      description={props.description}
      action={{ label: props.retryLabel, onPress: props.onRetry }}
      testID="vendor-product-grid-error"
    />
  );
}
