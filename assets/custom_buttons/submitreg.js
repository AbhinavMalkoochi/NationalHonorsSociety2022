import React from 'react'
import {StyleSheet,TouchableOpacity, Text, View} from'react-native'

export default function SubmitReg({text,onPress}){
    return (

        <TouchableOpacity onPress={onPress} style={styles.submitbutton} activeOpacity={0.8}>

            <Text style={styles.buttonText}>{text}</Text>



        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
submitbutton:{
    position:'absolute',
    borderRadius:8,
    paddingVertical:14,
    paddingHorizontal:10,
    backgroundColor:'#feb914',
    height:"6%",
    width:"40%",
    padding: 10,
    borderRadius: 30,
    top:"69%",
    left:'46%',
},
buttonText:{
    fontSize:25,
    bottom:10,
    textAlign:'center',
    color:'white',
    textAlignVertical:'center',
    fontStyle: 'italic',

}


})