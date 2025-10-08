import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface SummaryModalProps {
  visible: boolean;
  onDismiss: () => void;
  summary: string;
}

export default function SummaryModal({ visible, onDismiss, summary }: SummaryModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ThemedText type="title" style={styles.title}>AI Summary</ThemedText>
          <ThemedText style={styles.summaryText}>{summary}</ThemedText>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <ThemedText style={styles.closeText}>Close</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 17, 23, 0.8)',
  },
  modal: {
    width: '85%',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30363D',
    backgroundColor: '#161B22',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#F0F6FC',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
    color: '#F0F6FC',
  },
  closeButton: {
    backgroundColor: '#58A6FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});