import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      className="w-full - h-14 bg-orange-500 items-center justify-center rounded-lg"
      {...rest}>

      {isLoading ? (
        <ActivityIndicator className="text-green-00" />
      ) : (
        <Text className="text-green-900 text-base font-bold uppercase">
          {title}
        </Text>
      )}


    </TouchableOpacity>
  );
}
