'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import styles from './page.module.css';
import { PERSPECTIVE_TYPES, PerspectiveResponse } from '@/lib/prompts';

// SVG Icons
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SystemIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const ChurchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 22V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
    <path d="M2 22h20" />
    <path d="M12 2v4" />
    <path d="M10 4h4" />
    <rect x="10" y="12" width="4" height="6" />
  </svg>
);

// Perspective icon mapping
const perspectiveIcons: Record<string, React.ReactNode> = {
  country: <GlobeIcon />,
  community: <UsersIcon />,
  religion: <ChurchIcon />,
  ideology: <LightbulbIcon />,
  academic: <BookIcon />,
};

// Theme types
type Theme = 'system' | 'light' | 'dark';

// Helper to parse perspective response from AI
function parsePerspectiveResponse(text: string): PerspectiveResponse | null {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch {
    return null;
  }
}

// Get badge class for perspective type
function getBadgeClass(type: string): string {
  const validTypes = ['country', 'community', 'religion', 'ideology', 'academic'];
  return validTypes.includes(type) ? `badge-${type}` : 'badge-academic';
}

// Message type
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedResponses, setParsedResponses] = useState<Map<string, PerspectiveResponse>>(new Map());
  const [theme, setTheme] = useState<Theme>('system');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Parse responses when messages change
  useEffect(() => {
    const newParsed = new Map(parsedResponses);
    messages.forEach((msg) => {
      if (msg.role === 'assistant' && !newParsed.has(msg.id)) {
        const parsed = parsePerspectiveResponse(msg.content);
        if (parsed) {
          newParsed.set(msg.id, parsed);
        }
      }
    });
    if (newParsed.size !== parsedResponses.size) {
      setParsedResponses(newParsed);
    }
  }, [messages, parsedResponses]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const assistantId = `assistant-${Date.now()}`;
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantId
                ? { ...msg, content: fullContent }
                : msg
            )
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setMessages(prev => prev.filter(msg => msg.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    setMessages([]);
    setParsedResponses(new Map());
    setError(null);
  };

  const exampleQueries = [
    "What was the Boston Tea Party?",
    "Explain the Indian Partition of 1947",
    "What happened during the French Revolution?",
    "The fall of the Berlin Wall"
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" />
            </svg>
            <h1>Perspective</h1>
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* Theme Toggle */}
          <div className={styles.themeToggle}>
            <button
              className={`${styles.themeBtn} ${theme === 'system' ? styles.active : ''}`}
              onClick={() => setTheme('system')}
              title="System"
            >
              <SystemIcon />
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'light' ? styles.active : ''}`}
              onClick={() => setTheme('light')}
              title="Light"
            >
              <SunIcon />
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'dark' ? styles.active : ''}`}
              onClick={() => setTheme('dark')}
              title="Dark"
            >
              <MoonIcon />
            </button>
          </div>

          {/* Home Button - only show when in conversation */}
          {messages.length > 0 && (
            <button className={styles.homeBtn} onClick={handleGoHome} title="Home">
              <HomeIcon />
              <span>Home</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Chat Area */}
      <main className={styles.main}>
        {messages.length === 0 ? (
          <div className={styles.welcome}>
            <div className={styles.welcomeContent}>
              <h2>What historical event would you like to explore?</h2>
              <p>
                Get multiple perspectives from different countries, communities,
                religions, and academic viewpoints — all presented side by side.
              </p>
              <div className={styles.examples}>
                <span className={styles.examplesLabel}>Try asking about:</span>
                <div className={styles.exampleButtons}>
                  {exampleQueries.map((query, idx) => (
                    <button
                      key={idx}
                      className={styles.exampleButton}
                      onClick={() => setInput(query)}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Perspective Types Legend */}
            <div className={styles.legend}>
              <span className={styles.legendLabel}>Perspective Types:</span>
              <div className={styles.legendItems}>
                {PERSPECTIVE_TYPES.map((type) => (
                  <div key={type.id} className={`${styles.legendItem} ${getBadgeClass(type.id)}`}>
                    <span className={styles.legendIcon}>{perspectiveIcons[type.id]}</span>
                    <span>{type.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage
                  }`}
              >
                {message.role === 'user' ? (
                  <div className={styles.userBubble}>
                    <span className={styles.userIcon}><SearchIcon /></span>
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div className={styles.perspectiveContainer}>
                    {parsedResponses.has(message.id) ? (
                      <PerspectiveDisplay data={parsedResponses.get(message.id)!} />
                    ) : message.content ? (
                      <div className={styles.rawResponse}>
                        <div className={styles.loadingIndicator}>
                          <span className={styles.loadingDot}></span>
                          <span className={styles.loadingDot}></span>
                          <span className={styles.loadingDot}></span>
                        </div>
                        <p className={styles.streamingText}>{message.content}</p>
                      </div>
                    ) : (
                      <div className={styles.loadingMessage}>
                        <div className={styles.loadingIndicator}>
                          <span className={styles.loadingDot}></span>
                          <span className={styles.loadingDot}></span>
                          <span className={styles.loadingDot}></span>
                        </div>
                        <span>Analyzing perspectives...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {error && (
              <div className={styles.errorMessage}>
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className={styles.footer}>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any historical event..."
            className={styles.input}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <span className={styles.sendLoading}>●</span>
            ) : (
              <SendIcon />
            )}
          </button>
        </form>
        <p className={styles.disclaimer}>
          Perspectives are AI-generated summaries for educational purposes.
          Always consult primary sources for in-depth research.
        </p>
      </footer>
    </div>
  );
}

// Perspective Display Component
function PerspectiveDisplay({ data }: { data: PerspectiveResponse }) {
  return (
    <div className={styles.perspectiveDisplay}>
      {/* Event Header */}
      <div className={styles.eventHeader}>
        <h3>{data.event}</h3>
        <p className={styles.eventContext}>{data.context}</p>
      </div>

      {/* Perspectives Grid */}
      <div className={styles.perspectivesGrid}>
        {data.perspectives.map((perspective, idx) => (
          <div
            key={idx}
            className={styles.perspectiveCard}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.badge} ${getBadgeClass(perspective.type)}`}>
                {perspectiveIcons[perspective.type] || <BookIcon />}
                <span>{perspective.type.charAt(0).toUpperCase() + perspective.type.slice(1)}</span>
              </span>
              <h4>{perspective.name}</h4>
            </div>

            <p className={styles.cardSummary}>{perspective.summary}</p>

            {perspective.keyPoints && perspective.keyPoints.length > 0 && (
              <ul className={styles.keyPoints}>
                {perspective.keyPoints.map((point, pointIdx) => (
                  <li key={pointIdx}>{point}</li>
                ))}
              </ul>
            )}

            {perspective.sources && perspective.sources.length > 0 && (
              <div className={styles.sources}>
                <span className={styles.sourcesLabel}>Sources:</span>
                <span>{perspective.sources.join(', ')}</span>
              </div>
            )}

            {perspective.bias && (
              <div className={styles.biasNote}>
                <span>⚠️</span>
                <span>{perspective.bias}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      {data.disclaimer && (
        <p className={styles.responseDisclaimer}>{data.disclaimer}</p>
      )}
    </div>
  );
}
