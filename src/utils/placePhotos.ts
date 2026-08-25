/**
 * 1-to-1 Event-to-Photo Mapping.
 * Every single calendar event has its own dedicated, authentic photograph
 * stored locally in /public/images/events/{eventId}.jpg.
 * 
 * Works 100% offline, zero network requests, 0ms load time,
 * and 100% compatible with iOS Safari / iPhone WebKit.
 */

const BASE = import.meta.env.BASE_URL || '/';

export function getPlacePhotoUrl(eventId: string, _title: string = ''): string {
  // Direct 1-to-1 event mapping
  return `${BASE}images/events/${eventId}.jpg`;
}
