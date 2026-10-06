import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingHorizontal: 18, paddingVertical: 12, flexGrow: 1, justifyContent: 'space-evenly', paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.panel, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#333' },
  statusBadgeConnected: { borderColor: COLORS.success },
  statusText: { color: COLORS.textDim, marginLeft: 8, fontWeight: '600', fontSize: 13 },
  statusTextConnected: { color: COLORS.success },
  langBtn: { backgroundColor: COLORS.panel, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  langText: { color: COLORS.text, fontWeight: 'bold', fontSize: 14 },
  panel: { backgroundColor: COLORS.panel, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#333' },
  logButton: { backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 14, elevation: 4 },
  logButtonActive: { backgroundColor: 'transparent', borderWidth: 2, borderColor: COLORS.danger, elevation: 0 },
  logButtonText: { color: COLORS.background, fontSize: 15, fontWeight: 'bold', marginLeft: 8 },
  logButtonTextActive: { color: COLORS.danger },
  archiveHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  archiveTitleText: { color: COLORS.text, fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  archiveText: { color: COLORS.textDim, fontSize: 14, textAlign: 'center', paddingVertical: 20 },
  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: '#1E1E1E', borderTopWidth: 1, borderTopColor: '#333', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 4 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  tabText: { color: COLORS.textDim, fontSize: 12, fontWeight: '600', marginTop: 2 },
  tabTextActive: { color: COLORS.primary },
});