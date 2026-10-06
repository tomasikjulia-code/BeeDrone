import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../constants/theme';
import { styles } from '../styles/global';

type TabType = 'pulpit' | 'archive';

interface BottomTabBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  t: any;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onSelectTab, t }) => {
  return (
    <View style={styles.bottomTabBar}>
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => onSelectTab('pulpit')} 
        activeOpacity={0.8}
      >
        <Ionicons 
          name="home" 
          size={24} 
          color={activeTab === 'pulpit' ? COLORS.primary : COLORS.textDim} 
        />
        <Text style={[styles.tabText, activeTab === 'pulpit' && styles.tabTextActive]}>
          {t.tabPulpit}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => onSelectTab('archive')} 
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="book-open-variant"
          size={24}
          color={activeTab === 'archive' ? COLORS.primary : COLORS.textDim}
        />
        <Text style={[styles.tabText, activeTab === 'archive' && styles.tabTextActive]}>
          {t.tabArchive}
        </Text>
      </TouchableOpacity>
    </View>
  );
};