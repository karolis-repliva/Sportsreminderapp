// notifications.ts: everything about LOCAL reminders (scheduled on the phone).
//
// Android stores scheduled reminders itself, so they fire even when the app
// (or Expo Go) is closed. No server is involved.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Game } from './types';
import { formatLocal } from './time';

const CHANNEL_ID = 'game-reminders';

// Show reminders as a banner even when the app is open.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Creates the Android notification channel and asks for permission.
 * Android 13+ shows the "Allow notifications?" prompt only after a channel
 * exists, so the channel is created first. Returns true if allowed.
 */
export async function setUpNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Game reminders',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

/**
 * Schedules one reminder `minutesBefore` the game starts.
 * Returns false (and schedules nothing) if that moment has already passed.
 */
export async function scheduleGameReminder(game: Game, minutesBefore: number): Promise<boolean> {
  const fireAt = new Date(new Date(game.startUtc).getTime() - minutesBefore * 60_000);
  if (fireAt.getTime() <= Date.now()) return false;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${game.homeTeam} vs ${game.awayTeam}`,
      body: `${game.competition} · starts ${formatLocal(game.startUtc)}`,
      data: { gameId: game.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: fireAt,
      channelId: CHANNEL_ID,
    },
  });
  return true;
}

/** Sends a test reminder after a few seconds, to check notifications work. */
export async function scheduleTestReminder(seconds = 10): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Test reminder', body: 'Notifications work 🎉' },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: CHANNEL_ID,
    },
  });
}
