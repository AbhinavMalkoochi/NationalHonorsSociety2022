import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Button,
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'

export default function ClassroomScreen() {
    const [modalDropFlag, setModalDrop] = useState(false)
    const classrooms = ['a']
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.rect}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setModalDrop(true)}
                >
                    <Image
                        source={require('../assets/images/AddButton.png')}
                        resizeMode="contain"
                        style={{ width: 35, height: 35 }}
                    />
                </TouchableOpacity>
                <Modal visible={modalDropFlag}>
                    <Button title="Close" onPress={() => setModalDrop(false)} />
                    <FlatList
                        style={{ flex: 1 }}
                        data={classrooms}
                        renderItem={({ item }) => (
                            <View style={styles.classroomBox}>
                                <View style={styles.classTitleContainer}>
                                    <Text style={styles.classroomTitle}>
                                        {item}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    rect: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
    },
    buttonContainer: {
        //marginLeft: 350,
        left: 370,
        width: 100,
        height: 100,
    },
    modalContainer: {
        height: '15%',
        width: '25%',
        left: '70%',
        marginTop: 20,
        backgroundColor: 'white',
    },
    classroomBox: {
        width: '90%',
        height: '80%',
        marginTop: 50,
        backgroundColor: '#feb914',
        borderRadius: 25,
        marginLeft: 20,
    },
    classTitleContainer: {
        width: '90%',
        height: '20%',
        //backgroundColor: 'white',
        marginTop: 30,
        marginLeft: 30,
    },
    classroomTitle: {
        fontSize: 18,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
})
