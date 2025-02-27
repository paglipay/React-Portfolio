import React, { useEffect, useState } from "react";
import { down_aps_dic } from "./down_aps";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Form,
  Table,
  Badge,
  Container,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import FileUpload from "../FileUpload/FileUpload";
import { v4 as uuidv4 } from "uuid";

function ChartComponent() {
  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];
  const [ap_count_down, setApCountDown] = useState(0);
  const [ap_count_up, setApCountUp] = useState(0);
  const [ap_dict, setApDict] = useState({});
  const [data, setData] = useState([]);
  const [output, setOutput] = useState([]);
  const [dataSlice, setDataSlice] = useState(0);
  const [uuid, setUuid] = useState(uuidv4()); // for file upload

  const [down_aps, setDownAps] = useState(down_aps_dic);
  const [passcodes, setPasscodes] = useState({ passcode: "", passcode2: "" });
  const [ipTxt, setIptxt] = useState("");
  const devices = `mc00f1.anderson.ucla.net
wc00f1.anderson.ucla.net
wc11f1.anderson.ucla.net
wc14f1.anderson.ucla.net
wc15f1.anderson.ucla.net
wc16f1.anderson.ucla.net
wc00f2.carnesalecommons.ucla.net
wc01f2.covel.ucla.net
wc02f2.covel.ucla.net
wc11f2.covel.ucla.net
wc12f2.covel.ucla.net
wc13f2.covel.ucla.net
wc14f2.covel.ucla.net
mc00f2.csb1.ucla.net
wc00f2.csb1.ucla.net
wc11f2.csb1.ucla.net
wc14f2.csb1.ucla.net
wc15f2.csb1.ucla.net
wc16f2.csb1.ucla.net
wc00f2.deneve-holly.ucla.net
wc11f2.deneve-holly.ucla.net
wc12f2.deneve-holly.ucla.net
wc00f2n.luskin.ucla.net
wc00f2s.luskin.ucla.net
wc12f2n.luskin.ucla.net
wc12f2s.luskin.ucla.net
wc11f1.rieber.ucla.net
wc12f1.rieber.ucla.net
wc00fp2.weyburn-olive.ucla.net
wc01fp2.weyburn-olive.ucla.net`;
  const [ipList, setIpList] = useState(devices.split("\n"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("fetching data");
    axios
      .post("https://automate.paglipay.info/start/1", {
        jobs: [
          {
            import: "Key",
          },
          {
            True: [
              {
                import: "FileObj",
              },
              [
                {
                  delete: "./dist/Desktop/ArubaParseObj_deref_multi.json",
                },
                {
                  open: "./dist/Desktop/ArubaParseObj_deref_multi.json",
                },
              ],
            ],
          },
        ],
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data["./dist/Desktop/ArubaParseObj_deref_multi.json"]);
      })
      .catch((err) => {
        console.log(err);
      });

    setInterval(() => {
      console.log("fetching data");

      axios
        .post("https://automate.paglipay.info/start/2", {
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
                    ip: "https://192.168.0.12:5004/show/1",
                    jobs: [
                      {
                        import: "Key",
                      },
                    ],
                  },
                },
                {
                  True: "end",
                },
              ],
            },
          ],
        })
        .then((res) => {
          console.log(res.data);
          if ("ParamikoObj" in res.data) {
            setOutput(res.data["ParamikoObj"]);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("https://automate.paglipay.info/show/1")
        .then((res) => {
          console.log(res.data);
          setData(res.data["./dist/Desktop/ArubaParseObj_deref_multi.json"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 6000);
  }, []);

  useEffect(() => {
    console.log(data);
    let ap_dict = {};
    const statuses = ["down_minus", "down_plus", "up_minus", "up_plus"];
    const dataNew = dataSlice
      ? data.slice(parseInt(dataSlice), data.length)
      : data;
    console.log("dataNew", dataNew);
    for (let i = 0; i < dataNew.length; i++) {
      statuses.forEach((status) => {
        dataNew[i][`ap_${status}`].forEach((ap) => {
          if (ap_dict[ap]) {
            ap_dict[ap].push({ status, timestamp: dataNew[i]["timestamp"] });
          } else {
            ap_dict[ap] = [{ status, timestamp: dataNew[i]["timestamp"] }];
          }
        });
      });
    }
    // filter out keys that are not in down_aps
    Object.keys(ap_dict).forEach((key) => {
      if (down_aps[key]) {
        delete ap_dict[key];
      }
    });
    setApDict(ap_dict);
  }, [data]);

  const get_down_aps = () => {
    axios
      .post("https://automate.paglipay.info/start/2", {
        jobs: [{ import: "Key" }, "HI"],
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data["./dist/Desktop/ArubaParseObj_deref_multi.json"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fluid>
      <h1> Campus AP Counts</h1>
      <Row>
        <Col>
          <FileUpload uuid={uuid} />
          <h3>Ap Associations Download</h3>
          {/* href to download the file */}
          <a
            href={`https://automate.paglipay.info/download?file=Desktop/ap_association/json/final.xlsx`}
            download
          >
            Download
          </a>
          <h3>Ap Inventory Download</h3>
          {/* href to download the file */}
          <a
            href={`https://automate.paglipay.info/download?file=Desktop/ap_inventory/json/final.xlsx`}
            download
          >
            Download
          </a>
          <h3>Users Download</h3>
          {/* href to download the file */}
          <a
            href={`https://automate.paglipay.info/download?file=Desktop/ap_user_table/json/final.xlsx`}
            download
          >
            Download
          </a>
          <h3>VBA Download</h3>
          {/* href to download the file */}
          <a
            href={`https://automate.paglipay.info/download?file=uploads/d2021a33-db70-453e-be4c-0cd945f5c50b/final_20240710-2.xlsm`}
            download
          >
            Download
          </a>
        </Col>
        <Col>
          <h4>Controller List</h4>
          <div style={{ height: "500px", overflow: "auto" }}>
            {ipList.map((ip) => (
              <>
                <br />
                <a
                  href={`https://automate.paglipay.info/download?file=Desktop/ap_inventory/${ip}.txt`}
                >
                  {ip}
                </a>
              </>
            ))}
          </div>
        </Col>
        <Col>
          <h4>Run Report</h4>
          Form to run the report
          <Form>
            {/* textarea for list of controllers */}
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>IP List</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter IP List"
                onChange={(e) => setIptxt(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>PASSCODE</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter passcode"
                onChange={(e) =>
                  setPasscodes({ ...passcodes, passcode: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>PASSCODE2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter second passcode"
                onChange={(e) =>
                  setPasscodes({ ...passcodes, passcode2: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => setUuid(e.target.value)}
              >
                <option value="0">Select a report</option>
                <option value="1">AP Associations</option>
                <option value="2">AP Counts</option>
                <option value="3">AP Associations and Counts</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setShow(true);
                axios
                  .post("https://automate.paglipay.info/start/" + uuid, {
                    jobs: [
                      { import: "Key" },
                      {
                        True: [
                          {
                            import: "RequestsObj",
                          },
                          {
                            open: {
                              ip: "http://192.168.0.12:5004/start/1",
                              PASSCODE: [
                                passcodes["passcode"],
                                passcodes["passcode2"],
                              ],
                              "json/paramiko/ap_inventory/ip.txt":
                                ipTxt != "" ? ipTxt : "wc00f2s.luskin.ucla.net",
                              jobs: [
                                {
                                  import: "Key",
                                },
                                {
                                  True: [
                                    {
                                      True: "./my_packages/FileObj/FileObjTest_open_save_as.json",
                                    },
                                    {
                                      True: "./json/paramiko/ap_inventory/_create_list.json",
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                          {
                            True: "end",
                          },
                        ],
                      },
                    ],
                  })
                  .then((res) => {
                    console.log(res.data);
                    setData(
                      res.data["./dist/Desktop/ArubaParseObj_deref_multi.json"]
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Submit
            </Button>

            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
          </Form>
        </Col>
        <Col>
          <h2> UP / Down AP Count</h2>
          <h3> Down AP Count Offset {ap_count_down}</h3>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => setApCountDown(parseInt(e.target.value))}
              >
                {[...Array(10).keys()].map((i) => (
                  <option>{i}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <h3> Up AP Count Offset {ap_count_down}</h3>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => setApCountUp(parseInt(e.target.value))}
              >
                {[...Array(10).keys()].map((i) => (
                  <option>{i}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <h3> History Offset {dataSlice}</h3>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => setDataSlice(e.target.value)}
              >
                {data.map((i, idx) => (
                  <option value={idx}>
                    {idx} - {i.timestamp}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <ResponsiveContainer width="100%" 
          // height="100%"
          > */}
          <LineChart
            width={1600}
            height={600}
            data={data.slice(dataSlice, data.length).map((item) => ({
              ...item,
              ap_count_down: (item.ap_count_down - 1526 + ap_count_down) * -1,
              ap_count_up: item.ap_count_up - 10184 + ap_count_up,
            }))}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ap_count_down"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="ap_count_up" stroke="#82ca9d" />

            {/* <Area
                type="monotone"
                dataKey="ap_count_up"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="ap_count_down"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area type="monotone" dataKey="c" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
          </LineChart>
          {/* </ResponsiveContainer> */}
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>x</th>
            <th>Status</th>
            <th>AP ID</th>
            <th>Logs</th>
          </tr>
        </thead>
        <tbody>
          {
            // ap_dict is a dictionary with key as AP name and value as the type of change (up/down, plus/minus)
            Object.keys(ap_dict).map((key) => {
              return (
                <tr>
                  <td>x</td>
                  <td>
                    <Badge
                      variant={
                        ap_dict[key][ap_dict[key].length - 1].status ===
                        "up_plus"
                          ? "success"
                          : "danger"
                      }
                    >
                      {ap_dict[key][ap_dict[key].length - 1].status}
                    </Badge>
                  </td>
                  <td>{key}</td>
                  <td>
                    <pre>
                      {ap_dict[key].map((i) => (
                        <>{`\n(${i.timestamp}) - ${i.status}`}</>
                      ))}
                    </pre>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      <Row>
        <Col>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={800}
              height={600}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Line
                type="monotone"
                dataKey="ap_count_down"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="ap_count_up" stroke="#82ca9d" /> */}

              <Area
                type="monotone"
                dataKey="ap_count_up"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="ap_count_down"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              {/* <Area type="monotone" dataKey="c" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
            </AreaChart>
          </ResponsiveContainer>
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>AP Count Down</th>
                <th>AP Count Up</th>
              </tr>
            </thead>
            <tbody>
              {data
                .slice()
                .reverse()
                .map((item) => (
                  <tr>
                    <td>{item.timestamp}</td>
                    <td>{item.ap_count_down}</td>
                    <td>{item.ap_count_up}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Activity Output</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Output:
              <pre style={{ height: "500px", overflow: "auto" }}>
                {
                  /* map output array and split each \r\n and join with <br/> */
                  output.map((line) => line.split("\r\n").join("\n"))
                }
              </pre>
              {/* <pre>{JSON.stringify(output, null, 2)}</pre> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default ChartComponent;
