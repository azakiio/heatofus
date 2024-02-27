// Define human-readable names for the core functionality of embedding a chat widget.
async function embedChatWidget() {
  // Check if the chat widget is already embedded to avoid re-embedding.
  if (window.chatWidgetAlreadyEmbedded) return;

  const currentScript = document.currentScript;
  const origin = new URL(currentScript.src).origin;
  const assistant_id = currentScript.getAttribute("chatbotId");
  const toggleChat = () => {
    const isChatIframeVisible = chatIframe.style.display !== "none";
    chatIframe.style.display = isChatIframeVisible ? "none" : "block";

    if (isChatIframeVisible) {
      chatButton.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="100%" 
      height="100%"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>`;
    } else {
      chatButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"/></g></svg>`;
    }
  };

  // Define default sizes and configurations.
  const buttonSize = 50,
    defaultButtonColor = "#000000",
    chatWidgetIframeId = "halbelf-bubble-window",
    closeButtonId = "halbelf-bubble-button";

  // Create and configure the chat button that will open the chat widget.
  const chatButton = document.createElement("button");
  chatButton.id = closeButtonId;
  chatButton.style.position = "fixed";
  chatButton.style.color = "white";
  chatButton.style.bottom = "20px";
  chatButton.style.right = "20px";
  chatButton.style.cursor = "pointer";
  chatButton.style.backgroundColor = defaultButtonColor;
  chatButton.style.width = `${buttonSize}px`;
  chatButton.style.height = `${buttonSize}px`;
  chatButton.style.padding = `10px`;
  chatButton.style.borderRadius = `999px`;
  chatButton.style.display = "flex";
  chatButton.style.justifyContent = "center";
  chatButton.style.alignItems = "center";
  chatButton.style.boxShadow = "0px 6px 10px 0px rgb(0,0,0,0.5)";
  chatButton.style.zIndex = "1000"; // Ensure it's above most other elements.
  chatButton.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>`;

  // Add the chat button to the body of the document.
  document.body.appendChild(chatButton);

  // Create and configure the chat iframe which will load the chat interface.
  const chatIframe = document.createElement("iframe");
  const thread_id = sessionStorage.getItem("thread_id");

  chatIframe.src = `${origin}/iframe`;

  if (assistant_id) {
    chatIframe.src += `?assistant_id=${assistant_id}`;
  }
  if (thread_id) {
    chatIframe.src += `&thread_id=${thread_id}`;
  }

  chatIframe.id = chatWidgetIframeId;
  chatIframe.style.display = "none";
  chatIframe.style.backgroundColor = "#fff";
  chatIframe.style.position = "fixed";
  chatIframe.style.bottom = "80px"; // Position it above the chat button.
  chatIframe.style.right = "20px";
  chatIframe.style.width = "350px"; // Default width, could be responsive.
  chatIframe.style.height = "450px"; // Default height.
  // chatIframe.style.border = "1px solid black";
  chatIframe.style.borderRadius = "10px";
  chatIframe.style.boxShadow = "0px 2px 10px 0px rgb(0,0,0,0.5)";
  chatIframe.style.zIndex = "999";

  document.body.appendChild(chatIframe);

  chatButton.addEventListener("click", toggleChat);
  window.addEventListener("message", (e) => {
    if (e.origin !== origin) {
      return;
    }
    if (e.data.closeIframe) {
      toggleChat();
    }
    if (e.data.thread_id) {
      console.log(e.data);
      sessionStorage.setItem("thread_id", e.data.thread_id);
    }
  });
}

if (document.readyState === "complete") {
  embedChatWidget();
} else {
  window.addEventListener("load", embedChatWidget);
}
