import React, { useEffect, useState } from "react";
import { down_aps_dic } from "./down_aps";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Table, Badge, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

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

  const [ap_dict, setApDict] = useState({});
  const [data, setData] = useState([
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:41:41",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:42:25",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:43:07",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:44:25",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:45:41",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:46:57",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:47:37",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:48:18",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:50:35",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:51:27",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:52:08",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:52:48",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:53:28",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:54:29",
    },
    {
      ap_count_down: 1525,
      ap_count_up: 10196,
      ap_down_minus: [],
      ap_down_plus: [],
      ap_up_minus: [],
      ap_up_plus: [],
      timestamp: "2024-06-18 09:55:31",
    },
  ]);

  const [down_aps, setDownAps] = useState(down_aps_dic);

  useEffect(() => {
    setInterval(() => {
      console.log("fetching data");
      axios
        .get("http://192.168.2.213:5000/show/1")
        .then((res) => {
          console.log(res.data);
          setData(res.data["ArubaParseObj"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  }, []);

  useEffect(() => {
    console.log(data);
    let ap_dict = {};
    const statuses = ["down_minus", "down_plus", "up_minus", "up_plus"];
    for (let i = 0; i < data.length; i++) {
      statuses.forEach((status) => {
        data[i][`ap_${status}`].forEach((ap) => {
          if (ap_dict[ap]) {
            ap_dict[ap].push({ status, timestamp: data[i]["timestamp"] });
          } else {
            ap_dict[ap] = [{ status, timestamp: data[i]["timestamp"] }];
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
      .post("http://192.168.2.213:5000/start/2", {
        jobs: [{ import: "Key" }, "HI"],
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data["ArubaParseObj"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h1> Campus AP Counts</h1>
      <Row>
          <Col>
            <LineChart
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
              <Line
                type="monotone"
                dataKey="ap_count_down"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="ap_count_up" stroke="#82ca9d" />
            </LineChart>
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
                {data.map((item) => (
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>AP ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            // ap_dict is a dictionary with key as AP name and value as the type of change (up/down, plus/minus)
            Object.keys(ap_dict).map((key) => {
              return (
                <tr>
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
                    </Badge>{" "}
                    {key}
                  </td>
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
    </Container>
  );
}

export default ChartComponent;
