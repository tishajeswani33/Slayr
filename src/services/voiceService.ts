/**
 * Slayr Voice Assistant Service
 * Uses the Web Speech API (SpeechRecognition + SpeechSynthesis)
 * for hands-free fashion AI interaction.
 */

// Cross-browser SpeechRecognition
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export interface VoiceListenResult {
  transcript: string;
  confidence: number;
}

/**
 * Check if the browser supports speech recognition.
 */
export function isSpeechRecognitionSupported(): boolean {
  return !!SpeechRecognition;
}

/**
 * Check if the browser supports speech synthesis.
 */
export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}

/**
 * Start listening for voice input. Returns a promise that resolves
 * with the transcript when the user stops speaking.
 */
export function startListening(lang: string = 'en-IN'): Promise<VoiceListenResult> {
  return new Promise((resolve, reject) => {
    if (!SpeechRecognition) {
      reject(new Error('Speech recognition is not supported in this browser. Please use Chrome or Edge.'));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const result = event.results[0][0];
      resolve({
        transcript: result.transcript,
        confidence: result.confidence,
      });
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') {
        reject(new Error('No speech detected. Please try again.'));
      } else if (event.error === 'not-allowed') {
        reject(new Error('Microphone access denied. Please enable microphone permissions.'));
      } else {
        reject(new Error(`Voice recognition error: ${event.error}`));
      }
    };

    recognition.onend = () => {
      // If no result was captured, the promise stays pending
      // The onerror handler will take care of error cases
    };

    recognition.start();
  });
}

/**
 * Speak the given text aloud using the browser's speech synthesis.
 * Returns a promise that resolves when speaking is complete.
 */
export function speak(text: string, lang: string = 'en-IN'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      reject(new Error('Speech synthesis is not supported in this browser.'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to find an Indian English voice, fall back to any English voice
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang === 'en-IN');
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (indianVoice) {
      utterance.voice = indianVoice;
    } else if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`Speech error: ${event.error}`));

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Stop any ongoing speech synthesis.
 */
export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
