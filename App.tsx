// App.tsx: the app's main screen.
//
// Phase 2 ("tiny real version"): lists upcoming Žalgiris EuroLeague games and
// lets you set a reminder 2 hours before any of them.

import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchUpcomingTeamGames } from './src/providers/euroleague';
import { scheduleGameReminder, scheduleTestReminder, setUpNotifications } from './src/notifications';
import { formatLocal } from './src/time';
import { Game } from './src/types';

const TEAM_CODE = 'ZAL'; // Žalgiris Kaunas in the EuroLeague feed
const REMIND_MINUTES_BEFORE = 120;
const MAX_GAMES_SHOWN = 10;

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Ids of games that have a reminder set during this session.
  const [reminded, setReminded] = useState<Set<string>>(new Set());

  const loadGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const upcoming = await fetchUpcomingTeamGames(TEAM_CODE);
      setGames(upcoming.slice(0, MAX_GAMES_SHOWN));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setUpNotifications();
    loadGames();
  }, [loadGames]);

  async function onRemind(game: Game) {
    const allowed = await setUpNotifications();
    if (!allowed) {
      Alert.alert('Notifications are off', 'Allow notifications for Expo Go in Android Settings.');
      return;
    }
    const ok = await scheduleGameReminder(game, REMIND_MINUTES_BEFORE);
    if (ok) {
      setReminded((prev) => new Set(prev).add(game.id));
    } else {
      Alert.alert('Too late', 'That reminder time has already passed.');
    }
  }

  async function onTest() {
    const allowed = await setUpNotifications();
    if (!allowed) {
      Alert.alert('Notifications are off', 'Allow notifications for Expo Go in Android Settings.');
      return;
    }
    await scheduleTestReminder(10);
    Alert.alert('Test scheduled', 'A test reminder will appear in about 10 seconds.');
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Žalgiris: upcoming games</Text>
      <Text style={styles.subtitle}>EuroLeague · times in Vilnius</Text>

      <Pressable style={styles.testButton} onPress={onTest}>
        <Text style={styles.testButtonText}>Send a test reminder (10 s)</Text>
      </Pressable>

      {loading && games.length === 0 ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : error ? (
        <Text style={styles.error}>Could not load games: {error}</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(g) => g.id}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={loadGames} />}
          ListEmptyComponent={<Text>No upcoming games found.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.teams}>
                {item.homeTeam} vs {item.awayTeam}
              </Text>
              <Text style={styles.time}>
                {formatLocal(item.startUtc)}
                {item.timeConfirmed ? '' : ' (time not confirmed)'}
              </Text>
              {reminded.has(item.id) ? (
                <Text style={styles.done}>✓ Reminder set (2 h before)</Text>
              ) : (
                <Pressable style={styles.button} onPress={() => onRemind(item)}>
                  <Text style={styles.buttonText}>Remind me 2 h before</Text>
                </Pressable>
              )}
            </View>
          )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff', paddingTop: 56, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#666', marginBottom: 12 },
  testButton: { padding: 10, borderRadius: 8, backgroundColor: '#eee', marginBottom: 12 },
  testButtonText: { textAlign: 'center' },
  error: { color: '#b00020', marginTop: 16 },
  card: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  teams: { fontSize: 16, fontWeight: '600' },
  time: { color: '#333', marginVertical: 4 },
  button: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#0a7d3b' },
  buttonText: { color: '#fff', fontWeight: '600' },
  done: { color: '#0a7d3b', fontWeight: '600' },
});
