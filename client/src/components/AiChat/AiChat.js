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
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function AiChat(props) {
  const [consolelog, setConsolelog] = useState("");
  const [message, setMessage] = useState([
    <Col lg={12}>
      <p key={"i"} style={{ textAlign: "center" }}>
        {/* <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body> */}
        <Image src="./logo192.png"></Image>
        {/* </Card.Body>
      </Card> */}
      </p>
    </Col>,
  ]);

  const [prompt, setPrompt] = useState("");
  const [conversationHistory, setConversationHistory] = useState([
    {
      response: {
        role: "system",
        // content: "You are a helpful assistant.",
        content:
          "You are Paul Aglipay, a job interviewing applicant. Answer typical job interview questions as an applicant.\n Here's a copy of my resume\n\nPaul Aglipay\nLos Angeles, California, United States\nEmail: paglipay@gmail.com\nLinkedIn: https://www.linkedin.com/in/paul-aglipay-11564046/\nSummary\nDynamic Software Engineer with extensive experience in Network and Systems Engineering. Skilled in delivering advanced data analytics, reporting, and dashboard solutions. Strong communicator and problem-solver with a proven track record.\nSkills\n•	Version Control Systems: Git (Github, GitLab)\n•	Cloud Platforms: AWS, Azure, GCP\n•	Operating Systems: Linux, Windows\n•	Databases: Oracle SQL, Microsoft SQL, MariaDB, Postgres, MongoDB\n•	Programming Languages: Python, Java, Javascript, Typescript\n•	Frameworks: React (NextJS, NX), Angular, ExpressJS, Django, Spring Boot\n•	Testing: Robot Framework, Pytest, PyUnit (Unittest), Cypress, Selenium\n•	DevOps: ArgoCD, Jenkins, Terraform, Ansible, Docker Swarm, Kubernetes, Nagios\n•	Other Skills: Full-Stack Development, Issue Tracking, Data Mapping, Communication, Problem-solving, Fast-paced Adaptability\nExperience\nNetwork Engineer, University of California, Los Angeles (UCLA)\nOct 2016 – Present \nI oversee the Network Services Department's monitoring system, ensuring seamless integration of campus network devices in a timely manner. This involves meticulous tracking and proactive communication to facilitate smooth transitions. I excel in troubleshooting minor issues stemming from bugs or misconfigurations, leveraging my expertise in monitoring tools such as NetDisco, Rancid (GitLab / Hound), Nagios (Thruk), PagerDuty, and Aruba Airwave VMs. Additionally, I'm responsible for network infrastructure management, configuration, and optimization, as well as providing technical support to ensure network reliability and performance.\nSoftware Engineer, Walmart Global Tech (Revature)\nJan 2022 - Aug 2022\n•	Spearheaded the development of Chrome extensions aimed at optimizing internal tooling within the Advertisement department.\n•	Resolved intricate iframe integration challenges on business customer pages, ensuring uninterrupted and seamless functionality\n•	. Played a pivotal role in implementing minor CSS fixes to enhance the user experience on walmart.com.\nSoftware Engineer, DataSlate\nJan 2021 - Apr 2021\n•	Contributed to Full-Stack software development projects.\n•	Collaborated with cross-functional teams for product delivery.\nNetwork Engineering, Optomi\nApr 2016 - Oct 2016\n•	Provided comprehensive network engineering support for projects at UCLA, including the design, implementation, and optimization of network infrastructure.\n•	Collaborated closely with stakeholders to assess network requirements and recommend appropriate Cisco solutions to meet organizational needs.\n•	Conducted thorough testing and validation of network configurations to ensure seamless integration and compatibility with existing systems.\n•	Assisted in the development of documentation and training materials to support the ongoing maintenance and administration of the upgraded Cisco infrastructure.\n•	Contributed to the overall success of network engineering projects by delivering high-quality solutions on time and within budget constraints.\nNetwork Engineer, NIC Partners\nOct 2015 - Apr 2016\n•	Provided network engineering support for projects at Network Engineering Consultant at Cedars-Sinai Medical Center.\n•	Collaborated closely with stakeholders to assess network requirements and recommend appropriate Cisco solutions to meet organizational needs.\n•	Conducted thorough testing and validation of network configurations to ensure seamless integration and compatibility with existing systems.\n•	Contributed to the overall success of network engineering projects by delivering high-quality solutions on time and within budget constraints\nSystems / Network Engineering, Burbank Bob Hope Airport\nNov 2014 - Oct 2015\n•	Managed IT systems administration tasks, including the setup, configuration, and maintenance of Windows Active Directory environments.\n•	Oversaw user account management, group policy implementation, and security protocols within the Active Directory infrastructure.\nSystems Administrator, Cable Engineering Services\nJan 2008 - Nov 2014\n•	Managed IT systems administration tasks.\nSystems Administrator, BMS Communications Inc.\nSep 2001 - Apr 2008\n•	Administered IT systems and provided technical support.\n\nEducation\n•	Bachelor's degree, Computer Visualization Technology, ITT Technical Institute-Sylmar, Sep 2000 - Jun 2003\n•	Post Graduate Program in DevOps, Caltech - Center of Technology and Education, 2024\n•	Certificate, Full-Stack Developer, UCLA Extension, 2020\n•	Brand College, Cisco, 2012 - 2018\nLicenses & Certifications\n•	AWS Certified Developer - Associate\no	Earned: December 09, 2023\no	Expires: December 09, 2026\n•	AWS Certified Cloud Practitioner\no	Earned: October 28, 2023\no	Expires: October 28, 2026\n•	Microsoft Certified: Azure Fundamentals\no	Earned: January 13, 2024\n•	Post Graduate Program in DevOps, Caltech - Center of Technology and Education\no	Earned: March, 2024\n•	CCNA, Cisco\no	Earned: September 23, 2023\no	Expires: September 23, 2026\n•	Kubernetes Certified Associate (KCA)\no	Target Date: June 2024\n\n",
      },
    },
  ]);
  const { speak } = useSpeechSynthesis();
  const [acceptedCommand, setAcceptedCommand] = useState("");
  const [commands, setCommands] = useState([]);
  const [commandButtons, setCommandButtons] = useState([]);
  const [repeatCommand, setRepeatCommand] = useState(true);
  const [debug, setDebug] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPromptBox, setShowPromptBox] = useState(true);
  const [badgeStatus, setBadgeStatus] = useState("danger");
  const [appUuid, setAppUuid] = useState("");
  const [speakText, setSpeakText] = useState({ text: "" });
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
          //   setMessage(`You said ${e}.`);
          repeatCommand &&
            speak({ text: `${debug ? e : e.split("/").pop()}.` });
          await axios
            .post(
              // `https://automate.paglipay.info/start/${uuid}:${e
              //   .split("/")
              //   .pop()}`,
              `http://192.168.2.213:5000/start/${uuid}:${e.split("/").pop()}`,
              // `https://paglipay-dtree.herokuapp.com/start/${uuid}:${e.split("/").pop()}`,
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

  useEffect(() => {
    if (speakText["text"] != "") {
      speak(speakText);
    }
  }, [speakText]);

  const cpTranscriptToPrompt = async (e) => {
    e.preventDefault();
    if (prompt == "") {
      setPrompt(transcript);
    }
    listenStop();
  };

  useEffect(() => {
    console.log("appUuid", appUuid);
  }, [appUuid]);

  const sendPrompt = async (e) => {
    await e.preventDefault();
    listenStop();
    setShowSpinner(true);
    const uuid = uuidv4();
    // await sendToApi(prompt, uuid, "generate_image");
    sendToApi(prompt, uuid);
  };

  const sendToPrompt = async (prompt) => {
    setPrompt(prompt);
    listenStop();
    setShowSpinner(true);
    const uuid = uuidv4();
    sendToApi(prompt, uuid);
  };

  const sendTranscript = async (e) => {
    await e.preventDefault();
    listenStop();
    setShowSpinner(true);
    const uuid = uuidv4();
    // await sendToApi(transcript, uuid, "generate_image");
    // sendToApi(transcript, uuid);
  };
  const getImage = async (prompt, uuid, convoHistory) => {
    console.log("convoHistory: ", convoHistory);
    await axios
      // .post(`https://automate.paglipay.info/start/${appUuid}`, {
      // .post(`http://192.168.2.213:5000/start/${appUuid}`, {
      .post(`https://paglipay-dtree.herokuapp.com/start/${appUuid}`, {
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
                conversation_history: convoHistory,
              },
              {
                generate_image: `${prompt}`,
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
          // setMessage(
          //   res.data["OpenAiObj"][res.data["OpenAiObj"].length - 1]["response"][
          //     "content"
          //   ]
          // );
          setShowSpinner(false);
          const res_data = res.data["OpenAiObj"];

          setMessage(
            <Col lg={12}>
              {/* <Card>
                <Card.Header>Header</Card.Header>
                <Card.Body> */}
              {res_data.map((e, i) =>
                "content" in e.response ? (
                  i === 0 ? <pre key={i} style={{ textAlign: "left" }}>
                    {e.response.content}
                  </pre>:<p key={i} style={{ textAlign: "left" }}>
                    {e.response.content}
                  </p>
                ) : (
                  <Card key={i} className={"mb-3"}>
                    <Image src={e.response["image"]}></Image>
                    <Card.Footer></Card.Footer>
                  </Card>
                )
              )}
              {/* </Card.Body>
              </Card> */}
            </Col>
          );
        }
      })
      .catch(async (res) => {
        console.log(res);
        setShowSpinner(false);
      });
  };
  const sendToApi = async (prompt, uuid) => {
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
                True: `${prompt}`,
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

          setMessage(
            <Col lg={12}>
              {/* <Card>
                <Card.Header>Header</Card.Header>
                <Card.Body> */}
              {res_data.map((e, i) =>
                "content" in e.response ? (
                  i === 0 ? <pre key={i} style={{ textAlign: "left" }}>
                    {e.response.content}
                  </pre>:<p key={i} style={{ textAlign: "left" }}>
                    {e.response.content}
                  </p>
                ) : (
                  <Card key={i} className={"mb-3"}>
                    <Image src={e.response["image"]}></Image>
                    <Card.Footer></Card.Footer>
                  </Card>
                )
              )}
              {/* </Card.Body>
              </Card> */}
            </Col>
          );
          if (
            "content" in res_data[res_data.length - 1]["response"] &&
            res_data.length <= 100
          ) {
            const uuid = uuidv4();
            getImage(
              res_data[res_data.length - 1]["response"]["content"],
              uuid,
              res_data
            );
            setSpeakText({
              text: res_data[res_data.length - 1]["response"]["content"],
            });
          } else if (
            "content" in res_data[res_data.length - 1]["response"] &&
            res_data.length > 100
          ) {
            setSpeakText({
              text: "This is a long response. I will display it on the screen.",
            });
          }
        }
      })
      .catch(async (res) => {
        console.log(res);
        setShowSpinner(false);
        setSpeakText({
          text: "Sorry, there appears to be an issue connecting to the server.",
        });
      });
  };

  useEffect(() => {
    console.log("commands", commands);
    setConsolelog(commands.map((e) => e.command).join("\n"));
    setCommandButtons(
      commands.map((e) => (
        <>
          {" "}
          <Button onClick={e.callback}>{e.command}</Button>{" "}
        </>
      ))
    );
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
    <Row key={props.title}>
      <Col lg={12}>
        <Card style={{ height: "100%" }}>
          <Card.Header
            className="mb-3"
            as="h5"
            // onClick={() => toggleS(setSize)}
          >
            {/* <BsPersonFill size={50}/> */}
            {/* <Image src={`https://randomuser.me/api/portraits/med/men/${(() => Math.floor(Math.random() * 10))()}.jpg`} roundedCircle /> */}{" "}
            {"Instant Interview - Ask me typical job interview questions. I am available typically during regular office hours, Monday through Friday, 9am. to 5pm. Pacific Standard Time."}
            <Badge variant={"badgeStatus"} style={{ float: "right" }}>
              {"badgeStatus".charAt(0).toUpperCase() + "badgeStatus".slice(1)}
            </Badge>{" "}
          </Card.Header>
          <div>
            <Row>
              <Col lg={0}>
                <div></div>
              </Col>
              <Col lg={12}>
                <div>
                  <p>{message}</p>
                </div>
              </Col>
              <Col lg={0}>
                <div></div>
              </Col>
            </Row>
            <Col lg={12} style={{ display: "flex", justifyContent: "center" }}>
              <Spinner
                animation="border"
                style={{ display: showSpinner ? "block" : "none", margin: 10 }}
              />
            </Col>
            <h1>
              {" "}
              {listening ? (
                <Badge variant={"success"} style={{ float: "middle" }}>
                  {"Listening: On"}
                </Badge>
              ) : (
                <Badge variant={badgeStatus} style={{ float: "middle" }}>
                  {"Listening: Off"}
                </Badge>
              )}
            </h1>

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
              <Button
                type="button"
                onClick={(e) => {
                  resetTranscript(e);
                  setShowPromptBox(false);
                }}
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  listenContinuously(e);
                  setPrompt("");
                  setShowPromptBox(false);
                }}
              >
                Listen
              </Button>
              <Button type="button" onClick={SpeechRecognition.stopListening}>
                Stop
              </Button>
            </div>
          </div>
          {debug && (
            <div>
              {/* <p>{consolelog}</p> */}
              {commandButtons}
            </div>
          )}
          <div>
            <span>{acceptedCommand}</span>
          </div>

          <div>
            <Form
              style={{ display: showPromptBox ? "none" : "block", margin: 10 }}
            >
              <Form.Group controlId="trascript">
                <h3
                  onClick={(e) => {
                    if (transcript != "") {
                      cpTranscriptToPrompt(e);
                      setShowPromptBox(true);
                    }
                  }}
                >
                  {transcript}
                </h3>
              </Form.Group>
              <Button variant="primary" type="button" onClick={sendTranscript}>
                sendTranscript
              </Button>
            </Form>
            <Form
              style={{ display: showPromptBox ? "block" : "none", margin: 10 }}
            >
              <Form.Group controlId="trascript">
                <Form.Label>Transcript</Form.Label>
                <Form.Control
                  onFocus={cpTranscriptToPrompt}
                  as="textarea"
                  rows={6}
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={sendPrompt}>
                Send Prompt
              </Button>
              {[
                "Can you tell me a little about yourself?",
                "Describe your work history.",
                "What are your greatest strengths?",
                "What are your weaknesses?",
                "Can you describe a challenge you faced and how you dealt with it?",
                "Where do you see yourself in five years?",
                "Why did you leave your last job?",
                "What can you bring to this company?",
                "How do you handle stress and pressure?",
                "Do you have any questions for us?",
              ].map((i) => {
                return (
                  <>
                    {" "}
                    <Button
                      style={{ margin: 5 }}
                      variant="outline-primary"
                      type="button"
                      onClick={() => sendToPrompt(i)}
                    >
                      {i}
                    </Button>
                  </>
                );
              })}
            </Form>
          </div>
          <Card.Footer>
            <h6>UUID: {appUuid}</h6>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default AiChat;
