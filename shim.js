// Polyfill for Buffer
import { Buffer } from 'buffer';
global.Buffer = Buffer;

// Polyfill for TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill for crypto.getRandomValues()
import 'react-native-get-random-values';