import type { Link, Root, RootContent, Text } from "mdast";

const PATH_LABELS: Record<string, string> = {
  "/projects": "Project",
  "/contact": "Contact",
  "/education": "Education",
  "/skills": "Skills",
  "/experience": "Experience",
};

export function internalChatHref(href?: string): string | undefined {
  if (!href) return undefined;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    if (
      ["http:", "https:"].includes(url.protocol) &&
      ["localhost", "127.0.0.1"].includes(url.hostname)
    ) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export function chatLinkLabel(href: string): string | undefined {
  return PATH_LABELS[href.split(/[?#]/)[0]];
}

// Work on parsed text nodes so existing Markdown links and code stay intact.
export function remarkPortfolioLinks() {
  return (tree: Root) => {
    function visit(node: Root | RootContent) {
      if (
        node.type === "link" ||
        node.type === "linkReference" ||
        !("children" in node)
      )
        return;
      const children = node.children as RootContent[];
      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (child.type !== "text") {
          visit(child);
          continue;
        }
        const pattern =
          /(?<![\w/:])\/(?:projects|contact|education|skills|experience)(?=$|[\s?#.,!;)])(?:[?#][^\s<>\[\]()`]*)?/g;
        const replacements: (Text | Link)[] = [];
        let offset = 0;
        for (const match of child.value.matchAll(pattern)) {
          const href = match[0].replace(/[.,!;:]+$/, "");
          const start = match.index;
          if (start > offset)
            replacements.push({
              type: "text",
              value: child.value.slice(offset, start),
            });
          replacements.push({
            type: "link",
            url: href,
            children: [{ type: "text", value: chatLinkLabel(href) ?? href }],
          });
          offset = start + href.length;
        }
        if (!replacements.length) continue;
        if (offset < child.value.length)
          replacements.push({ type: "text", value: child.value.slice(offset) });
        children.splice(index, 1, ...replacements);
        index += replacements.length - 1;
      }
    }
    visit(tree);
  };
}
