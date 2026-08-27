import { CalendarEventMetadata, EventLink, EventType } from '../types/calendar';

const VALID_TYPES: EventType[] = [
  'visit',
  'food',
  'drink',
  'walk',
  'transport',
  'concert',
  'rest',
  'optional'
];

/**
 * Infer event type from summary title or description keywords
 */
export function inferEventType(title: string, description: string = ''): EventType {
  const text = (title + ' ' + description).toLowerCase();

  if (text.includes('concert') || text.includes('babylon') || text.includes('live music') || text.includes('gevende')) {
    return 'concert';
  }
  if (text.includes('restaurant') || text.includes('kebap') || text.includes('kebab') || text.includes('dinner') || text.includes('lunch') || text.includes('breakfast') || text.includes('meze') || text.includes('food') || text.includes('köfte') || text.includes('lokanta')) {
    return 'food';
  }
  if (text.includes('coffee') || text.includes('bar') || text.includes('cocktail') || text.includes('drink') || text.includes('pub') || text.includes('meyhane')) {
    return 'drink';
  }
  if (text.includes('walk') || text.includes('stroll') || text.includes('bazaar') || text.includes('neighborhood') || text.includes('street')) {
    return 'walk';
  }
  if (text.includes('ferry') || text.includes('flight') || text.includes('transfer') || text.includes('metro') || text.includes('tram') || text.includes('taxi') || text.includes('airport')) {
    return 'transport';
  }
  if (text.includes('rest') || text.includes('hotel') || text.includes('break') || text.includes('relax') || text.includes('hamam')) {
    return 'rest';
  }
  if (text.includes('optional') || text.includes('if time permits') || text.includes('backup')) {
    return 'optional';
  }
  return 'visit';
}

/**
 * Extract markdown links like [WEB](https://...) or [IG](https://...)
 */
function extractMarkdownLinks(text: string): EventLink[] {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi;
  const links: EventLink[] = [];
  const seenUrls = new Set<string>();
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const label = match[1].trim();
    const url = match[2].trim();
    if (seenUrls.has(url)) continue;
    seenUrls.add(url);

    const lower = label.toLowerCase();
    let type: EventLink['type'] = 'other';
    if (lower === 'web' || lower === 'website' || lower === 'site' || lower === 'official' || lower.includes('şehir hatları') || lower.includes('sehir hatlari')) type = 'web';
    else if (lower === 'ig' || lower === 'instagram') type = 'ig';
    else if (lower === 'fb' || lower === 'facebook') type = 'fb';
    else if (lower === 'x' || lower === 'twitter') type = 'x';

    links.push({ label, url, type });
  }

  return links;
}

/**
 * Parse structured YAML / Key-Value metadata from Google Calendar event description.
 * Gracefully falls back to plain text parsing.
 */
export function parseEventDescription(rawDescription: string = '', title: string = ''): CalendarEventMetadata {
  if (!rawDescription || !rawDescription.trim()) {
    return {
      type: inferEventType(title),
      fixed: false,
      facts: [],
      links: []
    };
  }

  const links: EventLink[] = extractMarkdownLinks(rawDescription);
  const lines = rawDescription.replace(/\r\n/g, '\n').split('\n');
  const metadata: Partial<CalendarEventMetadata> = {
    facts: [],
    links: [...links]
  };

  let currentKey: string | null = null;
  let currentListBuffer: string[] = [];
  let currentTextBuffer: string[] = [];
  let isCollectingList = false;

  const commitCurrentSection = () => {
    if (!currentKey) return;

    if (isCollectingList && currentListBuffer.length > 0) {
      if (currentKey === 'facts') {
        metadata.facts = [...currentListBuffer];
      }
    } else if (currentTextBuffer.length > 0) {
      const textVal = currentTextBuffer.join('\n').trim();
      if (textVal) {
        switch (currentKey) {
          case 'what':
            metadata.what = textVal;
            break;
          case 'why':
          case 'why_it_matters':
            metadata.why = textVal;
            break;
          case 'duration_note':
          case 'duration_notes':
          case 'durationnote':
            metadata.durationNote = textVal;
            break;
          case 'food':
            metadata.food = textVal;
            break;
          case 'do':
          case 'tip':
          case 'tips':
            metadata.do = textVal;
            break;
          case 'avoid':
            metadata.avoid = textVal;
            break;
          case 'look_for':
          case 'lookfor':
            metadata.lookFor = textVal;
            break;
          case 'reservation':
            metadata.reservation = textVal;
            break;
          case 'ticket':
          case 'tickets':
            metadata.ticket = textVal;
            break;
          case 'notes':
          case 'note':
            metadata.notes = textVal;
            break;
        }
      }
    }

    currentListBuffer = [];
    currentTextBuffer = [];
    isCollectingList = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // If line contains standalone markdown links or link headers, commit section and stop appending to text buffer
    if (line.match(/^(\s*([🖼️🌐📸🟦𝕏·•\s]|\*|-)*\s*\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))+/) || line.toLowerCase().startsWith('useful links')) {
      commitCurrentSection();
      currentKey = null;
      continue;
    }

    // Check for "key: value" or "key:"
    const keyMatch = line.match(/^([a-zA-Z0-9_ -]+):\s*(.*)$/);

    if (keyMatch) {
      commitCurrentSection();
      const rawKey = keyMatch[1].toLowerCase().replace(/[- ]/g, '_');
      const inlineValue = keyMatch[2].trim();

      if (rawKey === 'type') {
        const typeCandidate = inlineValue.toLowerCase() as EventType;
        if (VALID_TYPES.includes(typeCandidate)) {
          metadata.type = typeCandidate;
        }
        currentKey = null;
      } else if (rawKey === 'fixed') {
        metadata.fixed = inlineValue.toLowerCase() === 'true' || inlineValue === '1' || inlineValue.toLowerCase() === 'yes';
        currentKey = null;
      } else if (rawKey === 'web' || rawKey === 'website' || rawKey === 'url' || rawKey === 'official') {
        if (inlineValue && !metadata.links?.some(l => l.url === inlineValue)) {
          metadata.links?.push({ label: 'Website', url: inlineValue, type: 'web' });
        }
        currentKey = null;
      } else if (rawKey === 'ig' || rawKey === 'instagram') {
        const url = inlineValue.startsWith('http') ? inlineValue : `https://instagram.com/${inlineValue.replace('@', '')}`;
        if (inlineValue && !metadata.links?.some(l => l.url === url)) {
          metadata.links?.push({ label: 'Instagram', url, type: 'ig' });
        }
        currentKey = null;
      } else if (rawKey === 'fb' || rawKey === 'facebook') {
        if (inlineValue && !metadata.links?.some(l => l.url === inlineValue)) {
          metadata.links?.push({ label: 'Facebook', url: inlineValue, type: 'fb' });
        }
        currentKey = null;
      } else if (rawKey === 'x' || rawKey === 'twitter') {
        const url = inlineValue.startsWith('http') ? inlineValue : `https://x.com/${inlineValue.replace('@', '')}`;
        if (inlineValue && !metadata.links?.some(l => l.url === url)) {
          metadata.links?.push({ label: 'X', url, type: 'x' });
        }
        currentKey = null;
      } else if (rawKey === 'useful_links' || rawKey === 'links') {
        currentKey = null;
      } else if (rawKey === 'facts') {
        currentKey = 'facts';
        isCollectingList = true;
        if (inlineValue && !inlineValue.startsWith('-')) {
          currentListBuffer.push(inlineValue);
        }
      } else {
        currentKey = rawKey;
        if (inlineValue) {
          currentTextBuffer.push(inlineValue);
        }
      }
    } else if (currentKey) {
      // Continuation line
      if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
        isCollectingList = true;
        currentListBuffer.push(line.replace(/^[-*•]\s*/, '').trim());
      } else if (line.length > 0) {
        if (isCollectingList) {
          if (currentListBuffer.length > 0) {
            currentListBuffer[currentListBuffer.length - 1] += ' ' + line;
          } else {
            currentListBuffer.push(line);
          }
        } else {
          currentTextBuffer.push(line);
        }
      }
    } else if (line.length > 0) {
      // Unstructured description before any key
      if (!metadata.notes) {
        metadata.notes = line;
      } else {
        metadata.notes += '\n' + line;
      }
    }
  }

  commitCurrentSection();

  // Type inference fallback if not explicitly defined
  if (!metadata.type) {
    metadata.type = inferEventType(title, rawDescription);
  }

  // Fixed status fallback
  if (metadata.fixed === undefined) {
    if (metadata.type === 'concert' || title.toLowerCase().includes('flight') || metadata.reservation) {
      metadata.fixed = true;
    } else {
      metadata.fixed = false;
    }
  }

  return {
    type: metadata.type,
    fixed: metadata.fixed,
    what: metadata.what,
    why: metadata.why,
    durationNote: metadata.durationNote,
    facts: metadata.facts || [],
    food: metadata.food,
    do: metadata.do,
    avoid: metadata.avoid,
    lookFor: metadata.lookFor,
    reservation: metadata.reservation,
    ticket: metadata.ticket,
    notes: metadata.notes,
    links: metadata.links || []
  };
}
