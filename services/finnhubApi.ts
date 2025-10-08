import axios from 'axios';
import { NewsItem } from '../components/NewsCard';

const FINNHUB_API_KEY = process.env.EXPO_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

interface FinnhubNewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export const fetchMarketNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await axios.get<FinnhubNewsItem[]>(`${BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`);
    const data = response.data;

    // Limit to top 15 articles
    const limitedData = data.slice(0, 15);

    return limitedData.map((item: FinnhubNewsItem): NewsItem => ({
      title: item.headline,
      source: { name: item.source },
      publishedAt: new Date(item.datetime * 1000).toISOString(),
      urlToImage: item.image,
      description: item.summary,
      content: item.summary,
    }));
  } catch (error) {
    console.error('Error fetching Finnhub news:', error);
    throw error;
  }
};