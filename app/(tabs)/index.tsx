import NewsCard, { NewsItem } from '@/components/NewsCard';
import SummaryModal from '@/components/SummaryModal';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { fetchMarketNews } from '../../services/finnhubApi';

// Mock data for demonstration
const mockNews: NewsItem[] = [
  {
    title: "Stock Market Surges on Tech Earnings",
    source: { name: "Reuters" },
    publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    urlToImage: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Stock",
    description: "Major tech companies report strong quarterly earnings...",
    content: "In a surprising turn of events, the stock market rallied today as leading technology firms announced better-than-expected earnings. Investors are optimistic about future growth in the sector."
  },
  {
    title: "Cryptocurrency Prices Volatile Amid Regulatory News",
    source: { name: "CoinDesk" },
    publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    urlToImage: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Crypto",
    description: "Bitcoin and Ethereum see price fluctuations..."
  },
  {
    title: "AI Stocks Lead Market Rally",
    source: { name: "Bloomberg" },
    publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    urlToImage: "https://via.placeholder.com/150/00FF00/FFFFFF?text=AI",
    description: "Artificial intelligence companies drive gains..."
  },
  {
    title: "Federal Reserve Signals Interest Rate Decision",
    source: { name: "CNBC" },
    publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    urlToImage: "https://via.placeholder.com/150/FFFF00/000000?text=Fed",
    description: "Central bank hints at monetary policy changes..."
  },
  {
    title: "Oil Prices Climb on Supply Concerns",
    source: { name: "WSJ" },
    publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    urlToImage: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Oil",
    description: "Global oil markets react to production cuts..."
  },
  {
    title: "Retail Sales Data Beats Expectations",
    source: { name: "MarketWatch" },
    publishedAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    urlToImage: "https://via.placeholder.com/150/00FFFF/000000?text=Retail",
    description: "Consumer spending shows strong recovery..."
  },
  {
    title: "Tesla Reports Record Vehicle Deliveries",
    source: { name: "Forbes" },
    publishedAt: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
    urlToImage: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Tesla",
    description: "Electric vehicle maker exceeds delivery targets..."
  },
  {
    title: "Banking Sector Faces Regulatory Scrutiny",
    source: { name: "Financial Times" },
    publishedAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
    urlToImage: "https://via.placeholder.com/150/800080/FFFFFF?text=Bank",
    description: "New regulations impact major financial institutions..."
  },
  {
    title: "Emerging Markets Show Resilience",
    source: { name: "Economist" },
    publishedAt: new Date(Date.now() - 32400000).toISOString(), // 9 hours ago
    urlToImage: "https://via.placeholder.com/150/008000/FFFFFF?text=Emerging",
    description: "Developing economies weather global challenges..."
  },
  {
    title: "Tech IPOs Generate Investor Interest",
    source: { name: "TechCrunch" },
    publishedAt: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
    urlToImage: "https://via.placeholder.com/150/000080/FFFFFF?text=IPO",
    description: "New technology companies go public..."
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState('');

  const fetchNews = async () => {
    try {
      const apiNews = await fetchMarketNews();
      setNews(apiNews);
    } catch (error) {
      console.error('Error fetching news from Finnhub:', error);
      // Fallback to mock data
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const handleSummaryPress = (item: NewsItem) => {
    // Enhanced summary using article description or mock AI
    const summary = item.description
      ? `AI Summary: ${item.description.substring(0, 150)}${item.description.length > 150 ? '...' : ''}`
      : "This article discusses recent movements in the stock/crypto market and potential AI implications.";
    setSelectedSummary(summary);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NewsCard
            item={item}
            onSummaryPress={handleSummaryPress}
            onPress={(item) => router.push({ pathname: '/article', params: { item: JSON.stringify(item) } })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
      <SummaryModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        summary={selectedSummary}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1117',
  },
  listContent: {
    paddingVertical: 16,
  },
});
