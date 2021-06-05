import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button,Image} from 'react-native';
import SocialButton from './SocialButton';
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';
class Login extends React.Component{
state= {password:'',email:'',heightPass:1,user:[]};

signInWithGoogleAsync = async ()=> {
  try {
    const result = await Google.logInAsync({
      androidClientId: '1008456117535-qqekor3fhntlbbsuu004l19ego29gdl1.apps.googleusercontent.com',     
      scopes: ['profile', 'email'],
    });
    if (result.type === 'success') {
        this.props.navigation.navigate('Listar')
        alert('Usuário autenticado com o Google com sucesso!')
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}
  signUpFacebook = async () => {
    try {
      await Facebook.initializeAsync({appId:'863026444608478'});
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === "success") {       
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${token}`
        );       
        const data = await response.json();
        this.setState({user:data});
        this.props.navigation.navigate('Listar')
        alert('Usuário autenticado com o Facebook com sucesso!')
      } else {
    
      }
    } catch ({ message }) {
      alert(`Ocorreu um erro ao logar com o Facebook, verifique se seu dispositivo está conectado a internet ou se você está logado com o app do facebook em seu celular`);
    }
  };
  
    render(){       
        return(
              <View style={styles.container}>
                <View style={styles.viewIMG}>
                  <Image style={styles.image} source={require('../assets/vale.png')} />
                </View>                 
                 <Text style={styles.text}>Log-In</Text>              
                 <View style={styles.container2}>
                 <SocialButton
                    buttonTitle="Log-in com Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={()=>{this.signUpFacebook()}}
                />
                <SocialButton
                    buttonTitle="Log-in com Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={()=>{this.signInWithGoogleAsync()}}
                />
                 </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00746f',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    container2: {
        padding:50,
        
    },
    viewIMG: {
      paddingBottom:40
    },
    image: {
      //backgroundColor:'black',
      resizeMode:'stretch',
      height:180,      
      width:200
    },
    text:{
      color:'#fff',
      fontSize:30
    },
    input:{
      width: 250,
      height:60,
      borderWidth: 1,
      borderColor:'#082e7c',
      marginTop: 10,
      borderRadius:5,
      padding:10
    },
    button:{
      borderWidth: 5,
      color:'red',
      borderColor:'red'
    },
    viewButton:{
      justifyContent:'flex-end',
      alignItems:'flex-end', 
      paddingTop:10
    }
  });
export default Login;