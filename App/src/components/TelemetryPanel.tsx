import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

interface TelemetryPanelProps {
  t: any;
  altitude: number;
  targetSpeed: number;
  onIncreaseSpeed: () => void;
  onDecreaseSpeed: () => void;
}

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({
  t,
  altitude,
  targetSpeed,
  onIncreaseSpeed,
  onDecreaseSpeed,
}) => (
  <View style={styles.panel}>
    <View style={styles.panelHeader}>
      <MaterialCommunityIcons name="speedometer" size={22} color={COLORS.primary} />
      <Text style={styles.panelTitle}>{t.telemetryTitle}</Text>
    </View>
    <View style={styles.telemetryRow}>
      <View style={styles.telemetryCol}>
        <Text style={styles.telemetryValue}>{altitude.toFixed(2)} m</Text>
        <Text style={styles.telemetryLabel}>{t.altitude}</Text>
      </View>

      <View style={styles.telemetryCol}>
        <View style={styles.speedControlRow}>
          <Text style={styles.telemetryValue}>{targetSpeed.toFixed(1)} m/s</Text>
          <TouchableOpacity style={styles.speedBtn} onPress={onDecreaseSpeed}>
            <Ionicons name="remove" size={18} color={COLORS.background} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.speedBtn} onPress={onIncreaseSpeed}>
            <Ionicons name="add" size={18} color={COLORS.background} />
          </TouchableOpacity>
        </View>
        <Text style={styles.telemetryLabel}>{t.targetSpeed}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  panel: { backgroundColor: COLORS.panel, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#333' },
  panelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  panelTitle: { color: COLORS.textDim, fontSize: 15, marginLeft: 8, fontWeight: 'bold' },
  telemetryRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 4 },
  telemetryCol: { alignItems: 'center' },
  telemetryLabel: { color: COLORS.textDim, fontSize: 13, marginTop: 4 },
  telemetryValue: { color: COLORS.primary, fontSize: 26, fontWeight: '900' },
  speedControlRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  speedBtn: { backgroundColor: COLORS.primary, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
});