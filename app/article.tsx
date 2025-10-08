import { NewsItem } from '@/components/NewsCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ArticleScreen() {
  const { item: itemStr } = useLocalSearchParams<{ item: string }>();
  const item: NewsItem = JSON.parse(itemStr || '{}');

  if (!item.title) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Article not found</ThemedText>
      </ThemedView>
    );
  }

  const formattedTime = moment(item.publishedAt).fromNow();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        {item.urlToImage && (
          <Image source={{ uri: item.urlToImage }} style={styles.image} />
        )}
        <ThemedText type="title" style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.meta}>
          {item.source.name} • {formattedTime}
        </ThemedText>
        {item.description && (
          <ThemedText style={styles.description}>
            {item.description}
          </ThemedText>
        )}
        <ThemedText style={styles.contentText}>
          {item.content || 'Full article content would be displayed here. In a real app, this would be fetched from the news source.'}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#30363D',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 34,
    color: '#F0F6FC',
  },
  meta: {
    fontSize: 14,
    color: '#8B949E',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 26,
    color: '#F0F6FC',
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#F0F6FC',
  },
});