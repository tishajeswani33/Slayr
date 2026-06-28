import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatbotResponse, getQuickActions, type ChatOutfitCard, type ChatbotResponse } from '../services/chatbotService';
import { getCuratedOutfits } from '../data/curatedOutfits';
import { startListening, speak, stopSpeaking, isSpeechRecognitionSupported, isSpeechSynthesisSupported } from '../services/voiceService';

interface ChatbotScreenProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  outfits?: ChatOutfitCard[];
  isAiGenerated?: boolean;
  timestamp: Date;
}

export default function ChatbotScreen({ onClose }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: "Hey! I'm your Slayr AI stylist 💫\n\nTell me your **event**, **budget**, and I'll build your complete outfit — head to toe with accessories and exact pricing.\n\nTry: *\"Wedding outfit under ₹20,000\"* or tap a suggestion below!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakResponses, setSpeakResponses] = useState(false);
  const [expandedOutfit, setExpandedOutfit] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = getQuickActions();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const allOutfits = getCuratedOutfits();
      const response: ChatbotResponse = await getChatbotResponse(text, allOutfits);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: response.message,
        outfits: response.outfits,
        isAiGenerated: response.isAiGenerated,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMsg]);

      if (speakResponses && isSpeechSynthesisSupported()) {
        // Speak a simplified version (strip markdown)
        const cleanText = response.message.replace(/\*\*/g, '').replace(/\*/g, '').replace(/•/g, '').slice(0, 500);
        speak(cleanText).catch(() => {});
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'ai',
          text: 'Oops! Something went wrong. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = async () => {
    if (!isSpeechRecognitionSupported()) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'ai',
          text: '🎙️ Voice input requires Chrome or Edge browser. Please type your request instead.',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    setIsListening(true);
    stopSpeaking();

    try {
      const result = await startListening('en-IN');
      setIsListening(false);
      if (result.transcript) {
        setInput(result.transcript);
        await sendMessage(result.transcript);
      }
    } catch (err: any) {
      setIsListening(false);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'ai',
          text: `🎙️ ${err.message || 'Voice input failed. Please try again.'}`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const renderOutfitCard = (outfit: ChatOutfitCard) => {
    const isExpanded = expandedOutfit === outfit.id;

    return (
      <motion.div
        key={outfit.id}
        layout
        className="bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden"
      >
        <div className="flex gap-3 p-3">
          <img
            src={outfit.imageUrl}
            alt={outfit.title}
            className="w-20 h-24 object-cover rounded-xl flex-shrink-0"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm font-medium truncate">{outfit.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">{outfit.category}</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">{outfit.budgetTier}</span>
            </div>
            <p className="text-white text-lg font-semibold mt-1.5">{formatPrice(outfit.totalPrice)}</p>
          </div>
        </div>

        <button
          onClick={() => setExpandedOutfit(isExpanded ? null : outfit.id)}
          className="w-full px-3 py-2 text-xs text-neutral-500 hover:text-white border-t border-neutral-800 transition-colors flex items-center justify-center gap-1"
        >
          {isExpanded ? 'Hide Details' : 'View Full Breakdown'}
          <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3 space-y-3">
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-wider mb-1.5">Clothing Items</p>
                  {outfit.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <span className="text-xs text-neutral-300">{item.name} <span className="text-neutral-600">({item.color})</span></span>
                      <span className="text-xs text-white font-medium">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-wider mb-1.5">Accessories</p>
                  {outfit.accessories.map((acc, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <span className="text-xs text-neutral-300">{acc.name}</span>
                      <span className="text-xs text-white font-medium">{formatPrice(acc.price)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-wider mb-1.5">Footwear</p>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-neutral-300">{outfit.shoes.name}</span>
                    <span className="text-xs text-white font-medium">{formatPrice(outfit.shoes.price)}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-neutral-800">
                  <p className="text-xs text-amber-400/80 italic">💡 {outfit.stylingTip}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.role === 'user';

    return (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
          {!isUser && (
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px]">✨</div>
              <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Slayr AI</span>
              {msg.isAiGenerated && (
                <span className="text-[9px] bg-violet-500/10 text-violet-400 px-1.5 py-0.5 rounded-full">Gemini</span>
              )}
            </div>
          )}
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              isUser
                ? 'bg-white text-black rounded-br-md'
                : 'bg-neutral-900/60 text-neutral-300 border border-neutral-800/50 rounded-bl-md'
            }`}
          >
            {msg.text}
          </div>

          {msg.outfits && msg.outfits.length > 0 && (
            <div className="mt-3 space-y-2">
              {msg.outfits.map(renderOutfitCard)}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col font-light select-none">
      {/* Header */}
      <div className="flex-shrink-0 bg-black/80 backdrop-blur-xl border-b border-neutral-900 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm">✨</div>
            <div>
              <h1 className="text-white text-base font-light tracking-tight">Slayr Budget Stylist</h1>
              <p className="text-[10px] text-neutral-600">Complete outfits within your budget</p>
            </div>
          </div>
          <button
            onClick={() => { setSpeakResponses(!speakResponses); stopSpeaking(); }}
            className={`p-2 rounded-full transition-colors ${speakResponses ? 'bg-violet-500/20 text-violet-400' : 'text-neutral-600 hover:text-neutral-400'}`}
            title={speakResponses ? 'Mute voice responses' : 'Enable voice responses'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {speakResponses ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {messages.map(renderMessage)}

          {/* Quick actions (show only if single welcome message) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {quickActions.map((action, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => sendMessage(action.text)}
                  className="text-xs bg-neutral-900/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 px-3 py-2 rounded-full transition-all"
                >
                  {action.icon} {action.text}
                </motion.button>
              ))}
            </div>
          )}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px]">✨</div>
              <div className="flex gap-1 bg-neutral-900/60 border border-neutral-800/50 rounded-full px-4 py-2">
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex-shrink-0 bg-black/80 backdrop-blur-xl border-t border-neutral-900 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          {/* Voice Input Button */}
          <button
            onClick={handleVoiceInput}
            disabled={isListening}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-red-500/20 text-red-400 animate-pulse'
                : 'bg-neutral-900 text-neutral-500 hover:text-white hover:bg-neutral-800'
            }`}
            title={isListening ? 'Listening...' : 'Voice input'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={isListening ? 'Listening...' : 'Try: "Wedding outfit under ₹15,000"'}
              className="w-full bg-neutral-900/80 border border-neutral-800 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors"
              disabled={isTyping || isListening}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
