import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

interface ImuPanelProps {
  t: any;
  roll?: number;
  pitch?: number;
  yaw?: number;
}

export const ImuPanel: React.FC<ImuPanelProps> = ({ t, roll = 1.1, pitch = -2.4, yaw = 180 }) => (
  <View style={styles.panel}>
    <View style={styles.panelHeader}>
      <MaterialCommunityIcons name="axis-arrow" size={22} color={COLORS.primary} />
      <Text style={styles.panelTitle}>{t.imuTitle}</Text>
    </View>
    <View style={styles.imuRow}>
      <View style={styles.imuCol}>
        <Text style={styles.imuValue}>{roll}°</Text>
        <Text style={styles.imuLabel}>{t.roll}</Text>
      </View>
      <View style={styles.imuCol}>
        <Text style={styles.imuValue}>{pitch}°</Text>
        <Text style={styles.imuLabel}>{t.pitch}</Text>
      </View>
      <View style={styles.imuCol}>
        <Text style={styles.imuValue}>{yaw}°</Text>
        <Text style={styles.imuLabel}>{t.yaw}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  panel: { backgroundColor: COLORS.panel, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#333' },
  panelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  panelTitle: { color: COLORS.textDim, fontSize: 15, marginLeft: 8, fontWeight: 'bold' },
  imuRow: { flexDirection: 'row', justifyContent: 'space-around' },
  imuCol: { alignItems: 'center' },
  imuValue: { color: COLORS.text, fontSize: 20, fontWeight: 'bold' },
  imuLabel: { color: COLORS.textDim, fontSize: 12, marginTop: 2 },
});