import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import colors from '../constants/colors';

export default function Cart({ cart, onBack, onRemove, onCheckout, onHome }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Cart" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        {cart.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>Add some beautiful plants to get started.</Text>
            <TouchableOpacity style={styles.shop} onPress={onHome}><Text style={styles.shopText}>Browse Plants</Text></TouchableOpacity>
          </View>
        ) : (
          <>
            {cart.map(item => (
              <View key={item.id} style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.thumb} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>৳{item.price.toFixed(2)} × {item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => onRemove(item.id)}>
                  <Ionicons name="trash-outline" size={21} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.summary}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.total}>৳{total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkout} onPress={onCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  item: { backgroundColor: colors.white, borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  thumb: { width: 72, height: 72, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: '800', color: colors.text },
  price: { color: colors.textLight, marginTop: 6 },
  summary: { backgroundColor: colors.white, borderRadius: 14, padding: 18, flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  summaryLabel: { fontSize: 17, fontWeight: '700', color: colors.text },
  total: { fontSize: 20, fontWeight: '900', color: colors.primary },
  checkout: { height: 52, backgroundColor: colors.primary, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  checkoutText: { color: colors.white, fontWeight: '800', fontSize: 15 },
  empty: { alignItems: 'center', marginTop: 90, padding: 20 },
  emptyIcon: { fontSize: 60 },
  emptyTitle: { fontSize: 22, fontWeight: '900', color: colors.text, marginTop: 15 },
  emptyText: { color: colors.textLight, textAlign: 'center', marginTop: 7 },
  shop: { backgroundColor: colors.primary, borderRadius: 11, paddingHorizontal: 25, paddingVertical: 13, marginTop: 22 },
  shopText: { color: colors.white, fontWeight: '800' },
});
