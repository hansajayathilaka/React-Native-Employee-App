import {StyleSheet, Text, View, Image, Linking, Platform, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile = (props) => {
    const {_id, name, email, salary, phone, position, picture} = props.route.params.item;

    const openDial = () => {
        if(Platform.OS === 'android'){
            Linking.openURL(`tel:${ phone }`);
        } else {
            Linking.openURL(`telprompt:${ phone }`);
        }
    }
    
    const deleteEmployee = () => {
        let url = 'http://192.168.8.107:3000/employee/' + _id
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${ data.details.name } is deleted.`)
                props.navigation.navigate('Home')
            })
            .catch(err => {
                Alert.alert(`${ err }\nSomething went wrong.`)
            })
    }

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#006aff", "#242424"]}
                style={{ height: "15%" }}
            />
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 140/2, marginTop: -50 }}
                    source={{ uri: picture }}
                />
            </View>
            <View style={{ alignItems: "center", margin: 15 }}>
                <Title>{ name }</Title>
                <Text style={{fontSize: 18}}>{ position }</Text>
            </View>
            <Card style={styles.card} onPress={() => {
                Linking.openURL(`mailto: ${email}`)
            }} >
                <View style={styles.cardView}>
                    <MaterialIcons name='email' size={32} color='#006aff' />
                    <Text style={styles.nameText}>{ email }</Text>
                </View>
            </Card>
            <Card style={styles.card} onPress={() => openDial()}>
                <View style={styles.cardView}>
                    <Entypo name='phone' size={32} color='#006aff' />
                    <Text style={styles.nameText}>{ phone }</Text>
                </View>
            </Card>
            <Card style={styles.card}>
                <View style={styles.cardView}>
                    <MaterialIcons name='attach-money' size={32} color='#006aff' />
                    <Text style={styles.nameText}>{ salary }</Text>
                </View>
            </Card>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                <Button
                    icon='account-edit'
                    mode='contained'
                    onPress={() => {
                        props.navigation.navigate('EmployeeForm', {_id, name, email, salary, phone, position, picture})
                    }}
                    theme={theme} >
                    Edit
                </Button>
                <Button icon='delete' mode='contained' onPress={() => deleteEmployee() } theme={theme}>
                    Remove
                </Button>
            </View>
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
        flex: 1
    },
    card: {
        margin: 3,
        padding: 6
    },
    cardView:{
        flexDirection: "row"
    },
    nameText: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 10
    }
})

export default Profile
