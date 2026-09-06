"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type {
  ChatEvent,
  ChatMessage,
} from "@/src/server/modules/chat/chat.types";
import styles from "./PortfolioChat.module.css";
import { CHAT_LIMITS } from "@/src/lib/chat-limits";

function internalHref(href?: string) {
  if (!href) return undefined;
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(href);
    if (url.origin === "http://localhost:3000")
      return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return undefined;
  }
  return undefined;
}

const markdownComponents = {
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: React.ReactNode;
    }) => {
    const localHref = internalHref(href);
    return localHref ? (
      <Link href={localHref}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
};

// Safety net: if the model mentions one of these paths as plain text
// instead of proper Markdown link syntax, turn it into a link anyway.
// Add any other routes worth linking here.
const LINKABLE_PATHS = ["/contact", "/projects", "/about", "/resume"];
const barePathPattern = new RegExp(
  `(?<!\\]\\()(${LINKABLE_PATHS.map((path) =>
    path.replace(/\//g, "\\/"),
  ).join("|")})\\b(?!\\))`,
  "g",
);

function autolinkKnownPaths(text: string) {
  return text.replace(barePathPattern, (match) => `[${match}](${match})`);
}

const prompts = [
  "Which project should I explore?",
  "What is Joshua's tech stack?",
  "Tell me about his experience.",
];

function recentHistory(messages: ChatMessage[]) {
  const history: ChatMessage[] = [];
  let characters = 0;
  for (const message of messages
    .slice(-CHAT_LIMITS.historyMessages)
    .reverse()) {
    const content = message.content.slice(
      0,
      message.role === "user"
        ? CHAT_LIMITS.userCharacters
        : CHAT_LIMITS.assistantCharacters,
    );
    if (characters + content.length > CHAT_LIMITS.historyCharacters) break;
    history.unshift({ ...message, content });
    characters += content.length;
  }
  return history;
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [retryMessages, setRetryMessages] = useState<ChatMessage[] | null>(
    null,
  );
  const active = useRef<AbortController | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [messages, busy, error, open]);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  async function send(text: string, retry?: ChatMessage[]) {
    if (active.current || (!text.trim() && !retry)) return;
    const history: ChatMessage[] = retry ?? [
      ...messages,
      { role: "user", content: text.trim() },
    ];
    const controller = new AbortController();
    active.current = controller;
    setMessages([...history, { role: "assistant", content: "" }]);
    setDraft("");
    setError("");
    setRetryMessages(null);
    setBusy(true);
    let reply = "";
    try {
      const response = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: recentHistory(history) }),
        signal: AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(55_000),
        ]),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error || "The assistant is unavailable. Please try again.",
        );
      }
      if (!response.body)
        throw new Error("No response received. Please try again.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let complete = false;
      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as ChatEvent;
          if (event.type === "error") throw new Error(event.error);
          if (event.type === "done") complete = true;
          if (event.type === "text") {
            reply += event.text;
            setMessages([...history, { role: "assistant", content: reply }]);
          }
        }
        if (done) break;
      }
      if (!complete)
        throw new Error("The reply was interrupted. Please try again.");
    } catch (caught) {
      setMessages(
        reply ? [...history, { role: "assistant", content: reply }] : history,
      );
      setError(
        controller.signal.aborted
          ? "Reply stopped."
          : caught instanceof Error
            ? caught.message
            : "Something went wrong. Please try again.",
      );
      setRetryMessages(history);
    } finally {
      controller.abort();
      active.current = null;
      setBusy(false);
    }
  }

  return (
    <div className={`${styles.widget} ${open ? styles.isOpen : ""}`}>
      {open && (
        <section
          id="portfolio-chat"
          className={styles.panel}
          role="dialog"
          aria-labelledby="chat-title"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
        >
          <header className={styles.header}>
            <div className={styles.headerMain}>
              <span className={styles.avatar} aria-hidden="true">
                JC
              </span>
              <div>
                <h2 id="chat-title" className={styles.title}>
                  Ask about Joshua
                </h2>
                <p className={styles.subtitle}>Usually replies in a few seconds</p>
              </div>
            </div>
            <button
              className={styles.iconButton}
              onClick={close}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          {messages.length > 0 && (
            <div className={styles.toolbar}>
              <button
                className={styles.newChat}
                disabled={busy}
                onClick={() => {
                  setMessages([]);
                  setError("");
                  setRetryMessages(null);
                  input.current?.focus();
                }}
              >
                New chat
              </button>
            </div>
          )}

          <div
            className={styles.conversation}
            ref={scroll}
            role="log"
            aria-label="Conversation"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {!messages.length && (
              <div className={styles.welcome}>
                <h3>Get quick answers about Joshua&rsquo;s work</h3>
                <p>
                  Ask about his projects, tech stack, or experience, and I&rsquo;ll
                  pull from his portfolio to help you explore.
                </p>
                <div className={styles.prompts}>
                  {prompts.map((prompt) => (
                    <button key={prompt} onClick={() => void send(prompt)}>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.role === "user" ? styles.user : styles.assistant
                }`}
              >
                <div className={styles.bubble}>
                  <ReactMarkdown components={markdownComponents}>
                    {autolinkKnownPaths(message.content) || "Thinking…"}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className={styles.error} role="alert">
              <span>{error}</span>
              <div className={styles.errorActions}>
                {retryMessages && (
                  <button
                    disabled={busy}
                    onClick={() => void send("", retryMessages)}
                  >
                    Try again
                  </button>
                )}
                <Link href="/contact">Contact Joshua</Link>
              </div>
            </div>
          )}

          <form
            className={styles.composer}
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <label htmlFor="chat-message" className={styles.srOnly}>
              Your question
            </label>
            <div className={styles.inputRow}>
              <textarea
                id="chat-message"
                ref={input}
                value={draft}
                maxLength={2000}
                rows={2}
                placeholder="Ask a question…"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    void send(draft);
                  }
                }}
              />
              {busy ? (
                <button
                  type="button"
                  className={styles.send}
                  onClick={() => active.current?.abort()}
                  aria-label="Stop response"
                >
                  <span aria-hidden="true">■</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.send}
                  disabled={!draft.trim()}
                  aria-label="Send message"
                >
                  <span aria-hidden="true">↑</span>
                </button>
              )}
            </div>
            <p className={styles.disclaimer}>
              Answers may be imperfect. Messages are sent to OpenRouter and its
              model provider — please don&rsquo;t share sensitive information.
            </p>
          </form>
        </section>
      )}
      <button
        ref={launcher}
        className={styles.launcher}
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="portfolio-chat"
      >
        <span className={styles.launcherDot} aria-hidden="true" />
        {open ? "Close chat" : "Ask about Joshua"}
      </button>
    </div>
  );
}