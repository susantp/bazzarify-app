import { lexicalJsonToMarkdown } from "./lexicalJsonToMarkdown";

describe("lexicalJsonToMarkdown", () => {
  it("renders the product description node types used by the app", async () => {
    await expect(
      lexicalJsonToMarkdown({
        root: {
          children: [
            { type: "heading", tag: "h2", children: [{ text: "Details" }] },
            { type: "paragraph", children: [{ text: "Made for daily use." }] },
            {
              type: "listitem",
              children: [{ text: "Durable" }],
            },
            {
              type: "link",
              url: "https://example.test",
              children: [{ text: "Learn more" }],
            },
          ],
        },
      }),
    ).resolves.toBe(
      "## Details\n\nMade for daily use.\n\n- Durable\n\n[Learn more](https://example.test)",
    );
  });

  it("returns plain text input when the value is not Lexical JSON", async () => {
    await expect(lexicalJsonToMarkdown("Plain description")).resolves.toBe(
      "Plain description",
    );
  });
});
