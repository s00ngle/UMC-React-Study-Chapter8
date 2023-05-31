import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const year = 2023;
const pageNo = 1;
const numOfRows = 1000;
const serviceKey = process.env.REACT_APP_API_KEY;

const filterName = "대전";

const URL = `https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?year=${year}&pageNo=${pageNo}&numOfRows=${numOfRows}&returnType=json&serviceKey=${serviceKey}`;

function App() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            await axios
                .get(URL)
                .then((res) => {
                    setData(res.data.response.body.items);
                    setData(
                        filterName === ""
                            ? res.data.response.body.items
                            : res.data.response.body.items.filter(
                                  (item) => item.districtName === filterName
                              )
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("key: ", serviceKey);
        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>API Test</h1>
            {/* show all items in datas */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {data.map((item, index) => (
                    <div className="item" key={index} style={{ width: "15%" }}>
                        <div className="districtName">
                            지역 : {item.districtName}
                        </div>
                        <hr />
                        <div>경보단계 : {item.issueGbn}</div>
                        <div>발령일 : {item.issueDate}</div>
                        <div>해제일 : {item.clearDate}</div>
                        <div>해제농도 : {item.clearVal}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
