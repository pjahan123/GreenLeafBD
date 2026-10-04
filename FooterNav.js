import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function FooterNav({ active='home', onHome, onPlants, onCart, onProfile, cartCount=0 }) {
  const items = [
    ['home-outline','Home','home',onHome],
    ['leaf-outline','Plants','plants',onPlants],
    ['cart-outline','Cart','cart',onCart],
    ['person-outline','Profile','profile',onProfile],
  ];

  return (
    <View style={styles.footer}>
      {items.map(([name,label,screen,onPress]) => (
        <TouchableOpacity key={screen} style={styles.item} onPress={onPress}>
          <View>
            <Ionicons name={name} size={22} color={active===screen ? colors.primary : colors.textLight} />
            {screen==='cart' && cartCount>0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
          </View>
          <Text style={[styles.label, active===screen && styles.active]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles=StyleSheet.create({
  footer:{height:72,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:colors.border,flexDirection:'row',justifyContent:'space-around',alignItems:'center'},
  item:{alignItems:'center',width:80},
  label:{marginTop:3,fontSize:11,color:colors.textLight},
  active:{color:colors.primary,fontWeight:'800'},
  badge:{position:'absolute',right:-8,top:-5,minWidth:17,height:17,borderRadius:9,backgroundColor:colors.accent,alignItems:'center',justifyContent:'center'},
  badgeText:{color:'#fff',fontSize:9,fontWeight:'800'}
});
