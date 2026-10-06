import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AirQualityPanel } from '../components/AirQualityPanel';
import { BluetoothModal } from '../components/BluetoothModal';
import { BottomTabBar } from '../components/BottomTabBar';
import { ControlPad } from '../components/ControlPad';
import { ImuPanel } from '../components/ImuPanel';
import { TelemetryPanel } from '../components/TelemetryPanel';
import { COLORS } from '../constants/theme';
import { Language, translations } from '../constants/translations';
import { useBluetooth } from '../hooks/useBluetooth';
import { styles } from '../styles/global';

export default function App() {
  const [lang, setLang] = useState<Language>('pl');
  const [activeTab, setActiveTab] = useState<'pulpit' | 'archive'>('pulpit');
  const [isLogging, setIsLogging] = useState(false);
  const [altitude, setAltitude] = useState<number>(1.25);
  const [targetSpeed, setTargetSpeed] = useState<number>(5.0);

  const t = translations[lang];
  const ble = useBluetooth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {activeTab === 'pulpit' ? (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.statusBadge, ble.isConnected && styles.statusBadgeConnected]}
              onPress={ble.handleBluetoothPress}
              activeOpacity={0.8}
            >
              <Ionicons name="bluetooth" size={18} color={ble.isConnected ? COLORS.success : COLORS.textDim} />
              <Text style={[styles.statusText, ble.isConnected && styles.statusTextConnected]}>
                {ble.isConnected ? `${t.connected} (${ble.connectedDevice?.name || 'ESP32'})` : t.disconnected}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLang(lang === 'pl' ? 'en' : 'pl')} style={styles.langBtn}>
              <Text style={styles.langText}>{lang === 'pl' ? '🇬🇧 EN' : '🇵🇱 PL'}</Text>
            </TouchableOpacity>
          </View>

          <AirQualityPanel t={t} />

          <TouchableOpacity
            style={[styles.logButton, isLogging && styles.logButtonActive]}
            onPress={() => setIsLogging(!isLogging)}
          >
            <MaterialCommunityIcons
              name={isLogging ? 'stop-circle-outline' : 'record-circle-outline'}
              size={22}
              color={isLogging ? COLORS.danger : COLORS.background}
            />
            <Text style={[styles.logButtonText, isLogging && styles.logButtonTextActive]}>
              {isLogging ? t.logActive : t.logSession}
            </Text>
          </TouchableOpacity>

          <ImuPanel t={t} />

          <TelemetryPanel
            t={t}
            altitude={altitude}
            targetSpeed={targetSpeed}
            onDecreaseSpeed={() => setTargetSpeed((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10))}
            onIncreaseSpeed={() => setTargetSpeed((prev) => Math.min(15.0, Math.round((prev + 0.5) * 10) / 10))}
          />

          <ControlPad />
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.archiveHeader}>
            <MaterialCommunityIcons name="book-open-variant" size={24} color={COLORS.primary} />
            <Text style={styles.archiveTitleText}>{t.archiveTitle}</Text>
          </View>
          <View style={styles.panel}>
            <Text style={styles.archiveText}>{t.archiveEmpty}</Text>
          </View>
        </ScrollView>
      )}

      <BluetoothModal
        visible={ble.modalVisible}
        isScanning={ble.isScanning}
        devices={ble.devices}
        t={t}
        onConnect={ble.connectToDevice}
        onScanAgain={ble.startScanning}
        onClose={ble.closeModal}
      />

      {/* Wyselekcjonowany dolny pasek */}
      <BottomTabBar activeTab={activeTab} onSelectTab={setActiveTab} t={t} 
      />
    </SafeAreaView>
  );
}