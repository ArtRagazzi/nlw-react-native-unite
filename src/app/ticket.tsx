import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {Header} from "@/components/header"
import {Credential} from "@/components/cradential"


export default function Ticket(){
    return(
        <View className="flex-1 bg-green-950">
            <StatusBar style="light" />
            <Header title="Minha credencial"/>
            <Credential/>



        </View>
    )
}