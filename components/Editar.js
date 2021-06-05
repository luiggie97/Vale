import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Header, Left, Body,Button,Title, Icon,Item, Input,Label,Form } from 'native-base';
import firebase from '../database/firebase'
import DatePicker from 'react-native-datepicker';

class Editar extends React.Component{
    state= {tipo:'',tag:'',localizacao:'',dataUltimaCalibracao:'',dataProximaCalibracao:'',certificado:'',id:''};
    async componentDidMount() {            
       const id = this.props.route.params.id;       
       this.getData(id);
    }
    handleBack(){
        this.props.navigation.goBack();
    }
    async getData(id){            
        const dbRef = firebase.db.collection('instrumentos').doc(id)
        const doc = await dbRef.get();
        const instrumento = doc.data(); 
        console.log(JSON.stringify(instrumento))     
        this.setState({id:id, tipo:instrumento.tipo,tag: instrumento.tag,localizacao: instrumento.localizacao,
            dataUltimaCalibracao: instrumento.dataUltimaCalibracao, dataProximaCalibracao: instrumento.dataProximaCalibracao, certificado: instrumento.certificado})      
    }
    async handleSave(){
        if(this.state.tipo =="" || this.state.tag =="" || this.state.localizacao=="" || this.state.dataUltimaCalibracao =="" || this.state.dataProximaCalibracao=="" || this.state.certificado ==""){
            Alert.alert("Aviso","Preencha todos os campos!");
        }else{
            const dbRef = firebase.db.collection('instrumentos').doc(this.state.id)         
            await dbRef.set({
                tipo: this.state.tipo,
                tag: this.state.tag,
                localizacao: this.state.localizacao,
                dataUltimaCalibracao: this.state.dataUltimaCalibracao,
                dataProximaCalibracao: this.state.dataProximaCalibracao,
                certificado: this.state.certificado
            })
            Alert.alert('Aviso', 'Instrumento Editado com sucesso');
            this.props.navigation.goBack();   
        }
    }   
    render(){       
        return(
            <View style={{flex:1}} >
                <View style={{flex:1}}>
                    <Header  style={{backgroundColor:'#00746f'}}>
                        <Left style={{flex:0.2}}>                            
                            <Button transparent small onPress={()=>this.handleBack()}>
                                <Icon name="arrow-back"></Icon>
                            </Button>
                        </Left>                                               
                        <Body style={{flex:0.8}}>
                            <Title>Editar Instrumento</Title>
                        </Body>
                    </Header>                    
                </View>
                <View style={{flex:1}}>
                    <Form>
                    <Item inlineLabel>
                            <Label>Tipo</Label>
                            <Input onChangeText={(valor)=>this.setState({tipo:valor})} value={this.state.tipo}/>
                        </Item>
                        <Item inlineLabel>
                            <Label>Tag</Label>
                            <Input onChangeText={(valor)=>this.setState({tag:valor})} value={this.state.tag}/>
                        </Item>
                        <Item inlineLabel>
                            <Label>Localização</Label>
                            <Input onChangeText={(valor)=>this.setState({localizacao:valor})} value={this.state.localizacao}/>
                        </Item> 
                        <Item inlineLabel>
                            <Label>Certificado</Label>
                            <Input onChangeText={(valor)=>this.setState({certificado:valor})} value={this.state.certificado}/>
                        </Item>      
                        <DatePicker
                                style={{width: 200, paddingTop:20, paddingLeft:15}}
                                date={this.state.dataUltimaCalibracao}
                                mode="date"
                                placeholder="Última Calibração"
                                format="DD-MM-YYYY"
                                minDate="01-01-2019"
                                maxDate="01-06-2050"
                                confirmBtnText="Confirmar"
                                cancelBtnText="Cancelar"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }                               
                                }}
                                onDateChange={(date) => {this.setState({dataUltimaCalibracao: date})}}
                        />
                        <DatePicker
                                style={{width: 200, paddingTop:20, paddingLeft:15}}
                                date={this.state.dataProximaCalibracao}
                                mode="date"
                                placeholder="Próxima Calibração"
                                format="DD-MM-YYYY"
                                minDate="01-01-2019"
                                maxDate="01-06-2050"
                                confirmBtnText="Confirmar"
                                cancelBtnText="Cancelar"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }                              
                                }}
                                onDateChange={(date) => {this.setState({dataProximaCalibracao: date})}}
                        />
                    </Form>
                </View>
                <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                    <Button full style={{backgroundColor:'#00746f'}} onPress={()=>this.handleSave()}>
                        <Text style={{color:'#FFF', fontWeight:'bold'}}>Editar</Text>
                    </Button>                    
                </View>                
            </View>
        );
    }
}
export default Editar;