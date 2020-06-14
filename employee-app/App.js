import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from "redux";
import { Provider } from "react-redux";

import Home from './components/Home';
import EmployeeForm from "./components/EmployeeForm";
import Profile from './components/Profile';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { reducer } from './reducers/reducer'

const Stack = createStackNavigator();
const store = createStore(reducer)

function App() {

    const options = {
        title: 'My First App',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#006aff'
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{...options, title: 'Employee List'}}
                />
                <Stack.Screen
                    name='EmployeeForm'
                    component={EmployeeForm}
                    options={{...options, title: 'Create Employee'}}
                />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{...options, title: 'Employee Profile'}}
                />
            </Stack.Navigator>
        </View>
    );
}

export default () => {
    return (
        <Provider store={ store }>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7c7c7'
  },
})
