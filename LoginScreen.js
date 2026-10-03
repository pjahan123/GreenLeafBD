import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function LoginScreen({ onLogin, onRegister, loading = false, error = '' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <View style={styles.logoCircle}><Text style={styles.logo}>🌿</Text></View>
        <Text style={styles.title}>Welcome to GreenLeaf BD</Text>
        <Text style={styles.subtitle}>Your little corner of nature</Text>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={20} color={colors.textLight} />
          <TextInput value={email} onChangeText={setEmail} placeholder="Enter your email" placeholderTextColor={colors.textLight} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.textLight} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Enter your password" placeholderTextColor={colors.textLight} style={styles.input} secureTextEntry />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => onLogin(email, password)} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>

        <Text style={{ color: colors.error, textAlign: "center", marginTop: 12 }}>{error}</Text>        <View style={styles.registerRow}>
          <Text style={styles.muted}>Don't have an account? </Text>
          <TouchableOpacity onPress={onRegister}><Text style={styles.link}>Create account</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  logoCircle: { width: 78, height: 78, borderRadius: 39, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 18 },
  logo: { fontSize: 42 },
  title: { textAlign: 'center', fontSize: 27, fontWeight: '800', color: colors.text },
  subtitle: { textAlign: 'center', color: colors.textLight, marginTop: 6, marginBottom: 32 },
  label: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 7, marginTop: 12 },
  inputWrap: { height: 52, backgroundColor: colors.white, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, borderWidth: 1, borderColor: colors.border },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: colors.text },
  button: { height: 52, backgroundColor: colors.primary, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 25 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  muted: { color: colors.textLight },
  link: { color: colors.primary, fontWeight: '800' },
});
