import { stripIndent, stripIndents } from "common-tags";

export const iframeScript = stripIndents`<iframe
src="https://www.halbelf.com/chatbot-iframe/-LRpjtnLquTxYMRQyAUxm"
width="100%"
style="height: 100%; min-height: 700px"
frameborder="0"
></iframe>`;

export const bubbleScript = stripIndent`<script>
window.embeddedChatbotConfig = {
chatbotId: "-LRpjtnLquTxYMRQyAUxm",
domain: "www.halbelf.com"
}
</script>
<script
src="https://www.halbelf.com/embed.min.js"
chatbotId="-LRpjtnLquTxYMRQyAUxm"
domain="www.halbelf.com"
defer>
</script>`;
