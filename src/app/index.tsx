import { View, Image, Alert } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Input } from "@/components/input";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

import { Link, Redirect } from "expo-router";

import { api } from "@/server/api"
import { useBadgeStore } from "@/store/badge-store"


export default function Home() {

    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const badgeStore = useBadgeStore()

    async function handleAccessCredential() {

        try {
            if (!code.trim()) {
                return Alert.alert("Ingresso", "Informe o código do ingresso!")
            }
            setIsLoading(true)

            const { data } = await api.get(`/attendees/${code}/badge`)
            badgeStore.save(data.badge)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            Alert.alert("Ingresso", "Ingresso não encontrado!")
        }
    }

    if(badgeStore.data?.checkInURL){
        return(
            <Redirect href="/ticket"/>
        )
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
                    <MaterialCommunityIcons
                        name="ticket-confirmation-outline"
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field placeholder="Código do Ingresso" onChangeText={(value) => {
                        setCode(value)
                    }} />
                </Input>

                <Button
                    title="Acessar Crendenciais"
                    onPress={handleAccessCredential}
                    isLoading={isLoading} />
                <Link
                    href={"/register"}
                    className="text-gray-100 text-base font-bold text-center mt-8"
                >
                    Ainda não possui ingresso?
                </Link>
            </View>
        </View>
    );
}


