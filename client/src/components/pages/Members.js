import ChatWidget from "@paglipay/chat-widget";
import React from "react";

export default function Members() {
  return (
    <div>
      Members
      <ChatWidget
        // `accountId` is used instead of `token` in older versions
        // of the @paglipay/chat-widget package (before v1.2.x).
        // You can delete this line if you are on the latest version.
        // accountId="b5200b14-be9d-4915-aa64-f514fb2c6ad5"
        token="b5200b14-be9d-4915-aa64-f514fb2c6ad5"
        inbox="66180fcb-f6bf-49a6-934f-098ddc0a94c4"
        title="Welcome to Paglipay"
        subtitle="Ask us anything in the chat window below 😊"
        primaryColor="#1890ff"
        newMessagePlaceholder="Start typing..."
        showAgentAvailability={true}
        agentAvailableText="We're online right now!"
        agentUnavailableText="We're away at the moment."
        requireEmailUpfront={true}
        iconVariant="outlined"
        baseUrl="https://papercups.paglipay.info"
        // Optionally include data about your customer here to identify them
        // customer={{
        //   name: __CUSTOMER__.name,
        //   email: __CUSTOMER__.email,
        //   external_id: __CUSTOMER__.id,
        //   metadata: {
        //     plan: "premium"
        //   }
        // }}
      />
    </div>
  );
}
