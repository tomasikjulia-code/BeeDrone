import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { COLORS } from '../constants/theme';

interface BluetoothModalProps {
  visible: boolean;
  isScanning: boolean;
  devices: Device[];
  t: any;
  onConnect: (device: Device) => void;
  onScanAgain: () => void;
  onClose: () => void;
}

export const BluetoothModal: React.FC<BluetoothModalProps> = ({
  visible,
  isScanning,
  devices,
  t,
  onConnect,
  onScanAgain,
  onClose,
}) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Ionicons name="bluetooth" size={24} color={COLORS.primary} />
          <Text style={styles.modalTitle}>{t.scanTitle}</Text>
        </View>
        <Text style={styles.modalSubTitle}>{isScanning ? t.scanning : t.noDevices}</Text>

        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.deviceItem} onPress={() => onConnect(item)}>
              <View>
                <Text style={styles.deviceName}>{item.name || 'Nieznane urządzenie'}</Text>
                <Text style={styles.deviceRssi}>ID: {item.id}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        />

        {!isScanning && (
          <TouchableOpacity style={styles.scanAgainButton} onPress={onScanAgain}>
            <Ionicons name="refresh" size={18} color={COLORS.background} />
            <Text style={styles.scanAgainButtonText}>{t.scanAgain}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>{t.cancel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: COLORS.panel, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#333', maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  modalTitle: { color: COLORS.text, fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  modalSubTitle: { color: COLORS.textDim, fontSize: 13, marginBottom: 16 },
  deviceItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#181818', padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#2A2A2A' },
  deviceName: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  deviceRssi: { color: COLORS.textDim, fontSize: 12, marginTop: 2 },
  scanAgainButton: { backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 12, marginTop: 10 },
  scanAgainButtonText: { color: COLORS.background, fontWeight: 'bold', fontSize: 14, marginLeft: 6 },
  cancelButton: { marginTop: 10, backgroundColor: '#2A2A2A', padding: 12, borderRadius: 12, alignItems: 'center' },
  cancelButtonText: { color: COLORS.text, fontWeight: 'bold', fontSize: 14 },
});