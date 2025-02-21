import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { TextInput, View, TextInputProps } from "react-native";

function Input({ children }: { children: ReactNode }) {
  return (
    <View className="w-full h-18 flex-row items-center p-3 gap-3 border border-green-900 rounded-lg">
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-white text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
