import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet,Alert,KeyboardAvoidingView,Modal,ScrollView} from 'react-native';
import db from "../config"
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
export default class WelcomeScreen extends React.Component {
    constructor (){
        super();
        this.state={
            emailid : "",
            password:"",
            firstName : "",
            lastName : "",
            address : "",
            contact : "",
            confirmPassword : "",
            isModalVisible : false
        }
    }
    showModal = () => {
     return (
       <Modal  animationType = "fade"
       transparent = {true}
       visible = {this.state.isModalVisible}
       >
         <View style={styles.modalContainer}>
          <ScrollView style={{width:"100%"}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
       <Text style={styles.modalTitle}> Registration Form  </Text>
       <TextInput 
       style={styles.formTextInput}
       placeholder = {"First Name"}
       maxLength = {8}
       onChangeText = {(text)=>{
         this.setState({firstName : text})
       }}
       /> 
        <TextInput 
       style={styles.formTextInput}
       placeholder = {"Last Name"}
       maxLength = {8}
       onChangeText = {(text)=>{
         this.setState({lastName : text})
       }}
       /> 
        <TextInput 
       style={styles.formTextInput}
       placeholder = {"Contact number"}
       maxLength = {10}
       keyboardType = {"numeric"}
       onChangeText = {(text)=>{
         this.setState({contact : text})
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder = {"Address"}
      multiline = {true}
       onChangeText = {(text)=>{
         this.setState({address : text})
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder = {"Email Address"}
     keyboardType = {"email-address"}
       onChangeText = {(text)=>{
         this.setState({emailid : text})
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder = {"password"}
       secureTextEntry = {true}
       onChangeText = {(text)=>{
         this.setState({password : text})
       }}
       /> 
        <TextInput 
       style={styles.formTextInput}
       placeholder = {"confirm password"}
      secureTextEntry = {true}
       onChangeText = {(text)=>{
         this.setState({confirmPassword: text})
       }}
       /> 
       <View style={styles.modalBackButton}>
         <TouchableOpacity style={styles.registerButton} onPress={()=>{
           this.userSignUp(this.state.emailid,this.state.password,this.state.confirmPassword)
         }}>
            <Text> Register </Text>
         </TouchableOpacity>
       </View> 

       <View style={styles.modalBackButton}>
         <TouchableOpacity style={styles.cancelButton} onPress={()=>{
          this.setState({"isModalVisible":false})
         }}>
            <Text> Cancel </Text>
         </TouchableOpacity>
       </View>
            </KeyboardAvoidingView>
          </ScrollView>
         </View>
      </Modal> 
      
     )
    }

    userLogin= async(emailid,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailid,password)
    .then(()=>{
        return Alert.alert("Succesfully Logged In")
    })
    .catch((error)=>{
      var errorCode = error.code
      var errorMessage = error.message
      return Alert.alert(errorMessage)
    })
}
userSignUp= async(emailid,password,confirmPassword)=>{
  if(password!== confirmPassword){
    return Alert.alert("password does not match")
  }
  else {
    firebase.auth().createUserWithEmailAndPassword(emailid,password)
    .then((response)=>{
        return Alert.alert("User Added Succesfully")
    })
    .catch((error)=>{
      var errorCode = error.code
      var errorMessage = error.message
      return Alert.alert(errorMessage)
    }) 
    db.collection("users").add({
      first_name : this.state.firstName,
      last_name : this.state.lastName,
      address : this.state.address,
      contact : this.state.contact,
      email_id: this.state.emailid
    })
  }
  }
    render (){
        return (
           
<View style={styles.container}>
  <View style={{justifyContent:"center",alignItems:"center"}}>
{this.showModal}
  </View>
   <View>
    <Text style={styles.title}> Book Santa </Text>
   
     </View>
     <View>
    <TextInput 
        style={styles.inputBox}
        placeholder="abc@example.com" 
        keyboardType="email-address"
        onChangeText={text=>this.setState({
          emailid : text
        })}
        />
         <TextInput 
        style={styles.inputBox}
        placeholder="Enter Password" 
       secureTextEntry = {true}
        onChangeText={text=>this.setState({
          password : text
        })}
        />
     </View>
     <View>
         <TouchableOpacity style={styles.loginButton} onPress={()=>{this.userLogin(this.state.emailid,this.state.password)}}>
           <Text style={{textAlign:"center"}}> Login </Text> 
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginButton} onPress={()=>{this.setState({isModalVisible:true})}}>
           <Text style={{textAlign:"center"}}> Sign Up </Text> 
         </TouchableOpacity>
     </View>
         </View>
        )
    }
}
const styles = StyleSheet.create({
    loginButton : {
     width : 90,
      height : 40,
      alignItems : "center",
      marginTop:20,
      padding:5,
      borderRadius:10,
      borderWidth : 2
    },
    inputBox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
      },
      container : {
          flex:1,
          backgroundColor : "pink"

        } ,
        modalTitle:{
          justifyContent : "center",
          alignItems : "center",
          alignSelf : "center",
          margin: 50,
          fontSize:30,
          color:"black"
        },
        modalContainer : {
          flex :1,
          borderRadius : 20,
          justifyContent : "center",
          alignItems : "center",
          alignSelf : "center",
          backgroundColor : "yellow",
          margin : 50
        },
        formTextInput : {
          width : "75%",
               marginTop : 20,
               height : 35,
               padding : 10,
              justifyContent : "center"
        },
        registerButton : {
          width : 200,
          height : 40,
          justifyContent : "center",
          alignItems : "center",
          alignSelf : "center",
          borderRadius : 10,
          marginTop : 30
        },
        cancelButton : {
          width : 200,
          height : 30,
          marginTop : 5,
          justifyContent : "center",
          alignItems : "center",
          alignSelf : "center"
        },
        keyboardAvoidingView : {
          flex : 1,
          justifyContent : "center",
          alignItems : "center",
          alignSelf : "center"
        },
        modalBackButton : {
          flex : 1,
          justifyContent : "center",
          alignItems : "center",
          alignSelf : "center"
        }
})