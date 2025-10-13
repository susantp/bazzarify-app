import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { createEditor } from "lexical";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";

type EditorStateJSON = string | Record<string, any>;

export async function lexicalJsonToMarkdown(
  editorStateJSON: EditorStateJSON,
): Promise<string> {
  const editor = createEditor({
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
      QuoteNode,
      // add custom nodes here
    ],
    // Theme is irrelevant for headless conversion
    theme: {},
  });

  const jsonString =
    typeof editorStateJSON === "string"
      ? editorStateJSON
      : JSON.stringify(editorStateJSON);

  // Parse and load the editor state
  editor.setEditorState(editor.parseEditorState(jsonString));

  // Read-only pass to export Markdown
  let markdown = "";
  editor.getEditorState().read(() => {
    markdown = $convertToMarkdownString(TRANSFORMERS);
  });

  return markdown;
}
