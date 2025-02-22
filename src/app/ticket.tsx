import { Text, View, ScrollView, TouchableOpacity, Alert, Modal} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/header"
import { Credential } from "@/components/cradential"
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker"
import { QRCode } from "@/components/qrcode";

export default function Ticket() {

    const[image,setImage] = useState("")
    const [expandQRCode, setExpandQRCode] = useState<boolean>(false)

    async function handleSelectImage(){
        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[4,4]
            })

            if(result.assets){
                setImage(result.assets[0].uri)
            }
        }catch(error){
            console.log(error)
            Alert.alert("Foto", "Não foi possivel selecionar a imagem.")
        }
    }

    








    return (
        <View className="flex-1 bg-green-950">
            <StatusBar style="light" />
            <Header title="Minha credencial" />

            <ScrollView contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>
                <Credential image={image} onChangeAvatar={handleSelectImage} onShowQRCode={()=>{
                    setExpandQRCode(true)
                }}/>
                <FontAwesome
                    name="angle-double-down"
                    size={24}
                    color={colors.gray[300]}
                    className="self-center my-6"
                    
                />

                <Text className="text-white font-bold text-2xl mt-4">
                    Compartilhar Credenciais
                </Text>

                <Text className="text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que você vai participar do Unite Summit!
                </Text>

                <Button title="Compartilhar"></Button>
                <TouchableOpacity activeOpacity={0.7} className="mt-10">
                    <Text className="text-white text-base font-bold text-center">
                        Remover Ingresso
                    </Text>

                </TouchableOpacity>
            </ScrollView>


            <Modal visible={expandQRCode} statusBarTranslucent={true} animationType="fade">
                <View className="flex-1 bg-green-950 items-center justify-center">
                    <TouchableOpacity 
                    activeOpacity={0.7} 
                    onPress={()=>{setExpandQRCode(false)}}>
                        <QRCode value="teste" size={300}/>
                        <Text className="text-2xl text-orange-500 font-body text-center mt-16">Fechar QRCode</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}