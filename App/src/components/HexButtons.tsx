import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, HEX_SIZE, ICON_SIZE } from '../constants/theme';

interface HexButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: any;
}

export const HexButton: React.FC<HexButtonProps> = ({ icon, onPress, style }) => (
  <TouchableOpacity style={[styles.hexButton, style]} onPress={onPress} activeOpacity={0.7}>
    <MaterialCommunityIcons name="hexagon" size={HEX_SIZE} color={COLORS.primary} style={styles.hexBg} />
    <MaterialCommunityIcons name="hexagon-outline" size={HEX_SIZE} color={COLORS.background} style={styles.hexBg} />
    <Ionicons name={icon} size={ICON_SIZE} color={COLORS.background} style={styles.hexIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  hexButton: { width: HEX_SIZE, height: HEX_SIZE, justifyContent: 'center', alignItems: 'center', position: 'absolute' },
  hexBg: { position: 'absolute', textAlign: 'center' },
  hexIcon: { position: 'absolute', zIndex: 2 },
});