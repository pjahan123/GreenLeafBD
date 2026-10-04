import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Header from '../components/Header';
import colors from '../constants/colors';

export default function PlantDetailsScreen({plant,onBack,onAddToCart,onAskAI}){
 if(!plant)return null;
 const money=Number(plant.price||0).toLocaleString('en-BD');
 const details=[
  ['☀️','Light',plant.light||'Bright indirect'],
  ['💧','Water',plant.water||'Weekly'],
  ['⭐','Difficulty',plant.difficulty||'Easy'],
  ['📏','Height',plant.height||'Varies'],
  ['🏡','Best for',plant.bestFor||'Home & office'],
  ['🌡️','Temperature',plant.temperature||'18–30°C']
 ];
 return <SafeAreaView style={styles.container}>
  <ScrollView showsVerticalScrollIndicator={false}>
   <Header title="Plant Details" onBack={onBack}/>
   <Image
    source={{ uri: plant.image }}
    style={styles.image}
    resizeMode="contain"
    />
   <View style={styles.body}>
    <View style={styles.row}><View style={{flex:1}}><Text style={styles.name}>{plant.name}</Text><Text style={styles.category}>{plant.category} Plant</Text></View><Text style={styles.price}>৳{money}</Text></View>
    <Text style={styles.heading}>About this plant</Text>
    <Text style={styles.description}>{plant.description}</Text>
    <View style={styles.grid}>{details.map(([icon,label,value])=><View style={styles.info} key={label}><Text style={styles.infoIcon}>{icon}</Text><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>)}</View>
    <View style={styles.pet}><Text style={styles.petTitle}>🐾 Pet safety</Text><Text style={styles.petText}>{plant.petSafety||'Check plant safety before allowing pets to chew the leaves.'}</Text></View>
    <TouchableOpacity style={styles.aiButton} onPress={()=>onAskAI?.(plant)}><Ionicons name="sparkles-outline" size={20} color={colors.primary}/><Text style={styles.aiText}>Ask AI about this plant</Text></TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={()=>onAddToCart(plant)}><Ionicons name="cart-outline" size={21} color="#fff"/><Text style={styles.buttonText}>Add to Cart • ৳{money}</Text></TouchableOpacity>
   </View>
  </ScrollView>
 </SafeAreaView>
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:colors.background},image:{ width:'100%',  height:380,  backgroundColor:'#ffffff', },body:{padding:20,maxWidth:1000,width:'100%',alignSelf:'center'},row:{flexDirection:'row',alignItems:'center'},name:{fontSize:28,fontWeight:'900',color:colors.text},category:{color:colors.primary,marginTop:4,fontWeight:'700'},price:{fontSize:23,fontWeight:'900',color:colors.primary},heading:{fontSize:20,fontWeight:'900',color:colors.text,marginTop:28,marginBottom:9},description:{color:colors.textLight,lineHeight:23,fontSize:14},grid:{flexDirection:'row',flexWrap:'wrap',marginHorizontal:-5,marginTop:22},info:{width:'33.333%',padding:5},infoIcon:{fontSize:22},infoLabel:{fontSize:11,color:colors.textLight,marginTop:4},infoValue:{fontSize:12,fontWeight:'800',color:colors.text,marginTop:3},pet:{backgroundColor:'#fff8e8',borderRadius:14,padding:14,marginTop:14},petTitle:{fontWeight:'900',color:'#735d1c'},petText:{color:'#6d6345',fontSize:12,lineHeight:18,marginTop:4},aiButton:{height:52,borderRadius:13,borderWidth:1,borderColor:'#b8d9ba',backgroundColor:'#eff8ef',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:18},aiText:{color:colors.primary,fontWeight:'800',marginLeft:8},button:{height:54,backgroundColor:colors.primary,borderRadius:13,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10},buttonText:{color:'#fff',fontWeight:'900',fontSize:15,marginLeft:8}
});
