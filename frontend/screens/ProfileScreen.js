import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import FooterNav from '../components/FooterNav';
import colors from '../constants/colors';

export default function ProfileScreen({
  onHome,
  onPlants,
  onCart,
  onAI,
  onLogout,
  user,
}) {
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.heading}>My Profile</Text>

        {/* PROFILE */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🌿</Text>
          </View>

          <Text style={styles.name}>
            {user?.name || 'GreenLeaf BD User'}
          </Text>

          <Text style={styles.email}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>

        {/* PROFILE OPTIONS */}
        {[
          ['person-outline', 'Personal Information'],
          ['receipt-outline', 'My Orders'],
          ['heart-outline', 'Wishlist'],
          ['settings-outline', 'Settings'],
        ].map(([icon, label]) => (
          <TouchableOpacity
            style={styles.option}
            key={label}
          >
            <Ionicons
              name={icon}
              size={21}
              color={colors.primary}
            />

            <Text style={styles.optionText}>
              {label}
            </Text>

            <Ionicons
              name="chevron-forward"
              size={19}
              color={colors.textLight}
            />
          </TouchableOpacity>
        ))}

        {/* AI */}
        <TouchableOpacity
          style={styles.aiButton}
          onPress={onAI}
        >
          <Ionicons
            name="sparkles-outline"
            size={20}
            color={colors.primary}
          />

          <Text style={styles.aiText}>
            Ask GreenLeaf AI
          </Text>

          <Ionicons
            name="chevron-forward"
            size={19}
            color={colors.primary}
          />
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logout}
          onPress={onLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={21}
            color={colors.error}
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <FooterNav
        active="profile"
        onHome={onHome}
        onPlants={onPlants}
        onCart={onCart}
        onProfile={() => {}}
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
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },

  profile: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 38,
  },

  name: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginTop: 10,
  },

  email: {
    color: colors.textLight,
    marginTop: 4,
  },

  option: {
    height: 56,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  optionText: {
    flex: 1,
    marginLeft: 12,
    color: colors.text,
    fontWeight: '600',
  },

  aiButton: {
    height: 56,
    backgroundColor: '#EAF5E9',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 14,
  },

  aiText: {
    flex: 1,
    marginLeft: 10,
    color: colors.primary,
    fontWeight: '800',
  },

  logout: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    backgroundColor: '#FFF8F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 10,
  },

  logoutText: {
    color: colors.error,
    fontWeight: '800',
    marginLeft: 8,
  },
});