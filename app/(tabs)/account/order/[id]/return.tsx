import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";

// Define type for reasons
type Reason = {
  id: string;
  label: string;
};

type FormData = {
  return_reasons: Reason[];
  returning_reason_detail?: string; // Optional, only sent if "Other" is selected
};

const reasonsList: Reason[] = [
  { id: "change-mind", label: "I Changed My Mind" },
  { id: "damaged", label: "Product Is Damaged" },
  { id: "wrong-parcel", label: "I Got Wrong Parcel" },
  { id: "others", label: "Other" },
];

const ReturnForm: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      return_reasons: [],
      returning_reason_detail: "",
    },
  });

  const selectedReasons = watch("return_reasons");
  const isOtherSelected = selectedReasons.some((r) => r.id === "others");

  const onSubmit = async (data: FormData) => {
    if (data.return_reasons.length < 1) {
      alert("Please provide a reason");
      return;
    }
    // If "Other" is selected but no text is provided, remove it from submission
    if (isOtherSelected && !data.returning_reason_detail?.trim()) {
      alert("Please provide a reason for 'Other'.");
      return;
    }

    alert("Your order return request has been submitted.");
    // Uncomment when API is ready:
    // try {
    //   const response = await fetch("https://api.example.com/returns", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //
    //   if (response.ok) {
    //     alert("Return request submitted successfully!");
    //   } else {
    //     alert("Failed to submit return request.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting return request:", error);
    //   alert("An error occurred. Please try again.");
    // }
  };

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Return" />
      <ContentWrapper className="p-6">
        <View className="flex-col gap-y-2">
          {reasonsList.map((reason) => (
            <Controller
              key={reason.id}
              control={control}
              name="return_reasons"
              render={({ field }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Checkbox
                    value={field.value.some((r) => r.id === reason.id)}
                    onValueChange={(isChecked) => {
                      const updatedReasons = isChecked
                        ? [...field.value, reason] // Add reason
                        : field.value.filter((r) => r.id !== reason.id); // Remove reason
                      setValue("return_reasons", updatedReasons);
                    }}
                  />
                  <Text style={{ marginLeft: 8 }}>{reason.label}</Text>
                </View>
              )}
            />
          ))}

          {isOtherSelected && (
            <Controller
              control={control}
              name="returning_reason_detail"
              render={({ field }) => (
                <TextInput
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 10,
                    paddingHorizontal: 8,
                  }}
                  placeholder="Please specify your reason"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          )}

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
};

export default ReturnForm;
