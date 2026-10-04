import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function PlantCard({ plant, onPress, onAdd }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.92}>
        <View style={styles.imageWrap}>
          <Image source={{uri:plant.image}} style={styles.image} />
          <View style={styles.tag}><Text style={styles.tagText}>{plant.category}</Text></View>
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{plant.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{plant.description}</Text>
          <View style={styles.bottom}>
            <Text style={styles.price}>৳{Number(plant.price).toLocaleString('en-BD')}</Text>
            <TouchableOpacity style={styles.add} onPress={onAdd}>
              <Ionicons name="cart-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles=StyleSheet.create({
  card:{backgroundColor:'#fff',borderRadius:18,overflow:'hidden',marginBottom:16,borderWidth:1,borderColor:'#e5ebe4',elevation:2},
  imageWrap:{position:'relative'},
  image:{width:'100%',height:190,backgroundColor:'#edf2eb'},
  tag:{position:'absolute',left:12,top:12,backgroundColor:'#fff',borderRadius:20,paddingHorizontal:10,paddingVertical:5},
  tagText:{fontSize:11,fontWeight:'800',color:colors.primary},
  info:{padding:14},
  name:{fontSize:17,fontWeight:'900',color:colors.text},
  description:{fontSize:12,color:colors.textLight,lineHeight:18,marginTop:5,minHeight:36},
  bottom:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10},
  price:{fontSize:19,fontWeight:'900',color:colors.primaryDark},
  add:{width:38,height:38,borderRadius:19,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'}
});
