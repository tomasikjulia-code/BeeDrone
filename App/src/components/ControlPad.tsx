import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HEX_SIZE } from '../constants/theme';
import { HexButton } from './HexButtons';

export const ControlPad: React.FC = () => (
  <View style={styles.controlsWrapper}>
    <View style={styles.altContainer}>
      <HexButton icon="caret-up" style={styles.altUp} />
      <HexButton icon="caret-down" style={styles.altDown} />
    </View>

    <View style={styles.dpad}>
      <HexButton icon="chevron-up" style={styles.dpadUp} />
      <HexButton icon="chevron-back" style={styles.dpadLeft} />
      <HexButton icon="chevron-forward" style={styles.dpadRight} />
      <HexButton icon="chevron-down" style={styles.dpadDown} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  controlsWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 0 },
  altContainer: { width: HEX_SIZE, height: HEX_SIZE * 2 + 10 },
  altUp: { top: 0, left: 0 },
  altDown: { top: HEX_SIZE + 10, left: 0 },
  dpad: { width: 200, height: 250 },
  dpadUp: { top: 0, left: 50 },
  dpadLeft: { top: 72, left: -20 },
  dpadRight: { top: 72, left: 120 },
  dpadDown: { top: 144, left: 50 },
});