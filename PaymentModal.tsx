
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';


interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  price: number;
}


const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onClose, price }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>  
          </TouchableOpacity>


          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Estimated Price: {price.toFixed(2)}</Text>
          </View>


          <TouchableOpacity style={styles.payButton}>
            <Image source={require('./assets/Frame-43-1.webp')} style={styles.icon} />
            <Text style={styles.payText}>Google Pay</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.payButton}>
            <Image source={require('./assets/parkinpay.png')} style={styles.icon} />
            <Text style={styles.payText}>Parkin Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    width: '80%',
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 20,
  },
  priceContainer: {
    backgroundColor: '#1c2b3a',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  payText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});


export default PaymentModal; 