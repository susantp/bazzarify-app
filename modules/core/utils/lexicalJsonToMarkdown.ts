type LexicalState = string | Record<string, unknown>;
type LexicalNode = Record<string, unknown>;

function asNode(value: unknown): LexicalNode | null {
  return typeof value === "object" && value !== null
    ? (value as LexicalNode)
    : null;
}

function asChildren(node: LexicalNode): LexicalNode[] {
  return Array.isArray(node.children)
    ? node.children
        .map(asNode)
        .filter((child): child is LexicalNode => child !== null)
    : [];
}

function renderNode(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;

  const children = asChildren(node);
  const childText = children.map(renderNode).join("");
  const type = typeof node.type === "string" ? node.type : "";

  if (type === "heading") {
    const tag = typeof node.tag === "string" ? node.tag : "h2";
    const level = Number.parseInt(tag.replace("h", ""), 10);
    return `${"#".repeat(Number.isInteger(level) ? level : 2)} ${childText.trim()}`;
  }

  if (type === "listitem") return `- ${childText.trim()}`;
  if (type === "quote") return `> ${childText.trim()}`;
  if (type === "code") return `\`${childText.trim()}\``;
  if (type === "link" && typeof node.url === "string") {
    return `[${childText.trim()}](${node.url})`;
  }

  return childText;
}

function parseState(value: LexicalState): LexicalNode | null {
  if (typeof value !== "string") return asNode(value);

  try {
    return asNode(JSON.parse(value));
  } catch {
    return null;
  }
}

/**
 * Converts the subset of Lexical JSON used by product descriptions without
 * importing Lexical's platform-sensitive editor runtime. This keeps the
 * presentation contract identical on native and React Native Web.
 */
export async function lexicalJsonToMarkdown(
  editorStateJSON: LexicalState,
): Promise<string> {
  const state = parseState(editorStateJSON);
  const root = asNode(state?.root);

  if (!root) {
    return typeof editorStateJSON === "string" ? editorStateJSON : "";
  }

  return asChildren(root)
    .map(renderNode)
    .map((value) => value.trim())
    .filter(Boolean)
    .join("\n\n");
}
