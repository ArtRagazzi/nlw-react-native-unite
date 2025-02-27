import { Text, View, ScrollView, TouchableOpacity, Alert, Modal, Share } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/header"
import { Credential } from "@/components/cradential"
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker"
import { QRCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store"
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {


    const [expandQRCode, setExpandQRCode] = useState<boolean>(false)
    const badgeStore = useBadgeStore()

    async function handleShare() {

        try {
            if (badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL
                })
            }
        }
        catch (error) {
            console.log(error)
            Alert.alert("Compartilhar", "Não foi possível compartilhar.")
        }
    }

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4]
            })

            if (result.assets) {
                badgeStore.updateAvatar(result.assets[0].uri)
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Foto", "Não foi possivel selecionar a imagem.")
        }
    }








    if (!badgeStore.data?.checkInURL) {
        return (
            <Redirect href="/" />
        )
    }

    return (
        <View className="flex-1 bg-green-950">
            <StatusBar style="light" />
            <Header title="Minha credencial" />

            <ScrollView contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>
                <Credential data={badgeStore.data} onChangeAvatar={handleSelectImage} onExpandQRCode={() => {
                    setExpandQRCode(true)
                }} />

                <MotiView
                    from={{ translateY: 0 }}
                    animate={{ translateY: 10 }}
                    transition={{
                        loop:true,
                        type:"timing",
                        duration:700
                    }}
                >
                    <FontAwesome
                        name="angle-double-down"
                        size={24}
                        color={colors.gray[300]}
                        className="self-center my-6"

                    />
                </MotiView>

                <Text className="text-white font-bold text-2xl mt-4">
                    Compartilhar Credenciais
                </Text>

                <Text className="text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que você vai participar do evento {badgeStore.data.eventTitle}!
                </Text>

                <Button title="Compartilhar" onPress={handleShare}></Button>
                <TouchableOpacity activeOpacity={0.7} className="mt-10" onPress={() => badgeStore.remove()}>
                    <Text className="text-white text-base font-bold text-center">
                        Remover Ingresso
                    </Text>

                </TouchableOpacity>
            </ScrollView>


            <Modal visible={expandQRCode} statusBarTranslucent={true} animationType="fade">
                <View className="flex-1 bg-green-950 items-center justify-center">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => { setExpandQRCode(false) }}>
                        <QRCode value={badgeStore.data.checkInURL} size={300} />
                        <Text className="text-2xl text-orange-500 font-body text-center mt-16">Fechar QRCode</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            
        </View>
    )
}