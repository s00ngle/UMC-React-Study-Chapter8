import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const pageNo = 1;
const numOfRows = 1000;
const serviceKey = process.env.REACT_APP_API_KEY;

function App() {
    const [data, setData] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [year, setYear] = useState(2023);

    const URL = `https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?year=${year}&pageNo=${pageNo}&numOfRows=${numOfRows}&returnType=json&serviceKey=${serviceKey}`;

    const fetchData = async () => {
        try {
            await axios
                .get(URL)
                .then((res) => {
                    setData(res.data.response.body.items);
                    setFilteredData(res.data.response.body.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [year]);

    const setFilter = (e) => {
        setFilterName(e.target.value);
        const filtered = data.filter((item) => {
            return item.districtName.includes(e.target.value);
        });
        setFilteredData(filtered);
    };

    return (
        <div className="App">
            <h1>API Test</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    value={filterName}
                    onChange={(e) => {
                        setFilter(e);
                    }}
                    placeholder="Enter filter name"
                />
                <input
                    type="text"
                    value={year}
                    onChange={(e) => {
                        setYear(e.target.value);
                    }}
                    placeholder="Enter year"
                />
            </div>

            {year >= 2018 && (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {filteredData.map((item, index) => (
                        <div
                            className="item"
                            key={index}
                            style={{ width: "15%" }}
                        >
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
            )}
        </div>
    );
}

export default App;
