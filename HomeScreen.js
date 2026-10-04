import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlantCard from '../components/PlantCard';
import FooterNav from '../components/FooterNav';
import colors from '../constants/colors';

export default function HomeScreen({plants=[],onPlantPress,onPlantsPress,onCartPress,onProfilePress,cartCount=0}) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const filtered=useMemo(()=>plants.filter(p=>
    (category==='All'||p.category===category)&&
    p.name.toLowerCase().includes(query.toLowerCase())
  ),[plants,query,category]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <View>
            <Text style={styles.brand}>🌿 GREENLEAF BD</Text>
            <Text style={styles.welcome}>Plants that make your space feel alive.</Text>
          </View>
          <TouchableOpacity style={styles.cart} onPress={onCartPress}>
            <Ionicons name="cart-outline" size={23} color={colors.primaryDark}/>
            {cartCount>0&&<View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Image source={{uri:'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=1200'}} style={styles.heroImage}/>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroSmall}>GREEN LIVING • BANGLADESH</Text>
            <Text style={styles.heroTitle}>Bring nature{'\n'}into your home.</Text>
            <Text style={styles.heroText}>Beautiful indoor and outdoor plants, delivered with care.</Text>
            <TouchableOpacity style={styles.heroButton} onPress={onPlantsPress}><Text style={styles.heroButtonText}>Shop Plants</Text><Ionicons name="arrow-forward" size={16} color="#234f2b"/></TouchableOpacity>
          </View>
        </View>

        <View style={styles.search}>
          <Ionicons name="search-outline" size={20} color={colors.textLight}/>
          <TextInput value={query} onChangeText={setQuery} placeholder="Search plants..." placeholderTextColor={colors.textLight} style={styles.searchInput}/>
        </View>

        <View style={styles.headingRow}><Text style={styles.section}>Shop by category</Text><TouchableOpacity onPress={onPlantsPress}><Text style={styles.seeAll}>View all</Text></TouchableOpacity></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:25}}>
          {['All','Indoor','Outdoor','Succulent','Flower'].map(c=>(
            <TouchableOpacity key={c} onPress={()=>{setCategory(c);onPlantsPress();}} style={[styles.category,category===c&&styles.categoryActive]}>
              <Text style={styles.categoryIcon}>{c==='All'?'🌿':c==='Indoor'?'🪴':c==='Outdoor'?'🌳':c==='Succulent'?'🌵':'🌸'}</Text>
              <Text style={[styles.categoryText,category===c&&styles.categoryTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.headingRow}><View><Text style={styles.section}>Popular plants</Text><Text style={styles.sub}>{filtered.length} plants available</Text></View><TouchableOpacity onPress={onPlantsPress}><Text style={styles.seeAll}>View all</Text></TouchableOpacity></View>
        <View style={styles.grid}>
          {filtered.slice(0,6).map(p=><View key={p._id||p.id} style={styles.gridItem}><PlantCard plant={p} onPress={()=>onPlantPress(p)} onAdd={()=>onPlantPress(p)}/></View>)}
        </View>
      </ScrollView>
      <FooterNav active="home" onHome={()=>{}} onPlants={onPlantsPress} onCart={onCartPress} onProfile={onProfilePress} cartCount={cartCount}/>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#f7f9f5'},
  content:{paddingHorizontal:20,paddingTop:16,paddingBottom:25,maxWidth:1180,width:'100%',alignSelf:'center'},
  top:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:18},
  brand:{fontSize:23,fontWeight:'900',color:colors.primaryDark,letterSpacing:.5},
  welcome:{fontSize:12,color:colors.textLight,marginTop:4},
  cart:{width:46,height:46,borderRadius:23,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',elevation:2},
  badge:{position:'absolute',right:-1,top:-1,minWidth:18,height:18,borderRadius:9,backgroundColor:colors.accent,alignItems:'center',justifyContent:'center'},
  badgeText:{color:'#fff',fontSize:10,fontWeight:'800'},
  hero:{height:310,borderRadius:22,overflow:'hidden',marginBottom:20,backgroundColor:'#315b38'},
  heroImage:{width:'100%',height:'100%'},
  heroOverlay:{position:'absolute',left:0,top:0,bottom:0,width:'65%',padding:28,justifyContent:'center',backgroundColor:'rgba(23,60,31,.58)'},
  heroSmall:{fontSize:10,fontWeight:'900',color:'#d8f1dc',letterSpacing:1.2},
  heroTitle:{fontSize:34,fontWeight:'900',color:'#fff',lineHeight:39,marginTop:8},
  heroText:{fontSize:13,color:'#e9f5ea',lineHeight:19,marginTop:9,maxWidth:360},
  heroButton:{marginTop:17,backgroundColor:'#fff',borderRadius:24,paddingHorizontal:17,paddingVertical:11,flexDirection:'row',alignItems:'center',alignSelf:'flex-start',gap:7},
  heroButtonText:{color:'#234f2b',fontWeight:'900'},
  search:{height:54,backgroundColor:'#fff',borderRadius:15,flexDirection:'row',alignItems:'center',paddingHorizontal:16,marginBottom:25,borderWidth:1,borderColor:'#e5ebe4'},
  searchInput:{flex:1,marginLeft:9,color:colors.text},
  headingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginBottom:13},
  section:{fontSize:21,fontWeight:'900',color:colors.text},
  sub:{fontSize:12,color:colors.textLight,marginTop:3},
  seeAll:{fontSize:13,color:colors.primary,fontWeight:'800'},
  category:{width:92,height:92,borderRadius:16,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:10,borderWidth:1,borderColor:'#e5ebe4'},
  categoryActive:{backgroundColor:'#eaf5e9',borderColor:colors.primary},
  categoryIcon:{fontSize:30,marginBottom:5},
  categoryText:{fontSize:12,color:colors.textLight,fontWeight:'700'},
  categoryTextActive:{color:colors.primary},
  grid:{flexDirection:'row',flexWrap:'wrap',marginHorizontal:-6},
  gridItem:{width:'50%',paddingHorizontal:6}
});
