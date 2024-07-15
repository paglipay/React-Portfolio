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

import { Form, Table, Badge, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import FileUpload from '../FileUpload/FileUpload';

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
  const [dataSlice, setDataSlice] = useState(0);
  const [uuid, setUuid] = useState(0); // for file upload

  const [down_aps, setDownAps] = useState(down_aps_dic);

  useEffect(() => {
    console.log("fetching data");
      axios
        .get("https://automate.paglipay.info/show/1")
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
        .get("https://automate.paglipay.info/show/1")
        .then((res) => {
          console.log(res.data);
          setData(res.data["./dist/Desktop/ArubaParseObj_deref_multi.json"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 60000);
  }, []);

  useEffect(() => {
    console.log(data);
    let ap_dict = {};
    const statuses = ["down_minus", "down_plus", "up_minus", "up_plus"];
    const dataNew = dataSlice ? data.slice(parseInt(dataSlice), data.length) : data;
    console.log('dataNew', dataNew);
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
        <a href={`https://automate.paglipay.info/download?file=Desktop/ap_association/json/final.xlsx`} download>Download</a>
          <h2> UP / Down AP Count</h2>
          <h3> Down AP Count Offset {ap_count_down}</h3>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control as="select" custom onChange={(e) => setApCountDown(parseInt(e.target.value))}>
                {[...Array(10).keys()].map((i) => (<option>{i}</option>))}
              </Form.Control>
            </Form.Group>
          </Form>
          <h3> Up AP Count Offset {ap_count_down}</h3>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control as="select" custom onChange={(e) => setApCountUp(parseInt(e.target.value))}>
                {[...Array(10).keys()].map((i) => (<option>{i}</option>))}
              </Form.Control>
            </Form.Group>
          </Form>
          <h3> History Offset {dataSlice}</h3>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control as="select" custom onChange={(e) => setDataSlice(e.target.value)}>
                {data.map((i, idx) => (<option value={idx}>{idx} - {i.timestamp}</option>))}
              </Form.Control>
            </Form.Group>
          </Form>
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
        </Col>
      </Row>
    </Container>
  );
}

export default ChartComponent;
