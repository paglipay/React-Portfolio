import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const Dictaphone = () => {
  const [consolelog, setConsolelog] = useState("");
  const [message, setMessage] = useState("");
  // const [value, setValue] = useState("");
  const { speak, voices } = useSpeechSynthesis();

  const [commands, setCommands] = useState([]);

  const start = async (e_ary) => {
    // const e = 0;
    const uuid = uuidv4();
    const new_cmds = await e_ary.map((e) => {
      return {
        command: e,
        callback: async () => {
          if (e === "computer") {
            const audio = new Audio("./computerbeep_50.mp3");
            await audio.play();
          }
          setMessage(`You said ${e}.`);
          // speak({ text: `${e}.` });
          await axios
            .post(`https://automate.paglipay.info/start/${uuid}:${e}`, {
              jobs: [
                {
                  import: "Key",
                },
                {
                  True: [`./my_packages/VoiceCmdObj/${e}/_create_list.json`],
                },
                {
                  True: [`./my_packages/VoiceCmdObj/${e}/out.json`],
                },
              ],
            })
            .then(async (res) => {
              console.log(res);
              await listenStop();
              await speak({
                text: res.data["VoiceCmdObj"].join(".\n "),
                voice: voices[4],
              });
              await start(res.data["VoiceCmdObj"]);

              // }
            });
        },
      };
    });

    setCommands(new_cmds.filter((f) => f["command"] !== ""));
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("commands", commands);
    setConsolelog(commands.map((e) => e.command).join("\n"));
  }, [commands]);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }
  const listenContinuously = async () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };
  const listenStop = async () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <div>
        <span>listening: {listening ? "on" : "off"}</span>
        <div>
          <Button
            type="button"
            onClick={() => {
              start(["computer"]);
            }}
          >
            Start
          </Button>
          <Button type="button" onClick={resetTranscript}>
            Reset
          </Button>
          <Button type="button" onClick={listenContinuously}>
            Listen
          </Button>
          <Button type="button" onClick={SpeechRecognition.stopListening}>
            Stop
          </Button>
        </div>
      </div>
      <div>
        <pre>{consolelog}</pre>
      </div>
      <div>{message}</div>
      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
};

export default Dictaphone;
