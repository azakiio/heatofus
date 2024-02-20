import { stripIndent, stripIndents } from "common-tags";

export const iframeScript = stripIndents`<iframe
src="https://www.halbelf.com/chatbot-iframe/-LRpjtnLquTxYMRQyAUxm"
width="100%"
style="height: 100%; min-height: 700px"
frameborder="0"
></iframe>`;

export const bubbleScript = (assistant_id: string) => stripIndent`
<script
src="https://www.halbelf.com/embed.js"
chatbotId="${assistant_id}"
defer>
</script>`;
