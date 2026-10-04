import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function RegisterScreen({ onRegister, onLogin, loading = false, error = '' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.logoCircle}><Text style={styles.logo}>🌱</Text></View>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Join the GreenLeaf BD community</Text>

      <Text style={styles.label}>Full name</Text>
      <View style={styles.inputWrap}><Ionicons name="person-outline" size={20} color={colors.textLight} /><TextInput value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={colors.textLight} style={styles.input} /></View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrap}><Ionicons name="mail-outline" size={20} color={colors.textLight} /><TextInput value={email} onChangeText={setEmail} placeholder="Your email" placeholderTextColor={colors.textLight} style={styles.input} keyboardType="email-address" autoCapitalize="none" /></View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrap}><Ionicons name="lock-closed-outline" size={20} color={colors.textLight} /><TextInput value={password} onChangeText={setPassword} placeholder="Create a password" placeholderTextColor={colors.textLight} style={styles.input} secureTextEntry /></View>

      <TouchableOpacity style={styles.button} onPress={() => onRegister(name, email, password)} disabled={loading}><Text style={styles.buttonText}>{loading ? "Creating..." : "Create Account"}</Text></TouchableOpacity>

      <Text style={{ color: colors.error, textAlign: "center", marginTop: 12 }}>{error}</Text>      <View style={styles.row}><Text style={styles.muted}>Already have an account? </Text><TouchableOpacity onPress={onLogin}><Text style={styles.link}>Login</Text></TouchableOpacity></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 70, paddingBottom: 40 },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 18 },
  logo: { fontSize: 38 },
  title: { textAlign: 'center', fontSize: 26, fontWeight: '800', color: colors.text },
  subtitle: { textAlign: 'center', color: colors.textLight, marginTop: 6, marginBottom: 28 },
  label: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 7, marginTop: 12 },
  inputWrap: { height: 52, backgroundColor: colors.white, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, borderWidth: 1, borderColor: colors.border },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: colors.text },
  button: { height: 52, backgroundColor: colors.primary, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 25 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  muted: { color: colors.textLight },
  link: { color: colors.primary, fontWeight: '800' },
});
