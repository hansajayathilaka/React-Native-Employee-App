import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const EmployeeForm = (props) => {
    const getDetails = (type) => {
        let item = props.route.params
        if (item){
            return item[type]
        }
        return ''
    }

    const [Name, setName] = useState(getDetails('name'))
    const [Phone, setPhone] = useState(getDetails('phone'))
    const [Email, setEmail] = useState(getDetails('email'))
    const [Salary, setSalary] = useState(getDetails('salary'))
    const [Position, setPosition] = useState(getDetails('position'))
    const [Picture, setPicture] = useState(getDetails('picture'))
    const [Model, setModel] = useState(false)

    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            })
            if (!data.cancelled){
                let formData = {
                    uri: data.uri,
                    type: `test/${ data.uri.split('.')[-1] }`,
                    name: `test.${ data.uri.split('.')[-1] }`,
                }
                uploadHandle(formData)
            }
        } else {
            Alert.alert("You need to give up permissions to work.")
        }
    }

    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            })
            if (!data.cancelled){
                let formData = {
                    uri: data.uri,
                    type: `test/${ data.uri.split('.')[-1] }`,
                    name: `test.${ data.uri.split('.')[-1] }`,
                }
                uploadHandle(formData)
            }
        } else {
            Alert.alert("You need to give up permissions to work.")
        }
    }

    const submitData = () => {
        fetch('http://192.168.8.107:3000/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: Name,
                email: Email,
                phone: Phone,
                salary: Salary,
                position: Position,
                picture: Picture
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`Saved ${data.details.name} Successfully`)
                props.navigation.navigate('Home')
            })
            .catch(() => {
                Alert.alert('Something went wrong.')
            })
    }

     const updateData = () => {
        fetch('http://192.168.8.107:3000/employee/' + props.route.params._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: Name,
                email: Email,
                phone: Phone,
                salary: Salary,
                position: Position,
                picture: Picture
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`Updated ${data.details.name} Successfully`)
                props.navigation.navigate('Home')
            })
            .catch(err => {
                console.log(err)
                Alert.alert('Something went wrong.')
            })
    }

    const uploadHandle = (image) => {
        const form = new FormData()
        form.append('file', image)
        form.append('upload_preset', 'EmployeeApp')
        form.append('cloud_name', 'hansa-cloudinary')
        fetch('https://api.cloudinary.com/v1_1/hansa-cloudinary/image/upload', {
            method: 'POST',
            body: form,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPicture(data.secure_url)
                setModel(false)
            })
            .catch(() => {
                Alert.alert('Error While Uploading.')
            })
    }

    return (
        <View style={styles.root}>
            <KeyboardAvoidingView>
                <TextInput
                    style={styles.inputStyle}
                    label='Name'
                    value={Name}
                    mode='outlined'
                    theme={theme}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    label='Phone'
                    value={Phone}
                    mode='outlined'
                    keyboardType='numeric'
                    theme={theme}
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    label='Email'
                    value={Email}
                    mode='outlined'
                    theme={theme}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    label='Salary'
                    value={Salary}
                    mode='outlined'
                    theme={theme}
                    onChangeText={text => setSalary(text)}
                />
                <TextInput
                    style={styles.inputStyle}
                    label='Position'
                    value={Position}
                    mode='outlined'
                    theme={theme}
                    onChangeText={text => setPosition(text)}
                />
                <Button icon={ Picture === '' ? 'upload' : 'check' } mode='contained' theme={theme} onPress={ () => setModel(true) } style={styles.inputStyle} >
                    Upload Image
                </Button>
                { props.route.params ?
                    <Button icon='content-save' mode='contained' theme={theme} onPress={ () => updateData() } style={styles.inputStyle} >
                        Update
                    </Button>
                :
                    <Button icon='content-save' mode='contained' theme={theme} onPress={ () => submitData() } style={styles.inputStyle} >
                        Save
                    </Button>
                }
                <Modal animationType='slide' transparent={ true } visible={ Model } onRequestClose={() => setModel(false)} >
                    <View style={styles.modelView}>
                        <View style={ styles.modelButtonView }>
                            <Button icon='camera' mode='contained' theme={theme} onPress={ () => pickFromCamera() } >
                                Camera
                            </Button>
                            <Button icon='image-area' mode='contained' theme={theme} onPress={ () => pickFromGallery() } >
                                Gallery
                            </Button>
                        </View>

                        <Button theme={theme} onPress={ () => setModel(false) } >
                            Cancel
                        </Button>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </View>
    )
}

const theme = {
    colors: {
        primary: '#2c75d7'
    },
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 5,
    },
    modelButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    modelView: {
        position: 'absolute',
        bottom: 2,
        width: '100%',
        backgroundColor: 'white'
    }
})

export default EmployeeForm
