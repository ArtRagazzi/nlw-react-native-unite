import { View, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input } from "@/components/input";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

import { Link, router } from "expo-router";
import { useState } from "react";

export default function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    function handleAccessCredential() {
        if (!name.trim()) {
            return Alert.alert("Nome inválido", "Informe o seu nome!")
        }
        if (!email.trim()) {
            return Alert.alert("E-mail inválido", "Informe o seu e-mail!")
        }
        router.push("/ticket")
    }

    return (
        <View className={`flex-1 bg-green-950 justify-center items-center`}>
            <StatusBar style="light" />
            <Image
                source={require("@/assets/logo.png")}
                className="h-16"
                resizeMode="contain"
            />

            <View className="w-full mt-12 gap-3 p-6">
                <Input>
                    <FontAwesome
                        name="user-circle"
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field placeholder="Nome Completo" onChangeText={(value) => {
                        setName(value)
                    }} />
                </Input>

                <Input>
                    <MaterialIcons
                        name="alternate-email"
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field placeholder="E-mail" keyboardType="email-address" onChangeText={(value) => {
                        setEmail(value)
                    }} />
                </Input>

                <Button title="Realizar Inscrição" onPress={handleAccessCredential} />
                <Link
                    href={"/"}
                    className="text-gray-100 text-base font-bold text-center mt-8"
                >
                    Já possui ingresso?
                </Link>
            </View>
        </View>
    );
}
