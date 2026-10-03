import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import Header from '../components/Header';
import FooterNav from '../components/FooterNav';
import colors from '../constants/colors';
import { createOrder } from '../services/api';

export default function CheckoutScreen({
  cart,
  token,
  onBack,
  onOrderPlaced,
  onHome,
  onPlants,
  onCart,
  onProfile,
  cartCount = 0,
}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const placeOrder = async () => {
    if (placingOrder) return;

    // Check cart
    if (!cart || cart.length === 0) {
      window.alert('Your cart is empty.');
      return;
    }

    // Check login
    if (!token) {
      window.alert('Please login before placing an order.');
      return;
    }

    // Check delivery information
    if (
      !name.trim() ||
      !address.trim() ||
      !phone.trim()
    ) {
      window.alert(
        'Please fill in your name, phone number and address.'
      );
      return;
    }

    setPlacingOrder(true);

    try {
      const items = cart.map((item) => ({
        name: item.name || 'Plant',
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
      }));

      console.log('PLACING ORDER...');
      console.log('Items:', items);

      const result = await createOrder(
        token,
        items,
        {
          name: name.trim(),
          address: address.trim(),
          phone: phone.trim(),
        }
      );

      console.log('ORDER SUCCESS:', result);

      // Stop loading
      setPlacingOrder(false);

      // Show success message
      window.alert(
        'Order placed successfully! 🌿\n\n' +
        'Thank you for shopping with GreenLeaf BD.'
      );

      // Clear cart and go home
      onOrderPlaced();

    } catch (error) {
      console.error('ORDER FAILED:', error);

      setPlacingOrder(false);

      window.alert(
        'Order failed:\n\n' +
        (error?.message || 'Something went wrong.')
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Header
        title="Checkout"
        onBack={onBack}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.heading}>
          Delivery Information
        </Text>

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={colors.textLight}
          style={styles.input}
        />

        <Text style={styles.label}>
          Phone
        </Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="01XXXXXXXXX"
          placeholderTextColor={colors.textLight}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>
          Address
        </Text>

        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your delivery address"
          placeholderTextColor={colors.textLight}
          style={[styles.input, styles.area]}
          multiline
        />

        <Text style={styles.heading}>
          Order Summary
        </Text>

        {cart.map((item) => (
          <View
            key={item._id || item.id}
            style={styles.summaryRow}
          >
            <Text style={styles.itemText}>
              {item.name} × {item.quantity}
            </Text>

            <Text style={styles.itemPrice}>
              ৳
              {(
                Number(item.price || 0) *
                Number(item.quantity || 0)
              ).toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.totalRow}>

          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.total}>
            ৳{total.toFixed(2)}
          </Text>

        </View>

        <TouchableOpacity
          style={[
            styles.button,
            placingOrder && styles.buttonDisabled,
          ]}
          onPress={placeOrder}
          disabled={placingOrder}
        >

          {placingOrder ? (
            <>
              <ActivityIndicator
                size="small"
                color={colors.white}
              />

              <Text style={styles.buttonText}>
                {'  '}Placing Order...
              </Text>
            </>
          ) : (
            <Text style={styles.buttonText}>
              Place Order
            </Text>
          )}

        </TouchableOpacity>

      </ScrollView>

      <FooterNav
        active="cart"
        onHome={onHome}
        onPlants={onPlants}
        onCart={onCart}
        onProfile={onProfile}
        cartCount={cartCount}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  heading: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 13,
    marginTop: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    color: colors.text,
  },

  area: {
    height: 90,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  summaryRow: {
    backgroundColor: colors.white,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemText: {
    color: colors.text,
    flex: 1,
  },

  itemPrice: {
    fontWeight: '700',
    color: colors.text,
  },

  totalRow: {
    backgroundColor: colors.white,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '800',
  },

  total: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },

  button: {
    height: 53,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 22,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },

});