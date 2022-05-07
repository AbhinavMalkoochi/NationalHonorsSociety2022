import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Ellipse } from 'react-native-svg'

export default function AddButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.ellipseStack} onPress={onPress}>
            <View style={styles.ellipse}></View>
            <View style={styles.ellipse2}></View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    ellipse: {
        width: 20,
        height: 32,
        backgroundColor: 'rgb(254,185,20)',
        position: 'absolute',
        borderRadius: 50,
    },
    ellipse2: {
        right: 50,
        width: 50,
        height: 32,
        position: 'absolute',
        transform: [
            {
                rotate: '90.00deg',
            },
        ],
        backgroundColor: 'rgb(254,185,20)',
        borderRadius: 50,
    },
    ellipseStack: {
        width: 200,
        height: 32,
        marginTop: 30,
        marginLeft: 370,
    },
})
