import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import Markdown from "markdown-to-jsx";
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
  const str = `# Paul Aglipay

  **Location:** Los Angeles, California, United States  
  **Email:** [paglipay@gmail.com](mailto:paglipay@gmail.com)  
  **LinkedIn:** [linkedin.com/in/paul-aglipay-11564046](https://www.linkedin.com/in/paul-aglipay-11564046/)
  
  ---
  
  ## Summary
  
  Dynamic Software Engineer with extensive experience in Network and Systems Engineering. Skilled in delivering advanced data analytics, reporting, and dashboard solutions. Strong communicator and problem-solver with a proven track record.
  
  ---
  
  ## Skills
  
  - **Version Control Systems:** Git (Github, GitLab)
  - **Cloud Platforms:** AWS, Azure, GCP
  - **Operating Systems:** Linux, Windows
  - **Databases:** Oracle SQL, Microsoft SQL, MariaDB, Postgres, MongoDB
  - **Programming Languages:** Python, Java, Javascript, Typescript
  - **Frameworks:** React (NextJS, NX), Angular, ExpressJS, Django, Spring Boot
  - **Testing:** Robot Framework, Pytest, PyUnit (Unittest), Cypress, Selenium
  - **DevOps:** ArgoCD, Jenkins, Terraform, Ansible, Docker Swarm, Kubernetes, Nagios
  - **Other Skills:** Full-Stack Development, Issue Tracking, Data Mapping, Communication, Problem-solving, Fast-paced Adaptability
  
  ---
  
  ## Experience
  
  ### Network Engineer, University of California, Los Angeles (UCLA)
  **Oct 2016 – Present**
  
  - Oversee the Network Services Department's monitoring system, ensuring seamless integration of campus network devices.
  - Track and proactively communicate to facilitate smooth transitions.
  - Troubleshoot minor issues from bugs or misconfigurations using tools like NetDisco, Rancid (GitLab / Hound), Nagios (Thruk), PagerDuty, and Aruba Airwave VMs.
  - Manage, configure, and optimize network infrastructure, providing technical support to ensure reliability and performance.
  
  ### Software Engineer, Walmart Global Tech (Revature)
  **Jan 2022 - Aug 2022**
  
  - Developed Chrome extensions for optimizing internal tooling within the Advertisement department.
  - Resolved intricate iframe integration challenges on business customer pages.
  - Implemented minor CSS fixes to enhance the user experience on walmart.com.
  
  ### Software Engineer, DataSlate
  **Jan 2021 - Apr 2021**
  
  - Contributed to Full-Stack software development projects.
  - Collaborated with cross-functional teams for product delivery.
  
  ### Network Engineer, Optomi
  **Apr 2016 - Oct 2016**
  
  - Provided comprehensive network engineering support for UCLA projects, including network infrastructure design, implementation, and optimization.
  - Assessed network requirements and recommended appropriate Cisco solutions.
  - Conducted testing and validation of network configurations.
  - Developed documentation and training materials for Cisco infrastructure maintenance and administration.
  
  ### Network Engineer, NIC Partners
  **Oct 2015 - Apr 2016**
  
  - Supported network engineering projects at Cedars-Sinai Medical Center.
  - Assessed network requirements and recommended Cisco solutions.
  - Conducted thorough testing and validation of network configurations.
  
  ### Systems / Network Engineer, Burbank Bob Hope Airport
  **Nov 2014 - Oct 2015**
  
  - Managed IT systems administration tasks, including setup, configuration, and maintenance of Windows Active Directory environments.
  - Oversaw user account management, group policy implementation, and security protocols.
  
  ### Systems Administrator, Cable Engineering Services
  **Jan 2008 - Nov 2014**
  
  - Managed IT systems administration tasks.
  
  ### Systems Administrator, BMS Communications Inc.
  **Sep 2001 - Apr 2008**
  
  - Administered IT systems and provided technical support.
  
  ---
  
  ## Education
  
  - **Bachelor's Degree**, Computer Visualization Technology, ITT Technical Institute-Sylmar, Sep 2000 - Jun 2003
  - **Post Graduate Program in DevOps**, Caltech - Center of Technology and Education, 2024
  - **Certificate**, Full-Stack Developer, UCLA Extension, 2020
  - **Brand College**, Cisco, 2012 - 2018
  
  ---
  
  ## Licenses & Certifications
  
  - **AWS Certified Developer - Associate**
    - Earned: December 09, 2023
    - Expires: December 09, 2026
  - **AWS Certified Cloud Practitioner**
    - Earned: October 28, 2023
    - Expires: October 28, 2026
  - **Microsoft Certified: Azure Fundamentals**
    - Earned: January 13, 2024
  - **Post Graduate Program in DevOps**, Caltech - Center of Technology and Education
    - Earned: March, 2024
  - **CCNA, Cisco**
    - Earned: September 23, 2023
    - Expires: September 23, 2026
  - **Kubernetes Certified Associate (KCA)**
    - Target Date: June 2024
  `;
  const [consolelog, setConsolelog] = useState("");
  const [message, setMessage] = useState([
    <Col lg={12}>
      <p key={"i"} style={{ textAlign: "center" }}>
        {/* <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body> */}
        <Image src="./IMG_2885.JPG"></Image>
        <h1>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1000)
                .typeString(
                  "Hello! My name is Paul Aglipay, and I’m excited to be here for the job interview. How are you today? Please feel free to ask me any job interview questions using the Question Prompt field. I’m looking forward to our conversation!"
                )
                // .pauseFor(1000)
                // .deleteAll()
                // .typeString("Welcomes You")
                .start();
            }}
          />
        </h1>
        <Markdown
          style={{ textAlign: "left" }}
          options={{ wrapper: "article" }}
        >
          {str}
        </Markdown>
        ;
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
          "You are Paul Aglipay's avatar, a job interviewing applicant. Answer job interview questions as the applicant.\n Here's a copy of the applicant's resume\n\nPaul Aglipay\nLos Angeles, California, United States\nEmail: paglipay@gmail.com\nLinkedIn: https://www.linkedin.com/in/paul-aglipay-11564046/\nSummary\nDynamic Software Engineer with extensive experience in Network and Systems Engineering. Skilled in delivering advanced data analytics, reporting, and dashboard solutions. Strong communicator and problem-solver with a proven track record.\nSkills\n•	Version Control Systems: Git (Github, GitLab)\n•	Cloud Platforms: AWS, Azure, GCP\n•	Operating Systems: Linux, Windows\n•	Databases: Oracle SQL, Microsoft SQL, MariaDB, Postgres, MongoDB\n•	Programming Languages: Python, Java, Javascript, Typescript\n•	Frameworks: React (NextJS, NX), Angular, ExpressJS, Django, Spring Boot\n•	Testing: Robot Framework, Pytest, PyUnit (Unittest), Cypress, Selenium\n•	DevOps: ArgoCD, Jenkins, Terraform, Ansible, Docker Swarm, Kubernetes, Nagios\n•	Other Skills: Full-Stack Development, Issue Tracking, Data Mapping, Communication, Problem-solving, Fast-paced Adaptability\nExperience\nNetwork Engineer, University of California, Los Angeles (UCLA)\nOct 2016 – Present \nI oversee the Network Services Department's monitoring system, ensuring seamless integration of campus network devices in a timely manner. This involves meticulous tracking and proactive communication to facilitate smooth transitions. I excel in troubleshooting minor issues stemming from bugs or misconfigurations, leveraging my expertise in monitoring tools such as NetDisco, Rancid (GitLab / Hound), Nagios (Thruk), PagerDuty, and Aruba Airwave VMs. Additionally, I'm responsible for network infrastructure management, configuration, and optimization, as well as providing technical support to ensure network reliability and performance.\nSoftware Engineer, Walmart Global Tech (Revature)\nJan 2022 - Aug 2022\n•	Spearheaded the development of Chrome extensions aimed at optimizing internal tooling within the Advertisement department.\n•	Resolved intricate iframe integration challenges on business customer pages, ensuring uninterrupted and seamless functionality\n•	. Played a pivotal role in implementing minor CSS fixes to enhance the user experience on walmart.com.\nSoftware Engineer, DataSlate\nJan 2021 - Apr 2021\n•	Contributed to Full-Stack software development projects.\n•	Collaborated with cross-functional teams for product delivery.\nNetwork Engineering, Optomi\nApr 2016 - Oct 2016\n•	Provided comprehensive network engineering support for projects at UCLA, including the design, implementation, and optimization of network infrastructure.\n•	Collaborated closely with stakeholders to assess network requirements and recommend appropriate Cisco solutions to meet organizational needs.\n•	Conducted thorough testing and validation of network configurations to ensure seamless integration and compatibility with existing systems.\n•	Assisted in the development of documentation and training materials to support the ongoing maintenance and administration of the upgraded Cisco infrastructure.\n•	Contributed to the overall success of network engineering projects by delivering high-quality solutions on time and within budget constraints.\nNetwork Engineer, NIC Partners\nOct 2015 - Apr 2016\n•	Provided network engineering support for projects at Network Engineering Consultant at Cedars-Sinai Medical Center.\n•	Collaborated closely with stakeholders to assess network requirements and recommend appropriate Cisco solutions to meet organizational needs.\n•	Conducted thorough testing and validation of network configurations to ensure seamless integration and compatibility with existing systems.\n•	Contributed to the overall success of network engineering projects by delivering high-quality solutions on time and within budget constraints\nSystems / Network Engineering, Burbank Bob Hope Airport\nNov 2014 - Oct 2015\n•	Managed IT systems administration tasks, including the setup, configuration, and maintenance of Windows Active Directory environments.\n•	Oversaw user account management, group policy implementation, and security protocols within the Active Directory infrastructure.\nSystems Administrator, Cable Engineering Services\nJan 2008 - Nov 2014\n•	Managed IT systems administration tasks.\nSystems Administrator, BMS Communications Inc.\nSep 2001 - Apr 2008\n•	Administered IT systems and provided technical support.\n\nEducation\n•	Bachelor's degree, Computer Visualization Technology, ITT Technical Institute-Sylmar, Sep 2000 - Jun 2003\n•	Post Graduate Program in DevOps, Caltech - Center of Technology and Education, 2024\n•	Certificate, Full-Stack Developer, UCLA Extension, 2020\n•	Brand College, Cisco, 2012 - 2018\nLicenses & Certifications\n•	AWS Certified Developer - Associate\no	Earned: December 09, 2023\no	Expires: December 09, 2026\n•	AWS Certified Cloud Practitioner\no	Earned: October 28, 2023\no	Expires: October 28, 2026\n•	Microsoft Certified: Azure Fundamentals\no	Earned: January 13, 2024\n•	Post Graduate Program in DevOps, Caltech - Center of Technology and Education\no	Earned: March, 2024\n•	CCNA, Cisco\no	Earned: September 23, 2023\no	Expires: September 23, 2026\n•	Kubernetes Certified Associate (KCA)\no	Target Date: June 2024\n\n",
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
  const [badgeStatus, setBadgeStatus] = useState("info");
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
              `https://automate.paglipay.info/start/${uuid}:${e
                .split("/")
                .pop()}`,
              // `http://192.168.2.213:5000/start/${uuid}:${e.split("/").pop()}`,
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
                text: "Sorry, there appears to be an issue connecting. I am available typically during regular office hours, Monday through Friday, 9am. to 5pm. Pacific Standard Time.",
              });
            });
        },
      };
    });

    setCommands(new_cmds.filter((f) => f["command"] !== ""));
  };

  useEffect(() => {
    setAppUuid(uuidv4());
    setSpeakText({
      text: "Hello! My name is Paul Aglipay, and I’m excited to be here for the job interview. How are you today? Please feel free to ask me any job interview questions using the Question Prompt field. I’m looking forward to our conversation!",
    });
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
      .post(`https://automate.paglipay.info/start/${appUuid}`, {
        // .post(`http://192.168.2.213:5000/start/${appUuid}`, {
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
              // {
              //   functions_call_list: [
              //     {
              //       name: "create_markdown",
              //       dtree: "./json/openai/create_markdown/_create_list.json",
              //       arguments: "messages",
              //       arguments_target:
              //         "./json/openai/create_markdown/_list.json",
              //       return_obj: "OpenAiObj",
              //     },
              //   ],
              // },
              // {
              //   functions_call: {
              //     functions: [
              //       {
              //         name: "create_markdown",
              //         description:
              //           "You have the option to add a markdown formated response.",
              //         parameters: {
              //           type: "object",
              //           properties: {
              //             messages: {
              //               type: "array",
              //               items: {
              //                 type: "string",
              //                 description: "markdown formated response",
              //               },
              //               description: "List of markdown formated responses",
              //             },
              //           },
              //           required: ["messages"],
              //         },
              //       },
              //     ],
              //     function_call: "auto",
              //   },
              // },
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
            <>
              {/* <Card>
                <Card.Header>Header</Card.Header>
                <Card.Body> */}
              {res_data.map((e, i) =>
                "content" in e.response ? (
                  i === 0 ? (
                    <Col lg={12}>
                      <Row>
                        <Col lg={3}>
                          <div>
                            <Image
                              src="./StylizePhoto_2_20240531.jpeg"
                              style={{ marginBottom: "10px", width: "100%" }}
                            ></Image>
                          </div>
                        </Col>
                        <Col lg={9}>
                          <pre
                            key={i}
                            style={{
                              textAlign: "left",
                              height: "300px",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            {e.response.content}
                          </pre>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    <Col lg={12}>
                      <Card key={`p-card${i}`} className={"mb-3"}>
                        <Card.Header className="mb-3" as="h6">
                          {e.prompt}
                        </Card.Header>
                        <Card.Body key={i}>
                          <Card.Text>
                            {e.functions.length > 0 && e.functions
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  <pre>{line.content}</pre>
                                  <br />
                                </React.Fragment>
                              ))}
                            <Markdown
                              style={{ textAlign: "left" }}
                              options={{ wrapper: "article" }}
                            >
                              {e.response.content}
                            </Markdown>
                            ;
                            {/* {e.response.content
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))} */}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                ) : (
                  <>
                  <Col lg={8}>
                    <Card key={`img-8-${i}`} className={"mb-3"}>
                      <Image src={e.response["image"]}></Image>
                      <Card.Footer></Card.Footer>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card key={`img-4-${i}`} className={"mb-3"}>
                      <Card.Body>
                        <Card.Text>
                          <Markdown
                              style={{ textAlign: "left" }}
                              options={{ wrapper: "article" }}
                            >
                            {e.response["image_prompt"]}
                            </Markdown>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer></Card.Footer>
                    </Card>
                  </Col>
                  </>
                )
              )}
              {/* </Card.Body>
              </Card> */}
            </>
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
            <>
              {/* <Card>
                <Card.Header>Header</Card.Header>
                <Card.Body> */}
              {res_data.map((e, i) =>
                "content" in e.response ? (
                  i === 0 ? (
                    <Col lg={12}>
                      <Row>
                        <Col lg={3}>
                          <div>
                            <Image
                              src="./StylizePhoto_2_20240531.jpeg"
                              style={{ marginBottom: "10px", width: "100%" }}
                            ></Image>
                          </div>
                        </Col>
                        <Col lg={9}>
                          <pre
                            key={i}
                            style={{
                              textAlign: "left",
                              height: "300px",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            {e.response.content}
                          </pre>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    <Col lg={12}>
                      <Card key={`p-card${i}`} className={"mb-3"}>
                        <Card.Header className="mb-3" as="h6">
                          {e.prompt}
                        </Card.Header>
                        <Card.Body key={i}>
                          <Card.Text>
                            {e.functions.length > 0 && e.functions
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  <pre>{line.content}</pre>
                                  <br />
                                </React.Fragment>
                              ))}
                            <Markdown
                              style={{ textAlign: "left" }}
                              options={{ wrapper: "article" }}
                            >
                              {e.response.content}
                            </Markdown>
                            ;
                            {/* {e.response.content
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))} */}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                ) : (
                <>
                  <Col lg={8}>
                    <Card key={`img-8-${i}`} className={"mb-3"}>
                      <Image src={e.response["image"]}></Image>
                      <Card.Footer></Card.Footer>
                    </Card>
                  </Col>
                  <Col lg={4}>
                    <Card key={`img-4-${i}`} className={"mb-3"}>
                      <Card.Body>
                        <Card.Text>
                          <Markdown
                              style={{ textAlign: "left" }}
                              options={{ wrapper: "article" }}
                            >
                            {e.response["image_prompt"]}
                            </Markdown>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer></Card.Footer>
                    </Card>
                  </Col>
                  </>
                )
              )}
              {/* </Card.Body>
              </Card> */}
            </>
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
          text: "Sorry, there appears to be an issue connecting. I am available typically during regular office hours, Monday through Friday, 9am. to 5pm. Pacific Standard Time.",
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
            {/* <Image src={`https://randomuser.me/api/portraits/med/men/${(() => Math.floor(Math.random() * 10))()}.jpg`} roundedCircle /> */}
            {/* <Image src="./IMG_2885(2).JPG" style={{height:"50px"}}></Image>{" "} */}
            {
              "Instant Interview - Ask me job interview questions. I am available typically during regular office hours, Monday through Friday, 9am. to 5pm. Pacific Standard Time."
            }
            <Badge variant={badgeStatus} style={{ float: "right" }}>
              Using ChatGPT
            </Badge>{" "}
          </Card.Header>
          <div>
            <Row>
              <Col lg={7}>
                <h4>Paul Aglipay</h4>
                <div>
                  <p>{message}</p>
                </div>
              </Col>
              <Col lg={5}>
                <div>
                  <Form
                    style={{
                      display: showPromptBox ? "none" : "block",
                      margin: 10,
                    }}
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
                    <Button
                      variant="primary"
                      type="button"
                      onClick={sendTranscript}
                    >
                      sendTranscript
                    </Button>
                  </Form>
                  <Form
                    style={{
                      display: showPromptBox ? "block" : "none",
                      margin: 10,
                    }}
                  >
                    <Form.Group controlId="trascript">
                      <Form.Label>
                        <h6>Question Prompt:</h6>
                      </Form.Label>
                      <Form.Control
                        onFocus={cpTranscriptToPrompt}
                        as="textarea"
                        placeholder="Ask me anything..."
                        rows={6}
                        value={prompt}
                        onChange={(e) => {
                          setPrompt(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={sendPrompt}
                    >
                      Send Prompt
                    </Button>
                    {[
                      "Can you tell me a little about yourself?",
                      "Describe your work history.",
                      "What certifications do you have?",
                      "Tell me about the front-end technologies you are familiar with.",
                      "Tell me about the back-end technologies you are familiar with.",
                      "What are your greatest strengths?",
                      "What are your weaknesses?",
                      "Can you describe a challenge you faced and how you dealt with it?",
                      "Where do you see yourself in five years?",
                      "Why did you leave your last job?",
                      "What can you bring to this company?",
                      "How do you handle stress and pressure?",
                      "What are your salary expecations?",
                      "Do you have any questions for us?",
                      " Tell me about yourself?",
                      " What are your strengths?",
                      " What are your weaknesses?",
                      " Why do you want to work for this company?",
                      " Why should we hire you?",
                      " Can you explain your resume and work history?",
                      " What is your greatest professional achievement?",
                      " Describe a challenge you've faced at work and how you handled it?",
                      " Where do you see yourself in 5 years?",
                      " What is your dream job?",
                      " Why are you leaving your current job?",
                      " What do you know about our company?",
                      " How do you handle stress and pressure?",
                      " How do you stay organized and prioritize tasks?",
                      " What interests you about this role?",
                      " Are you a team player or do you prefer working independently?",
                      " Describe your communication skills?",
                      " Tell me about a time you had to resolve a conflict with a colleague?",
                      " How do you handle constructive criticism?",
                      " What's your approach to problem-solving?",
                      " Describe a time you demonstrated leadership?",
                      " How do you stay updated with industry trends and developments?",
                      " What technical skills do you possess?",
                      " Tell me about a time you had to learn a new technology quickly?",
                      " How do you stay motivated and engaged at work?",
                      " What are your salary expectations?",
                      " Describe your work style?",
                      " How do you handle multitasking?",
                      " How do you handle shifting priorities?",
                      " What is your preferred management style?",
                      " Are you comfortable working in a fast-paced environment?",
                      " How would you explain a complex concept to a non-technical audience?",
                      " Tell me about a time you failed at a task or project and what you learned from it?",
                      " How did you hear about this position?",
                      " Describe a time you had to meet a tight deadline?",
                      " What do you do if you don't know the answer to a problem at work?",
                      " Describe your experience with client or customer interactions?",
                      " What do you do in your free time?",
                      " Explain your approach to setting and achieving goals?",
                      " How do you maintain work-life balance?",
                      " What motivates you?",
                      " Tell me about at time you had a conflict at work and how you resolved it?",
                      " What is your preferred method of feedback and performance evaluation?",
                      " What's the most innovative idea you've implemented at work?",
                      " Tell me about a time you had a disagreement with your supervisor?",
                      " How do you handle difficult conversations with colleagues or clients?",
                      " Give an example of a time when you had to think outside the box?",
                      " What's your approach to mentoring and coaching junior team members?",
                      " Give an example of a time when you had to resolve a customer complaint?",
                      " Do you have any questions for us?",
                      "Explain daily tasks and responsibilities at your current or most recent job.",
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
              </Col>
            </Row>
            <Spinner
              animation="border"
              role="status"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "rotate(720deg)",
                display: showSpinner ? "block" : "none",
              }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
            {/* <h1>
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
            </h1> */}

            {/* <div>
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
            </div> */}
          </div>
          {debug && (
            <div>
              {/* <p>{consolelog}</p> */}
              {commandButtons}
            </div>
          )}
          {/* <div>
            <span>{acceptedCommand}</span>
          </div> */}

          <Card.Footer>
            <h6>UUID: {appUuid}</h6>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default AiChat;
