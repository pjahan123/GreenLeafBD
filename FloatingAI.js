import React,{useState} from 'react';
import {Modal,View,Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {askGreenLeafAI} from '../services/ai';
import colors from '../constants/colors';

export default function FloatingAI({plant=null,cart=[]}){
 const [open,setOpen]=useState(false); const [q,setQ]=useState(''); const [busy,setBusy]=useState(false);
 const [msgs,setMsgs]=useState([{role:'ai',text:'Hi! I’m GreenLeaf AI 🌿 How can I help with your plants today?'}]);
 const send=async(text=q)=>{ if(!text.trim()||busy)return; const t=text.trim(); setQ(''); setMsgs(m=>[...m,{role:'user',text:t}]); setBusy(true);
   try{const d=await askGreenLeafAI(t,plant?.name,cart); setMsgs(m=>[...m,{role:'ai',text:d.answer}]);}
   catch(e){setMsgs(m=>[...m,{role:'ai',text:e.message||'I could not connect to GreenLeaf AI.'}]);}
   finally{setBusy(false);}
 };
 return <>
  <TouchableOpacity style={styles.fab} onPress={()=>setOpen(true)} activeOpacity={.9}><Ionicons name="sparkles" size={21} color="#fff"/><View style={styles.dot}/></TouchableOpacity>
  <Modal visible={open} transparent animationType="fade" onRequestClose={()=>setOpen(false)}>
   <View style={styles.backdrop}><View style={styles.panel}>
    <View style={styles.head}><View style={styles.aiCircle}><Ionicons name="leaf" size={19} color="#fff"/></View><View style={{flex:1}}><Text style={styles.title}>GreenLeaf AI</Text><Text style={styles.sub}>Plant care & shopping assistant</Text></View><TouchableOpacity onPress={()=>setOpen(false)}><Ionicons name="close" size={24} color={colors.textLight}/></TouchableOpacity></View>
    <View style={styles.quick}>{['Care tips','Low-light plants','Help me choose'].map(x=><TouchableOpacity key={x} onPress={()=>send(x)} style={styles.quickBtn}><Text style={styles.quickText}>{x}</Text></TouchableOpacity>)}</View>
    <ScrollView style={styles.chat} contentContainerStyle={{paddingBottom:8}}>{msgs.map((m,i)=><View key={i} style={[styles.bubble,m.role==='user'?styles.user:styles.ai]}><Text style={[styles.btext,m.role==='user'&&styles.userText]}>{m.text}</Text></View>)}{busy&&<View style={styles.ai}><ActivityIndicator color={colors.primary}/></View>}</ScrollView>
    <View style={styles.inputRow}><TextInput value={q} onChangeText={setQ} placeholder="Ask about a plant..." placeholderTextColor="#8a978b" style={styles.input} onSubmitEditing={()=>send()}/><TouchableOpacity style={styles.send} onPress={()=>send()}><Ionicons name="arrow-up" size={19} color="#fff"/></TouchableOpacity></View>
   </View></View>
  </Modal>
 </>;
}
const styles=StyleSheet.create({fab:{position:'absolute',right:20,bottom:86,width:58,height:58,borderRadius:29,backgroundColor:'#2e7d32',alignItems:'center',justifyContent:'center',elevation:7,shadowColor:'#000',shadowOpacity:.18,shadowRadius:7,shadowOffset:{width:0,height:3}},dot:{position:'absolute',right:2,top:1,width:12,height:12,borderRadius:6,backgroundColor:'#8bc34a',borderWidth:2,borderColor:'#fff'},backdrop:{flex:1,backgroundColor:'rgba(0,0,0,.35)',justifyContent:'flex-end'},panel:{backgroundColor:'#f7faf6',height:'78%',borderTopLeftRadius:25,borderTopRightRadius:25,padding:16,maxWidth:650,width:'100%',alignSelf:'center'},head:{flexDirection:'row',alignItems:'center',paddingBottom:12},aiCircle:{width:40,height:40,borderRadius:20,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center',marginRight:10},title:{fontSize:18,fontWeight:'900',color:colors.text},sub:{fontSize:11,color:colors.textLight,marginTop:2},quick:{flexDirection:'row',gap:7,flexWrap:'wrap',marginBottom:10},quickBtn:{backgroundColor:'#e7f3e6',paddingHorizontal:11,paddingVertical:7,borderRadius:16},quickText:{fontSize:11,fontWeight:'700',color:colors.primaryDark},chat:{flex:1,backgroundColor:'#fff',borderRadius:17,padding:12,borderWidth:1,borderColor:'#e1e9df'},bubble:{maxWidth:'88%',padding:11,borderRadius:14,marginBottom:8},ai:{alignSelf:'flex-start',backgroundColor:'#eef5ed'},user:{alignSelf:'flex-end',backgroundColor:colors.primary},btext:{fontSize:12.5,lineHeight:19,color:colors.text},userText:{color:'#fff'},inputRow:{flexDirection:'row',marginTop:10,alignItems:'center'},input:{flex:1,height:48,backgroundColor:'#fff',borderWidth:1,borderColor:'#dce6da',borderRadius:24,paddingHorizontal:15,color:colors.text},send:{width:48,height:48,borderRadius:24,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center',marginLeft:7}});
