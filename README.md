# AI Trading News Feed App 📈

A React Native Expo app that displays the latest stock and crypto news with AI-generated summaries. Built with dark mode UI and pull-to-refresh functionality.

## Features

- 📱 **Latest News Feed**: Fetches 10 recent financial news headlines
- 🤖 **AI Summaries**: Click "AI Summary" to view a 2-3 line summary in a modal
- 🔄 **Pull-to-Refresh**: Manually refresh the news feed
- 🌙 **Dark Mode**: Clean dark theme for modern UI
- 📱 **Responsive**: Works on Expo Go (mobile) and Expo Web

## Tech Stack

- React Native + Expo
- TypeScript
- FlatList for news rendering
- React Native Paper for modal
- Axios for API calls (mock data used by default)
- Moment.js for date formatting

## Get Started

1. **Install dependencies** (already done in this project)

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

   In the output, you'll find options to open the app in:
   - [Expo Go](https://expo.dev/go) (mobile)
   - [Web browser](https://docs.expo.dev/workflow/web/) (web)

## API Integration

The app uses mock data by default. To integrate real NewsAPI:

1. Get an API key from [FinHubb API](https://finnhub.io/)
2. In `app/(tabs)/index.tsx`, replace the mock fetch with:

   ```typescript
   const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${YOUR_API_KEY}`);
   setNews(response.data.articles);
   ```

For AI summaries, integrate OpenAI API in `handleSummaryPress`.

## Project Structure

- `app/(tabs)/index.tsx` - Main news feed screen
- `components/NewsCard.tsx` - Individual news item component
- `components/SummaryModal.tsx` - AI summary modal
- `constants/theme.ts` - Theme colors and fonts

## Development

- Edit files in the `app/` directory (file-based routing)
- Use `npm run lint` to check code quality
- Reset to fresh project: `npm run reset-project`

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [NewsAPI](https://newsapi.org/)
