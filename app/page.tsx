'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import styles from './page.module.css';
import { PERSPECTIVE_TYPES, PerspectiveResponse } from '@/lib/prompts';

// Helper to parse perspective response from AI
function parsePerspectiveResponse(text: string): PerspectiveResponse | null {
  try {
    // Try to extract JSON from the response
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

// Get icon for perspective type
function getPerspectiveIcon(type: string): string {
  const found = PERSPECTIVE_TYPES.find(p => p.id === type);
  return found?.icon || '📋';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Add placeholder for assistant message
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

          // Plain text stream - append directly
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
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter(msg => msg.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
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
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚖️</span>
          <h1>Perspective</h1>
        </div>
        <p className={styles.tagline}>Explore history through multiple narratives</p>
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
                    <span>{type.icon}</span>
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
                    <span className={styles.userIcon}>🔍</span>
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
              <span>→</span>
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
            className={`${styles.perspectiveCard} glass`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.badge} ${getBadgeClass(perspective.type)}`}>
                {getPerspectiveIcon(perspective.type)} {perspective.type.charAt(0).toUpperCase() + perspective.type.slice(1)}
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
