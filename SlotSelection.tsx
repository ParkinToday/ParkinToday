import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaymentModal from './PaymentModal';

type Slot = {
  id: number;
  label: string;
  available: boolean;
};

export default function SlotSelection() {
  const navigation = useNavigation<any>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [slotCount, setSlotCount] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackTitleVisible: false,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#1c1c1e',
        height: 38,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 0,
      },
    });
  }, [navigation]);

  const slots: Slot[] = [
    { id: 1, label: 'A1', available: true },
    { id: 2, label: 'A2', available: false },
    { id: 3, label: 'A3', available: true },
    { id: 4, label: 'A4', available: false },
    { id: 5, label: 'A5', available: true },
    { id: 6, label: 'A6', available: true },
    { id: 7, label: 'A7', available: true },
    { id: 8, label: 'A8', available: false },
    { id: 9, label: 'A9', available: true },
    { id: 10, label: 'A10', available: false },
  ];

  const availableCount = slots.filter(slot => slot.available).length;
  const leftColumn = slots.filter((_, i) => i % 2 === 0);
  const rightColumn = slots.filter((_, i) => i % 2 !== 0);

  const handleSlotPress = (slot: Slot) => {
    if (!slot.available) {
      Alert.alert('Slot Unavailable', 'This slot is already occupied.');
      return;
    }

    const isSelected = selectedSlots.some(s => s.id === slot.id);

    if (isSelected) {
      setSelectedSlots(prev => prev.filter(s => s.id !== slot.id));
    } else {
      if (selectedSlots.length < slotCount) {
        const updated = [...selectedSlots, slot];
        setSelectedSlots(updated);

        if (updated.length === slotCount) {
          setModalVisible(true);
        }
      } else {
        Alert.alert('Limit Reached', `You can only select ${slotCount} slots.`);
      }
    }
  };

  const renderSlot = (slot: Slot) => {
    const isSelected = selectedSlots.some(s => s.id === slot.id);

    return (
      <TouchableOpacity
        key={slot.id}
        style={[
          styles.slot,
          {
            backgroundColor: !slot.available
              ? 'rgba(239, 68, 68, 0.75)'
              : isSelected
              ? '#3b82f6'
              : 'rgba(34, 197, 94, 0.75)',
          },
          !slot.available && styles.disabledSlot,
        ]}
        onPress={() => handleSlotPress(slot)}
      >
        <Text style={styles.slotLabel}>{slot.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve a Premium Spot</Text>
      <Text style={styles.subheading}>Effortless parking at your fingertips</Text>

      <View style={styles.infoCardWrapper}>
        <View style={styles.infoCard}>
          <Text style={styles.lotName}>Loyola ICAM College Parking Hub</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Available:</Text>
            <Text style={styles.infoValue}>
              {availableCount} / {slots.length}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price:</Text>
            <Text style={styles.priceValue}>₹15 / hour</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Slots:</Text>

            <Pressable
              onPress={() => setDropdownOpen(!dropdownOpen)}
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownText}>
                {slotCount} <Text style={styles.arrow}>{dropdownOpen ? '▲' : '▼'}</Text>
              </Text>
            </Pressable>

            <Modal transparent visible={dropdownOpen} animationType="fade">
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setDropdownOpen(false)}
              >
                <View style={styles.dropdown}>
                  {[1, 2, 3].map(count => (
                    <TouchableOpacity
                      key={count}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSlotCount(count);
                        setSelectedSlots([]);
                        setDropdownOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{count}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Pressable>
            </Modal>
          </View>
        </View>
      </View>

      <View style={styles.slotContainer}>
        <View>{leftColumn.map(renderSlot)}</View>
        <View>{rightColumn.map(renderSlot)}</View>
      </View>

      {selectedSlots.length === slotCount && (
        <PaymentModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedSlots([]);
          }}
          price={15 * slotCount}
        />
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');
const SLOT_WIDTH = (width - 120) / 2;
const SLOT_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 8,
  },
  subheading: {
    color: '#c0c0c0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoCardWrapper: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  infoCard: {
    backgroundColor: '#1f2937',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  lotName: {
    fontSize: 22,
    color: '#f8fafc',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: '800',
  },
  priceValue: {
    fontSize: 18,
    color: '#fbbf24',
    fontWeight: '700',
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slot: {
    width: SLOT_WIDTH,
    height: SLOT_HEIGHT,
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#3f3f46',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  disabledSlot: {
    opacity: 0.6,
    borderColor: '#ef4444',
  },
  slotLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
    fontVariant: ['small-caps'],
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#f8fafc',
  },
  arrow: {
    fontSize: 14,
    marginLeft: 6,
    color: '#a1a1aa',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090',
  },
  dropdown: {
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 10,
    elevation: 6,
    minWidth: 80,
  },
  dropdownItem: {
    padding: 10,
    alignItems: 'center',
  },
});
