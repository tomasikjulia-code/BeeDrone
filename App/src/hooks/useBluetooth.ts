import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const manager = new BleManager();

export const useBluetooth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const apiLevel = parseInt(Platform.Version.toString(), 10);
      if (apiLevel >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  const startScanning = () => {
    try { manager.stopDeviceScan(); } catch (e) {}
    setIsScanning(true);
    setDevices([]);

    try {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          setIsScanning(false);
          return;
        }
        if (device && device.name) {
          setDevices((prev) => (prev.some((d) => d.id === device.id) ? prev : [...prev, device]));
        }
      });
    } catch (e) {
      setIsScanning(false);
    }

    setTimeout(() => {
      try { manager.stopDeviceScan(); } catch (e) {}
      setIsScanning(false);
    }, 10000);
  };

  const handleBluetoothPress = async () => {
    if (isConnected && connectedDevice) {
      try { await connectedDevice.cancelConnection(); } catch (e) {}
      setIsConnected(false);
      setConnectedDevice(null);
    } else {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        alert('Brak uprawnień do korzystania z Bluetooth / Lokalizacji.');
        return;
      }
      setDevices([]);
      setModalVisible(true);
      startScanning();
    }
  };

  const connectToDevice = async (device: Device) => {
    try {
      manager.stopDeviceScan();
      setIsScanning(false);
      const connected = await device.connect();
      await connected.discoverAllServicesAndCharacteristics();

      setConnectedDevice(connected);
      setIsConnected(true);
      setModalVisible(false);
    } catch (error) {
      alert('Nie udało się połączyć z urządzeniem.');
    }
  };

  const closeModal = () => {
    try { manager.stopDeviceScan(); } catch (e) {}
    setIsScanning(false);
    setModalVisible(false);
  };

  return {
    isConnected,
    modalVisible,
    devices,
    connectedDevice,
    isScanning,
    handleBluetoothPress,
    startScanning,
    connectToDevice,
    closeModal,
  };
};