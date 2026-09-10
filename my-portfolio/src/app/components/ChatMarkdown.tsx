import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import {
  chatLinkLabel,
  internalChatHref,
  remarkPortfolioLinks,
} from "@/src/lib/chat-markdown";

const components: Components = {
  a: ({ href, children }) => {
    const localHref = internalChatHref(href);
    if (localHref) {
      return (
        <Link href={localHref}>{chatLinkLabel(localHref) ?? children}</Link>
      );
    }
    if (!href) return <span>{children}</span>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export default function ChatMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkPortfolioLinks]}
    >
      {children}
    </ReactMarkdown>
  );
}
