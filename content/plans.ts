interface Plan {
  name: string;
  features: string[];
  pricePerMonth: string;
  pricePerYear: string;
}

export const plans = {
  free: {
    name: "Free",
    features: [
      "20 message credits/month",
      "1 chatbot",
      "400,000 characters/chatbot",
      "Embed on unlimited websites",
      "Upload multiple files",
      "View conversation history",
      "Chatbots get deleted after 7 days of inactivity",
    ],
    pricePerMonth: "$0",
    pricePerYear: "$0",
    monthUrl: "/auth/signup",
    yearUrl: "/auth/signup",
    cta: "Get Started",
  },
  prod_PX0EO2QTg9Z6kc: {
    name: "Hobby",
    features: [
      "2,000 message credits/month",
      "2 chatbots",
      "11,000,000 characters/chatbot",
      "Embed on unlimited websites",
      "Upload multiple files",
      "View conversation history",
      "Wordpress integration",
      "WhatsApp integration (coming soon)",
    ],
    pricePerMonth: "$19",
    pricePerYear: "$190",
    monthUrl: "https://buy.stripe.com/test_aEUaH93PUbA66Gc7sx",
    yearUrl: "https://buy.stripe.com/test_4gw6qT2LQeMifcIeV0",
  },
  prod_PX0Guo8ZFa25M6: {
    name: "Standard",
    features: [
      "10,000 message credits/month",
      "5 chatbots",
      "11,000,000 characters/chatbot",
      "Embed on unlimited websites",
      "Upload multiple files",
      "View conversation history",
      "Wordpress integration",
      "WhatsApp integration (coming soon)",
      "Option to Choose GPT-4",
    ],
    pricePerMonth: "$99",
    pricePerYear: "$990",
    monthUrl: "https://buy.stripe.com/test_3cs6qT72647E4y43cf",
    yearUrl: "https://buy.stripe.com/test_7sI6qT86agUq6Gc7sw",
  },
  prod_PX0G6DWHtaC2RQ: {
    name: "Unlimited",
    features: [
      "40,000 message credits/month (Messages over the limit will use your OpenAI API Key)",
      "10 chatbots",
      "11,000,000 characters/chatbot",
      "Embed on unlimited websites",
      "Upload multiple files",
      "View conversation history",
      "API Access",
      "Wordpress integration",
      "WhatsApp integration (coming soon)",
      "Option to Choose GPT-4",
      "Remove 'Powered by Chatbase'",
      "Use your own custom domains",
    ],
    pricePerMonth: "$399",
    pricePerYear: "$3990",
    monthUrl: "https://buy.stripe.com/test_00geXpcmq7jQ5C8dQR",
    yearUrl: "https://buy.stripe.com/test_eVadTlcmq5bIggM4gi",
  },
} as const;

export default plans;
