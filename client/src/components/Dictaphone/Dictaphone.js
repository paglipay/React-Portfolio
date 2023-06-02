import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const Dictaphone = () => {
  const [consolelog, setConsolelog] = useState("");
  const [message, setMessage] = useState("");
  const [prompt, setPrompt] = useState("");
  // const [value, setValue] = useState("");
  const { speak } = useSpeechSynthesis();
  const [acceptedCommand, setAcceptedCommand] = useState("");
  const [commands, setCommands] = useState([]);
  const [repeatCommand, setRepeatCommand] = useState(true);
  const [debug, setDebug] = useState(true);

  const [appUuid, setAppUuid] = useState("");
  const start = async (e_ary) => {
    const uuid = uuidv4();
    const new_cmds = await e_ary.map((e) => {
      return {
        command: e.split("/").pop(),
        callback: async () => {
          setAcceptedCommand(e);
          if (e === "computer") {
            const audio = new Audio("./computerbeep_50.mp3");
            await audio.play();
          }
          await listenStop();
          setMessage(`You said ${e}.`);
          repeatCommand &&
            speak({ text: `${debug ? e : e.split("/").pop()}.` });
          await axios
            .post(
              `https://automate.paglipay.info/start/${uuid}:${e
                .split("/")
                .pop()}`,
              {
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
              }
            )
            .then(async (res) => {
              console.log(res);
              // await listenStop();

              if (res.data.hasOwnProperty("VoiceCmdObj" === false)) {
                speak({
                  text: "I am aware of this command, but I do not yet have an action for it. Would you like to create one?",
                });

                start(["create command", e]);
              }

              await speak({
                text: res.data["VoiceCmdObj"].slice(0, 1).join(".\n "),
                // voice: voices[4],
              });
              await start(res.data["VoiceCmdObj"]);

              // }
            })
            .catch(async (res) => {
              console.log(res);
              await speak({
                text: "Sorry, there appears to be an issue connecting to the server.",
              });
            });
        },
      };
    });

    setCommands(new_cmds.filter((f) => f["command"] !== ""));
  };

  useEffect(() => {
    setAppUuid(uuidv4());
  }, []);

  const cpTranscriptToPrompt = async (e) => {
    e.preventDefault();
    setPrompt(transcript);
    listenStop();
  };

  const sendPrompt = async (e) => {
    e.preventDefault();

    const uuid = uuidv4();
    await axios
      .post(`https://automate.paglipay.info/start/${uuid}`, {
        jobs: [
          {
            import: "Key",
          },
          {
            True: [
              {
                import: "RequestsObj",
              },
              {
                open: {
                  ip: `http://192.168.2.213:5000/start/${appUuid}`,
                  jobs: [
                    {
                      import: "Key",
                    },
                    "213",
                    {
                      True: [
                        {
                          import: "OpenAiObj",
                        },
                        {
                          True: `${prompt}`,
                        },
                      ],
                    },
                  ],
                },
              },
              "end",
            ],
          },
        ],
      })
      .then(async (res) => {
        console.log(res);
        // await listenStop();

        if (res.data.hasOwnProperty("OpenAiObj")) {
          setPrompt(
            res.data["OpenAiObj"][res.data["OpenAiObj"].length - 1][
              "response"
            ].replace("system: ", "").replace("System: ", "")
          );
          speak({
            text: res.data["OpenAiObj"][res.data["OpenAiObj"].length - 1][
              "response"
            ].replace("system: ", "").replace("System: ", ""),
          });
        }
      })
      .catch(async (res) => {
        console.log(res);
        await speak({
          text: "Sorry, there appears to be an issue connecting to the server.",
        });
      });
  };

  useEffect(() => {
    console.log("commands", commands);
    setConsolelog(commands.map((e) => e.command).join("\n"));
  }, [commands]);

  // useEffect(() => {
  //   console.log("transcript", transcript);
  //   setPrompt(transcript);
  // }, [transcript]);

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
          <Form>
            <Form.Check
              type="checkbox"
              id={`default-checkbox`}
              label={`Repeat Command`}
              onClick={() => setRepeatCommand(!repeatCommand)}
              checked={repeatCommand}
            />
            <Form.Check
              type="checkbox"
              id={`default-checkbox`}
              label={`Debug Mode`}
              onClick={() => setDebug(!debug)}
              checked={debug}
            />
          </Form>
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
      {debug && (
        <div>
          <pre>{consolelog}</pre>
        </div>
      )}
      <div>{message}</div>
      <div>
        <span>{acceptedCommand}</span>
      </div>
      <div>
        <span>{transcript}</span>
        <Form>
          <Form.Group controlId="trascript">
            <Form.Label>Transcript</Form.Label>
            <Form.Control
              onFocus={cpTranscriptToPrompt}
              as="textarea"
              rows={3}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={sendPrompt}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Dictaphone;
