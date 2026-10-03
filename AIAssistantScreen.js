import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,SafeAreaView,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import FooterNav from '../components/FooterNav';
import {askGreenLeafAI} from '../services/ai';
import colors from '../constants/colors';

export default function AIAssistantScreen({plant,cart,onHome,onPlants,onCart,onProfile,cartCount=0}){
 const [question,setQuestion]=useState('');
 const [messages,setMessages]=useState([{role:'ai',text:'Hi! I’m GreenLeaf AI 🌿 Ask me about plant care or tell me what kind of plant you want.'}]);
 const [loading,setLoading]=useState(false);
 const ask=async(q=question)=>{
   if(!q.trim()||loading)return;
   const text=q.trim();setQuestion('');setMessages(m=>[...m,{role:'user',text}]);setLoading(true);
   try{const d=await askGreenLeafAI(text,plant?.name,cart);setMessages(m=>[...m,{role:'ai',text:d.answer}]);}
   catch(e){setMessages(m=>[...m,{role:'ai',text:e.message||'AI is temporarily unavailable.'}]);}
   finally{setLoading(false);}
 };
 return <SafeAreaView style={styles.container}>
   <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.header}><View><Text style={styles.kicker}>GREENLEAF AI</Text><Text style={styles.title}>Plant Care Assistant</Text></View><View style={styles.aiIcon}><Ionicons name="sparkles" size={23} color="#fff"/></View></View>
    <View style={styles.chips}>
      {['How often should I water my plants?','Best plant for a low-light room?','What plant is good for beginners?'].map(x=><TouchableOpacity key={x} onPress={()=>ask(x)} style={styles.chip}><Text style={styles.chipText}>{x}</Text></TouchableOpacity>)}
    </View>
    <View style={styles.chat}>
      {messages.map((m,i)=><View key={i} style={[styles.bubble,m.role==='user'?styles.user:styles.ai]}><Text style={[styles.bubbleText,m.role==='user'&&styles.userText]}>{m.text}</Text></View>)}
      {loading&&<View style={styles.ai}><ActivityIndicator color={colors.primary}/></View>}
    </View>
    <View style={styles.inputRow}><TextInput value={question} onChangeText={setQuestion} onSubmitEditing={()=>ask()} placeholder="Ask GreenLeaf AI..." placeholderTextColor={colors.textLight} style={styles.input}/><TouchableOpacity style={styles.send} onPress={()=>ask()}><Ionicons name="send" size={19} color="#fff"/></TouchableOpacity></View>
   </ScrollView>
   <FooterNav active="profile" onHome={onHome} onPlants={onPlants} onCart={onCart} onProfile={onProfile} cartCount={cartCount}/>
 </SafeAreaView>
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#f7f9f5'},content:{padding:20,maxWidth:900,width:'100%',alignSelf:'center',paddingBottom:25},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:18},kicker:{fontSize:11,fontWeight:'900',letterSpacing:1,color:colors.primary},title:{fontSize:27,fontWeight:'900',color:colors.text},aiIcon:{width:48,height:48,borderRadius:24,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center'},chips:{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:14},chip:{backgroundColor:'#eaf5e9',borderRadius:20,paddingHorizontal:13,paddingVertical:9},chipText:{fontSize:11,color:colors.primaryDark,fontWeight:'700'},chat:{backgroundColor:'#fff',borderRadius:18,padding:14,minHeight:330,borderWidth:1,borderColor:'#e5ebe4'},bubble:{padding:13,borderRadius:15,maxWidth:'88%',marginBottom:10},ai:{alignSelf:'flex-start',backgroundColor:'#f0f5ef'},user:{alignSelf:'flex-end',backgroundColor:colors.primary},bubbleText:{fontSize:13,lineHeight:20,color:colors.text},userText:{color:'#fff'},inputRow:{flexDirection:'row',alignItems:'center',marginTop:12},input:{flex:1,height:50,backgroundColor:'#fff',borderWidth:1,borderColor:'#dfe8dd',borderRadius:25,paddingHorizontal:17,color:colors.text},send:{width:50,height:50,borderRadius:25,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center',marginLeft:8}
});
