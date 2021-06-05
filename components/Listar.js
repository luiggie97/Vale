import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text,Alert } from 'react-native';
import {Header, Left, Right, Button, Title, Icon,Item, Input} from 'native-base';
import firebase from '../database/firebase'
class Listar extends Component{ 
    state= { dataTodo:[],dataTodoAux:[],filter:''};
    async componentDidMount() {    
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
           this.fetch();           
          });        
        const {filter} = this.state; 
        this.fetch();
    }
    fetch(){
        firebase.db.collection('instrumentos').onSnapshot(querySnapshot=>{
            const instrumentos =[];
            querySnapshot.docs.forEach(doc=>{
                const { tipo,tag,localizacao, dataUltimaCalibracao,dataProximaCalibracao,certificado} = doc.data();
                instrumentos.push({
                    id: doc.id,
                    tipo: tipo,
                    tag: tag,
                    localizacao: localizacao,
                    dataUltimaCalibracao: dataUltimaCalibracao,
                    dataProximaCalibracao: dataProximaCalibracao,
                    certificado: certificado                                

                })
            })
            this.setState({dataTodo: instrumentos, dataTodoAux: instrumentos}) 
        })
    }

    handleAdd(){
        this.props.navigation.navigate('Adicionar')
    }

    handleEdit(id){        
        this.props.navigation.navigate('Editar',{
            id:id
        })
    }
    handleFilter(val){            
        const dtFilter = this.state.dataTodoAux.filter((item)=>
            item.tipo.toUpperCase().indexOf(val.toUpperCase()) > -1
        );        
        this.setState({dataTodo:dtFilter, filter:val})
    }
    async handleDelete(id){
        const dbRef = firebase.db.collection('instrumentos').doc(id);
        await dbRef.delete();
        Alert.alert('Aviso', 'Instrumento removido com sucesso');     
        this.fetch();           
    }
    handleConfirmation(id){
        Alert.alert('Aviso','Deseja realmente remover o instrumento em questão?',[
            {text:'Sim', onPress: () => this.handleDelete(id)},
            {text:'Não'},
        ])
    }
    render(){
     
        return(
            <View style= {{flex:1}}>
                <View >
                    <Header style={{backgroundColor:'#00746f'}}>
                        <Left>                            
                            <Title>Lista</Title>
                        </Left>                        
                        <Right>
                            <Button small transparent onPress={()=>this.handleAdd()}>
                                <Icon name="add"></Icon>
                            </Button>                            
                        </Right>
                    </Header>
                </View>
                <View style={{flex: 1}}>
                    <Item>
                        <Input placeholder='Digite um tipo' onChangeText={(valor)=>this.handleFilter(valor)} value={this.state.filter}/>
                        <Icon active name='search'/>
                    </Item>                    
                </View>
                <View style={styles.container}>
                   <FlatList
                       keyExtractor={item => item.id.toString()}                     
                       style={styles.container}                       
                       data={this.state.dataTodo}
                       renderItem={({item})=>(
                        <View style={styles.container1}>
                            <Left>
                                <Text style={styles.item}>{item.tipo}</Text>                                  
                            </Left>

                            <Right style={{display:'flex', flexDirection:'row',marginLeft:140}}>
                                <Button small transparent onPress={()=>this.handleEdit(item.id)}>
                                    <Icon name="pencil" style={{color:'white'}}/>
                                </Button>
                                <Button small transparent onPress={()=>this.handleConfirmation(item.id)}>
                                    <Icon name="trash" style={{color:'white'}}/>
                                </Button>
                            </Right>                           
                        </View>                                                        
                        )}
                    />   
                </View> 
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      marginTop:10,     
    },
    container1:{
      backgroundColor: '#00746f',
      borderRadius: 5,     
      color: 'white',
      flex:3,
      flexDirection: "row",
      minHeight:50,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    item: {    
      paddingLeft:15,
      minWidth:100,
      color: 'white',      
    },
    title: {
      fontSize: 32,
    },
  });
  
export default Listar;