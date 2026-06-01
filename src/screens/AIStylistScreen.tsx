import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiRequest } from '../services/api';

interface AIStylistScreenProps {
  onClose: () => void;
}

interface StylingReport {
  analysis: {
    undertone: string;
    silhouette: string;
    detectedVibe: string;
    recommendedPalette: string[];
    additionalStylistNote: string;
  };
  primaryMatch: {
    id: string;
    imageUrl: string;
    aesthetic: string;
    score: number;
    vibe: string;
    clothingItems: Array<{ type: string; color: string; description: string }>;
    colorPalette: Array<{ hex: string; name: string; dominance: number }>;
    recommendations: Array<{ category: string; suggestion: string; reasoning: string }>;
  };
  stylingAdvice: {
    shoes: string;
    accessories: string[];
    hairstyle: string;
    layeringOption: string;
    stylistRationale: string;
  };
  alternativeFits: Array<{
    id: string;
    imageUrl: string;
    aesthetic: string;
    score: number;
  }>;
  matchScore: number;
}

export default function AIStylistScreen({ onClose }: AIStylistScreenProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'consult'>('consult');
  
  // Consultation States
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [eventType, setEventType] = useState('party');
  const [budgetTier, setBudgetTier] = useState('mid-range');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [report, setReport] = useState<StylingReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat States (Fallback tab)
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    { role: 'ai', text: "Hi! Ask me anything about Gen Z style aesthetics, matching coordinates, or capsule wardrobes." }
  ]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size and format
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMsg('Please select a valid image file (JPG, PNG, or WebP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size must be less than 10MB');
      return;
    }

    setErrorMsg(null);
    setImagePreview(URL.createObjectURL(file));

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const cleanBase64 = base64.split(',')[1];
      setImageBase64(cleanBase64);
    };
    reader.readAsDataURL(file);
  };

  const triggerConsultation = async () => {
    if (!imageBase64) {
      setErrorMsg('Please upload a style photo first');
      return;
    }

    setIsConsulting(true);
    setErrorMsg(null);
    setReport(null);

    try {
      const res = await apiRequest<{ consultation: StylingReport }>(
        '/api/stylist/consult',
        'POST',
        {
          imageBase64,
          eventType,
          budget: budgetTier,
          additionalNotes,
        }
      );

      setReport(res.consultation);
    } catch (err: any) {
      setErrorMsg(err.message || 'Consultation failed. Make sure the database seeder has run.');
    } finally {
      setIsConsulting(false);
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', text: chatInput }]);
    const currentInput = chatInput;
    setChatInput('');
    
    setTimeout(() => {
      let reply = "Based on Slayr's 100K+ fashion index, I'd suggest pairing broad neutral trousers with structured outerwear layer overlays.";
      if (currentInput.toLowerCase().includes('party')) reply = "For a party layout: target Y2K or Streetwear mesh layers with platform chunky sneakers.";
      if (currentInput.toLowerCase().includes('wedding')) reply = "For a wedding layout: target Old Money double-breasted linen suits or Coquette tiers.";
      
      setChatMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto flex flex-col font-light text-neutral-400 select-none">
      {/* Editorial Sticky Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-xl border-b border-neutral-900 z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl tracking-tight text-white font-light">Slayr AI Stylist</h1>
              <p className="text-xs text-neutral-600 font-light">Bespoke fashion consulting driven by Gemini Vision & 100K database</p>
            </div>
          </div>
          
          {/* Tab toggles */}
          <div className="flex bg-neutral-950 border border-neutral-900 rounded-full p-1 text-xs">
            <button
              onClick={() => setActiveTab('consult')}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === 'consult' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Visual Consult
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === 'chat' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Chat Stylist
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'consult' ? (
            <motion.div
              key="consult-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Form Input Section */}
              <div className="grid md:grid-cols-2 gap-8 bg-neutral-950 border border-neutral-900 rounded-3xl p-8">
                
                {/* Photo Upload area */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 transition-colors relative group min-h-[300px]">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white text-black px-6 py-2 rounded-full text-xs font-light"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-300">Upload your physical profile photo</p>
                        <p className="text-xs text-neutral-600">Supports JPG, PNG, WebP up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Consultation Details */}
                <div className="space-y-6">
                  {/* Event selector */}
                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Event Context</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3 rounded-xl text-white outline-none focus:border-neutral-700 text-sm font-light appearance-none"
                    >
                      <option value="party">Party / Social Event</option>
                      <option value="brunch">Brunch / Daytime</option>
                      <option value="wedding">Wedding / Festive</option>
                      <option value="work">Office / Formal</option>
                      <option value="date-night">Date Night</option>
                      <option value="casual">Casual Lounging</option>
                      <option value="festival">Concert / Fest</option>
                    </select>
                  </div>

                  {/* Budget selector */}
                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Target Budget Tier</label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {['budget', 'mid-range', 'premium', 'luxury'].map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setBudgetTier(tier)}
                          className={`py-3 rounded-xl border capitalize transition-colors ${
                            budgetTier === tier
                              ? 'bg-white border-white text-black'
                              : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Notes */}
                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Style Notes / Preferences</label>
                    <textarea
                      placeholder="e.g. I prefer dark earth tones and structured wide-leg cuts..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3 rounded-xl text-white placeholder-neutral-600 outline-none focus:border-neutral-700 text-sm font-light min-h-[100px] resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-500 text-center font-light">{errorMsg}</p>
                  )}

                  {/* Generate Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={isConsulting}
                    onClick={triggerConsultation}
                    className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-4 rounded-full text-sm font-light flex items-center justify-center gap-2"
                  >
                    {isConsulting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Analyzing Silhouette undertones...
                      </>
                    ) : (
                      'Generate Custom Style Proposal'
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Consultation Styling Report */}
              <AnimatePresence>
                {report && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 mt-12"
                  >
                    {/* Header Score grid */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-neutral-950 border border-neutral-900 p-6 rounded-2xl text-center">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">Match Accuracy</p>
                        <p className="text-3xl text-white font-light">{report.matchScore}%</p>
                      </div>
                      <div className="bg-neutral-950 border border-neutral-900 p-6 rounded-2xl text-center">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">Recommended Look</p>
                        <p className="text-sm text-white font-light mt-2 truncate">{report.primaryMatch.aesthetic}</p>
                      </div>
                      <div className="bg-neutral-950 border border-neutral-900 p-6 rounded-2xl text-center">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">Skin Tone Undertone</p>
                        <p className="text-xs text-white font-light mt-2">{report.analysis.undertone.split(' ')[0]}</p>
                      </div>
                    </div>

                    {/* Tone Analysis & Silhouette */}
                    <div className="bg-neutral-950 border border-neutral-900 rounded-3xl p-8 grid md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-sm text-white font-light tracking-wide uppercase mb-4">Body Shape & Undertone Report</h2>
                        <div className="space-y-4 text-sm">
                          <p><strong className="text-neutral-300">Skin Undertone:</strong> {report.analysis.undertone}</p>
                          <p><strong className="text-neutral-300">Body Silhouette:</strong> {report.analysis.silhouette}</p>
                          <p><strong className="text-neutral-300">Ideal Palette:</strong></p>
                          <div className="flex gap-3">
                            {report.analysis.recommendedPalette.map((hex, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <div className="w-5 h-5 rounded-full border border-neutral-800" style={{ backgroundColor: hex }} />
                                <span className="text-[10px] uppercase font-mono">{hex}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-sm text-white font-light tracking-wide uppercase mb-4">Stylist's Vibe Assessment</h2>
                        <p className="text-sm leading-relaxed">{report.stylingAdvice.stylistRationale}</p>
                      </div>
                    </div>

                    {/* Primary Suit & Wardrobe Items */}
                    <div className="bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden grid md:grid-cols-2">
                      <div className="h-[450px]">
                        <img src={report.primaryMatch.imageUrl} alt="Outfit Fit" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-8 flex flex-col justify-between space-y-6">
                        <div>
                          <div className="inline-block bg-white text-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider mb-3">
                            {report.primaryMatch.aesthetic}
                          </div>
                          <h2 className="text-2xl text-white font-light tracking-tight mb-2">The Primary Consultation Fit</h2>
                          <p className="text-sm leading-relaxed text-neutral-500 mb-6">{report.primaryMatch.vibe}</p>
                          
                          <div className="space-y-4">
                            <h3 className="text-xs text-neutral-400 uppercase tracking-widest">Outfit Coordinates</h3>
                            <div className="space-y-3">
                              {report.primaryMatch.clothingItems.map((item, i) => (
                                <div key={i} className="flex justify-between border-b border-neutral-900 pb-2 text-xs">
                                  <span className="text-neutral-300">{item.type}</span>
                                  <span className="text-neutral-500">{item.color} • {item.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Styling Accessories / Shoes */}
                        <div className="grid grid-cols-2 gap-4 border-t border-neutral-900 pt-6 text-xs">
                          <div>
                            <p className="text-neutral-500 mb-1">Recommended Shoes</p>
                            <p className="text-white">{report.stylingAdvice.shoes}</p>
                          </div>
                          <div>
                            <p className="text-neutral-500 mb-1">Key Accessories</p>
                            <p className="text-white">{report.stylingAdvice.accessories.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Alternatives pool from 100K database */}
                    {report.alternativeFits.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-sm text-white font-light tracking-wider uppercase">Alternative fits under budget</h2>
                        <div className="grid grid-cols-3 gap-6">
                          {report.alternativeFits.map((fit) => (
                            <div key={fit.id} className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden group">
                              <div className="h-[200px] overflow-hidden">
                                <img src={fit.imageUrl} alt="Alternative" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="p-4 flex items-center justify-between text-xs">
                                <span className="text-neutral-300 font-light truncate max-w-[120px]">{fit.aesthetic}</span>
                                <span className="text-neutral-600">Score: {fit.score}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Chat Interface Fallback */
            <motion.div
              key="chat-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 min-h-[500px] flex flex-col justify-between"
            >
              <div className="space-y-4 flex-1">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-md px-6 py-4 rounded-3xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-white text-black'
                          : 'bg-neutral-950 border border-neutral-900 text-neutral-300'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-3 border-t border-neutral-900 pt-6">
                <input
                  type="text"
                  placeholder="Ask the stylist anything about color гармонии..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="flex-1 bg-neutral-900 border border-neutral-850 px-6 py-3 rounded-full text-white placeholder-neutral-650 outline-none text-sm font-light"
                />
                <button
                  onClick={sendChatMessage}
                  className="bg-white text-black px-8 py-3 rounded-full text-xs font-light"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
