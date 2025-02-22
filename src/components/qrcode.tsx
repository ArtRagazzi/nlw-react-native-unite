import { colors } from "@/styles/colors"
import QRCodeSVG from "react-native-qrcode-svg"


type Props = {
    value: string
    size: number
}



export function QRCode(props:Props) {




    return (
        <QRCodeSVG value={props.value} size={props.size} color={colors.white} backgroundColor="transparent" />

    )
}