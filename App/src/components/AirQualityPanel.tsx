import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

interface AirQualityPanelProps {
  t: any;
  voc?: number;
  nox?: number;
}

export const AirQualityPanel: React.FC<AirQualityPanelProps> = ({ t, voc = 100, nox = 1 }) => (
  <View style={styles.panel}>
    <View style={styles.panelHeader}>
      <MaterialCommunityIcons name="air-filter" size={22} color={COLORS.primary} />
      <Text style={styles.panelTitle}>{t.pollution}</Text>
    </View>
    <View style={styles.sgpRow}>
      <View style={styles.sgpCol}>
        <Text style={styles.bigValue}>{voc}</Text>
        <Text style={styles.sgpLabel}>{t.voc}</Text>
      </View>
      <View style={styles.sgpCol}>
        <Text style={styles.bigValue}>{nox}</Text>
        <Text style={styles.sgpLabel}>{t.nox}</Text>
      </View>
    </View>
    <Text style={styles.subText}>{t.airGood}</Text>
  </View>
);

const styles = StyleSheet.create({
  panel: { backgroundColor: COLORS.panel, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#333' },
  panelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  panelTitle: { color: COLORS.textDim, fontSize: 15, marginLeft: 8, fontWeight: 'bold' },
  sgpRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 4 },
  sgpCol: { alignItems: 'center' },
  sgpLabel: { color: COLORS.textDim, fontSize: 13, marginTop: 2 },
  bigValue: { color: COLORS.primary, fontSize: 32, fontWeight: '900' },
  subText: { color: COLORS.success, textAlign: 'center', marginTop: 6, fontWeight: '600', fontSize: 13 },
});