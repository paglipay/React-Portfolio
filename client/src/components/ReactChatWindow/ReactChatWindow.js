import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Image,
  Card,
  Spinner,
  Badge,
} from "react-bootstrap";
import { Launcher } from "react-chat-window";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function ReactChatWindow() {
  const [consolelog, setConsolelog] = useState("");
  const [appUuid, setAppUuid] = useState("");
  const [messages, setMessages] = useState([
    {
      author: "me",
      type: "text",
      data: { text: "" },
    },{
      author: "them",
      type: "text",
      data: { text: "You are a helpful assistant." },
    },

  ]);

  const [prompt, setPrompt] = useState("");
  const [conversationHistory, setConversationHistory] = useState([
    {
      response: {
        role: "system",
        content: "You are a helpful assistant.",
      },
    },
  ]);

  const onMessageWasSent = (message) => {
    setMessages([...messages, message]);
    // setShowSpinner(true);
    const uuid = uuidv4();
    // await sendToApi(prompt, uuid, "generate_image");
    sendToApi(message, uuid);
  };

  // const sendPrompt = async (e) => {
  //   await e.preventDefault();
  //   listenStop();
  //   setShowSpinner(true);
  //   const uuid = uuidv4();
  //   // await sendToApi(prompt, uuid, "generate_image");
  //   sendToApi(prompt, uuid);
  // };

  const sendToApi = async (prompt, uuid) => {
    console.log("sendToApi: ", prompt);
    await axios
      .post(`https://automate.paglipay.info/start/${appUuid}`, {
      // .post(`http://192.168.2.203:5000/start/${appUuid}`, {
        // .post(`https://paglipay-dtree.herokuapp.com/start/${appUuid}`, {
        // .post(`https://paglipay-fastapi.herokuapp.com/start/${appUuid}`, {
        jobs: [
          {
            import: "Key",
          },
          {
            True: [
              {
                import: "OpenAiObj",
              },
              {
                conversation_history: conversationHistory,
              },
              {
                True: `${prompt.data.text}`,
              },
            ],
          },
        ],
      })
      .then(async (res) => {
        console.log(res);
        // await listenStop();

        if (res.data.hasOwnProperty("OpenAiObj")) {
          setConversationHistory(res.data["OpenAiObj"]);
          //   setMessage(
          //     res.data["OpenAiObj"][res.data["OpenAiObj"].length - 1]["response"][
          //       "content"
          //     ]
          //   );
          // setShowSpinner(false);

          const res_data = res.data["OpenAiObj"];

          setMessages(
            res_data.flatMap((e, i) =>
              "content" in e.response
                ? [{
                    author: "me",
                    type: "text",
                    data: { text: e.prompt },
                  },
                  {
                    author: "them",
                    type: "text",
                    data: { text: e.response.content },
                  }]
                : {
                    author: "them",
                    type: "text",
                    data: { text: "Sorry, the AI chat bot is only available during business hours 8am to 5pm PST" },
                  }
            )
          );

          //   if (
          //     "content" in res_data[res_data.length - 1]["response"] &&
          //     res_data.length <= 100
          //   ) {
          //     const uuid = uuidv4();
          //     getImage(
          //       res_data[res_data.length - 1]["response"]["content"],
          //       uuid,
          //       res_data
          //     );
          //     setSpeakText({
          //       text: res_data[res_data.length - 1]["response"]["content"],
          //     });
          //   } else if (
          //     "content" in res_data[res_data.length - 1]["response"] &&
          //     res_data.length > 100
          //   ) {
          //     setSpeakText({
          //       text: "This is a long response. I will display it on the screen.",
          //     });
          // }
        }
      })
      .catch(async (res) => {
        console.log(res);
        // setShowSpinner(false);
        // setSpeakText({
        //   text: "Sorry, there appears to be an issue connecting to the server.",
        // });
      });
  };

  useEffect(() => {
    setAppUuid(uuidv4());
  }, []);

  useEffect(() => {
    console.log("messages: ", messages);
  }, [messages]);

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "ai-assistant",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={messages}
        showEmoji
      />
    </div>
  );
}
