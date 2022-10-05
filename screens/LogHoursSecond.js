import React, { Component, useState, useEffect } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase/app'
import 'firebase/firestore'
require('firebase/auth')
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { hoursCompleted } from '../fireBaseAPI.js'
import PdfThumbnail from 'react-native-pdf-thumbnail'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    Button,
    Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
//TODO: if you try to submit a image after you have already submitted a image, it will not work, fix this

const LogHoursSecond = ({ route }) => {
    const [dateText, setDateText] = useState('Enter Date Here')
    const [attachments, setAttachments] = useState([])
    const [maxImgFlag, setImgFlag] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const [downloadUrl, setdownloadUrl] = useState([])
    const [totalHours, setTotalHours] = useState(0)
    const [hours, setHours] = useState(0)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [organization, setOrganization] = useState('')
    const [description, setDescription] = useState('')
    const [sponsorName, setSponsorName] = useState('')
    const [sponsorEmail, setSponsorEmail] = useState('')
    const [sponsorNum, setSponsorNum] = useState('')
    const [date, setDate] = useState('')
    const [individualDownloadURL, setIndividualDownloadURL] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    useEffect(() => {
        const {
            organization,
            description,
            sponsorName,
            sponsorEmail,
            sponsorNum,
            date,
        } = route?.params || {}
        setOrganization(organization)
        setDescription(description)
        setSponsorName(sponsorName)
        setSponsorEmail(sponsorEmail)
        setSponsorNum(sponsorNum)
        setDate(date)
    }, [])

    const documentPick = async () => {
        const res = await DocumentPicker.getDocumentAsync({ type: '*/*' })
        const uri = res.uri
        const filePath = res.uri
        const page = 0
        setAttachments([...attachments, filePath])
    }

    const uploadLink = () => {}
    /*
  useEffect(() => { 
    if (route.params?.image) {
      setAttachments([...attachments,image])
    }
  }, [route.params?.image]);
  */

    const pickImage = async () => {
        // Ask the user for the permission to access the media library
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            alert("You've refused to allow this ap to access your photos!")
            return
        }
        if (attachments.length == 3) {
            setImgFlag(true)

            permissionResult.granted == false
        }
        const result = await ImagePicker.launchImageLibraryAsync()

        // Explore the result

        if (!result.cancelled) {
            const downloadURLI = await uploadImage(result)

            setAttachments([...attachments, result.uri])
            setdownloadUrl([...downloadUrl, downloadURLI])
            setIndividualDownloadURL('')
        }
    }

    const submitHours = () => {
        setTotalHours(parseInt(totalHours))

        setTotalHours(totalHours + hours)
        hoursCompleted(
            hours,
            date,
            totalHours,
            organization,
            description,
            sponsorName,
            sponsorEmail,
            sponsorNum,
            downloadUrl[0],
            downloadUrl[1],
            downloadUrl[2]
        )
        setAttachments([])
        setdownloadUrl([])
        setImgFlag(false)
    }
    const removeAttachment = (index) => {
        const arr = [
            ...attachments.slice(0, index),
            ...attachments.slice(index + 1),
        ]
        setAttachments(arr)
    }

    const uploadImage = async (photo) => {
        const uri = photo.uri
        const childPath = `data/${
            firebase.auth().currentUser.uid
        }/${Math.random().toString(36)}`
        const response = await fetch(uri)
        const blob = await response.blob()
        const snapshot = await firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob)
        const downloadURL = await snapshot.ref.getDownloadURL()
        return downloadURL
        setIndividualDownloadURL(downloadURL)
    }
    if (loading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.rectContainer}>
                    <View style={styles.rect1}>
                        <Text style={styles.logHours1}>Log Hours</Text>
                        <Text style={styles.log2}>
                            {attachments.length}
                            {downloadUrl.length}
                        </Text>
                        <Text style={styles.sponsorName}>{organization}</Text>
                        <TextInput
                            placeholder="Ex: "
                            textBreakStrategy="highQuality"
                            style={styles.placeholder2}
                            paddingLeft={20}
                            onChangeText={(text) => setHours(text)}
                        ></TextInput>

                        <Text style={styles.attachments}>{organization}</Text>
                        <TouchableOpacity
                            style={styles.placeholder1}
                            onPress={() => setModalVisibility(true)}
                        ></TouchableOpacity>
                        <View style={styles.nextButton}>
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => submitHours()}
                            >
                                <Text>{}</Text>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal visible={modalVisibility} style={{ flex: 1 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text>Add Attachments</Text>
                                <View style={{ width: '60%' }}>
                                    <Button
                                        title="close"
                                        onPress={() =>
                                            setModalVisibility(false)
                                        }
                                    />
                                </View>
                                <View style={styles.modalButtons}>
                                    <Button
                                        title="Upload PDF"
                                        onPress={() => documentPick()}
                                        style={{ marginTop: 15 }}
                                    />
                                    <View style={{ marginTop: 15 }}>
                                        <Button
                                            title="Upload Link"
                                            onPress={() => uploadLink()}
                                        />
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <Button
                                            title="Take Image"
                                            onPress={() => {
                                                navigation.navigate(
                                                    'PictureScreen'
                                                )
                                            }}
                                        />
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <Button
                                            title="Upload Image"
                                            onPress={() => pickImage()}
                                        />
                                        {maxImgFlag ? (
                                            <Text
                                                style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: '0%',
                                                }}
                                            >
                                                MAX OF THREE IMAGES
                                            </Text>
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '30%',
                                    flex: 1,
                                }}
                            >
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={attachments}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View>
                                                <Image
                                                    source={{ uri: item }}
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                    }}
                                                />
                                                <Button
                                                    title="X"
                                                    onPress={() =>
                                                        removeAttachment(index)
                                                    }
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                    }}
                                                />
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
        )
    }
}
export default LogHoursSecond
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
    },
    buttonText: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        bottom: 4,
        textAlignVertical: 'center',
        fontStyle: 'italic',
    },
    nextButton: {
        width: 150,
        height: 50,
        marginTop: '70%',
        marginLeft: '55%',
    },
    submitButton: {
        backgroundColor: '#feb914',
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: '#feb914',
        height: '100%',
        width: '100%',
        padding: 10,
        borderRadius: 30,
    },

    rect1: {
        width: '100%',
        height: normalize(679, 'height'),
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: normalize(9),
        borderColor: '#000000',
        borderRadius: normalize(69),
        marginLeft: normalize(9),
        top: normalize(7),
    },
    logHours1: {
        // fontFamily: "roboto-700",
        color: '#121212',
        fontSize: 20,
        marginTop: 13,
        marginLeft: 132,
    },
    log2: {
        // fontFamily: "roboto-700",
        color: '#121212',
        marginTop: 20,
        marginLeft: 48,
    },
    enterHoursHere: {
        marginTop: 14,
        left: 12,
        position: 'absolute',
        //fontFamily: "roboto-regular",
        color: '#121212',
        fontSize: 11,
    },
    placeholder1: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginLeft: 36,
    },
    enterHoursHereStack: {
        width: 284,
        height: 68,
        marginTop: 16,
        marginLeft: 36,
    },
    date: {
        //fontFamily: "roboto-regular",
        color: '#121212',
        fontSize: 11,
        marginTop: 14,
        marginLeft: 48,
    },

    attachments: {
        //fontFamily: "roboto-regular",
        color: '#121212',
        fontSize: 11,
        marginTop: 17,
        marginLeft: 48,
    },
    placeholder3: {
        //fontFamily: "roboto-regular",
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 63,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginLeft: 36,
    },
    materialButtonDanger1: {
        height: 36,
        width: 100,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 27,
        marginTop: 262,
        marginLeft: 208,
    },
    sponsorName: {
        // fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 11,
        marginTop: 14,
        marginLeft: 48,
    },
    placeholder2: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginTop: 1,
        marginLeft: 36,
    },
})
