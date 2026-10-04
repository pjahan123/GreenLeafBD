import React, {useMemo, useState} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PlantCard from '../components/PlantCard';
import FooterNav from '../components/FooterNav';
import colors from '../constants/colors';

export default function PlantsScreen({plants=[],onPlantPress,onHome,onPlants,onCart,onProfile,cartCount=0}) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const filtered=useMemo(()=>plants.filter(p=>
    (category==='All'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())
  ),[plants,query,category]);

  return <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View><Text style={styles.kicker}>GREENLEAF BD</Text><Text style={styles.title}>Our Plants</Text></View>
        <TouchableOpacity style={styles.cart} onPress={onCart}><Ionicons name="cart-outline" size={23} color={colors.primaryDark}/>{cartCount>0&&<View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}</TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Choose a plant to make your home greener.</Text>
      <View style={styles.search}><Ionicons name="search-outline" size={20} color={colors.textLight}/><TextInput value={query} onChangeText={setQuery} placeholder="Search by plant name..." placeholderTextColor={colors.textLight} style={styles.input}/></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:22}}>
        {['All','Indoor','Outdoor','Succulent','Flower'].map(c=><TouchableOpacity key={c} onPress={()=>setCategory(c)} style={[styles.filter,category===c&&styles.filterActive]}><Text style={[styles.filterText,category===c&&styles.filterTextActive]}>{c}</Text></TouchableOpacity>)}
      </ScrollView>
      <View style={styles.row}><Text style={styles.heading}>All plants</Text><Text style={styles.count}>{filtered.length} results</Text></View>
      <View style={styles.grid}>{filtered.map(p=><View key={p._id||p.id} style={styles.item}><PlantCard plant={p} onPress={()=>onPlantPress(p)} onAdd={()=>onPlantPress(p)}/></View>)}</View>
      {filtered.length===0&&<Text style={styles.empty}>No plants found.</Text>}
    </ScrollView>
    <FooterNav active="plants" onHome={onHome} onPlants={onPlants} onCart={onCart} onProfile={onProfile} cartCount={cartCount}/>
  </SafeAreaView>
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#f7f9f5'},content:{padding:20,maxWidth:1180,width:'100%',alignSelf:'center',paddingBottom:25},
 header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},kicker:{fontSize:11,fontWeight:'900',letterSpacing:1,color:colors.primary},title:{fontSize:29,fontWeight:'900',color:colors.text,marginTop:3},subtitle:{color:colors.textLight,marginTop:4,marginBottom:18},
 cart:{width:46,height:46,borderRadius:23,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},badge:{position:'absolute',right:-1,top:-1,minWidth:18,height:18,borderRadius:9,backgroundColor:colors.accent,alignItems:'center',justifyContent:'center'},badgeText:{color:'#fff',fontSize:10,fontWeight:'800'},
 search:{height:54,backgroundColor:'#fff',borderRadius:15,flexDirection:'row',alignItems:'center',paddingHorizontal:16,borderWidth:1,borderColor:'#e5ebe4',marginBottom:16},input:{flex:1,marginLeft:9,color:colors.text},
 filter:{paddingHorizontal:18,paddingVertical:10,borderRadius:22,backgroundColor:'#fff',marginRight:8,borderWidth:1,borderColor:'#e1e8df'},filterActive:{backgroundColor:colors.primary,borderColor:colors.primary},filterText:{fontSize:12,fontWeight:'800',color:colors.textLight},filterTextActive:{color:'#fff'},
 row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},heading:{fontSize:21,fontWeight:'900',color:colors.text},count:{fontSize:12,color:colors.textLight},grid:{flexDirection:'row',flexWrap:'wrap',marginHorizontal:-6},item:{width:'50%',paddingHorizontal:6},empty:{textAlign:'center',color:colors.textLight,marginTop:40}
});
