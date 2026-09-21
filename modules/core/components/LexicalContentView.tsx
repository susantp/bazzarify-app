import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import { lexicalJsonToMarkdown } from "@/modules/core/utils/lexicalJsonToMarkdown";

type Props = {
  value: string | Record<string, unknown>; // Lexical editorState JSON
  onError?: (e: unknown) => void;
};

const md = MarkdownIt({ html: false, linkify: true, typographer: true });

export const LexicalContentView: React.FC<Props> = ({ value, onError }) => {
  const [mdText, setMdText] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const markdown = await lexicalJsonToMarkdown(value);
        if (mounted) setMdText(markdown || "");
      } catch (e) {
        onError?.(e);
        if (mounted) setMdText("");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [value, onError]);

  if (mdText === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Markdown markdownit={md} style={markdownStyles}>
      {mdText || ""}
    </Markdown>
  );
};

const styles = StyleSheet.create({
  loading: { padding: 12, alignItems: "center", justifyContent: "center" },
});

// Optional: tune how markdown looks in your app
const markdownStyles = {
  body: { fontSize: 16, lineHeight: 22 },
  heading1: { fontSize: 24, fontWeight: "700", marginTop: 12, marginBottom: 6 },
  heading2: { fontSize: 20, fontWeight: "700", marginTop: 10, marginBottom: 6 },
  paragraph: { marginTop: 6, marginBottom: 6 },
  code_inline: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  code_block: { padding: 10, borderRadius: 8 },
  fence: { padding: 10, borderRadius: 8 },
  bullet_list: { marginVertical: 6, paddingLeft: 18 },
  ordered_list: { marginVertical: 6, paddingLeft: 18 },
  link: { textDecorationLine: "underline" },
} as const;
