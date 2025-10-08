import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';
import { ThemedText } from './themed-text';

export interface NewsItem {
  title: string;
  source: {
    name: string;
  };
  publishedAt: string;
  urlToImage: string | null;
  description?: string;
  content?: string;
}

interface NewsCardProps {
  item: NewsItem;
  onSummaryPress: (item: NewsItem) => void;
  onPress: (item: NewsItem) => void;
}

export default function NewsCard({ item, onSummaryPress, onPress }: NewsCardProps) {
  const formattedTime = moment(item.publishedAt).fromNow();
  const metaColor = useThemeColor({}, 'icon');
  const buttonColor = useThemeColor({}, 'tint');
  const cardBackground = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardBackground, borderColor: borderColor }]}
      onPress={() => onPress(item)}
    >
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
      )}
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText style={[styles.meta, { color: metaColor }]}>
          {item.source.name} • {formattedTime}
        </ThemedText>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={() => onSummaryPress(item)}
        >
          <Ionicons name="bulb-outline" size={16} color="#fff" />
          <ThemedText style={styles.buttonText}> AI Summary</ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
    lineHeight: 24,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});