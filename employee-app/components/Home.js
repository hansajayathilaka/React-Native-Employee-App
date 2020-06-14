import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";


const Home = (props) => {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => {
        return state
    })

    const fetchData = () => {
        fetch('http://192.168.1.7:3000/employee')
            .then(res => res.json())
            .then(data => {
                if (data.status){
                    data.details.forEach(item => {
                        if (!item.picture){
                        item.picture =  'https://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s1600/BlueHead.jpg'
                        }
                    })
                    // setData(data.details)
                    // setLoading(false)
                    dispatch({ type: 'SET_DATA', payload: data.details })
                    dispatch({ type: 'SET_LOADING', payload: false })

                } else {
                    Alert.alert('Internal Server Error')
                }

            })
            .catch((err) => {
                console.log(err.message)
                Alert.alert('Something went wrong.')
            })
    }

    useEffect(() => {
        console.log('start')
        fetchData()
        console.log('end')
    }, [])

    const cardList = (item) => {
        return(
            <Card
                style={ styles.myCard } key={item._id}
                onPress={() => props.navigation.navigate('Profile', {item: item})}
            >
                <View style={ styles.cardView }>
                    <Image
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60/2,
                        }}
                        source={{uri: item.picture }}
                    />
                    <View style={styles.textView}>
                        <Text>{ item.name }</Text>
                        <Text>{ item.position }</Text>
                    </View>
                </View>
            </Card>
        )
    }


    return (
        <View style={{flex: 1}}>
            <FlatList
                data={data}
                renderItem={({item}) => {
                    return (cardList(item))
                }}
                keyExtractor={item => item._id}
                onRefresh={() => fetchData() }
                refreshing={ loading }
            />
            <FAB onPress={() => props.navigation.navigate('EmployeeForm')}
                style={styles.fab}
                small={false}
                icon='plus'
                theme={{colors: {accent: '#2c75d7'}}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
        padding: 5,
    },
    cardView: {
        flexDirection: 'row',
        padding: 7,
    },
    textView: {
        fontSize: 10,
        marginLeft: 15,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Home
