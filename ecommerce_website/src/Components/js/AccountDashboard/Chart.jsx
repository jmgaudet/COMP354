import React, {useEffect, useState} from 'react';
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import Title from './Title';
import axios from "axios";


export default function Chart(props) {

    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        let url = `http://rocky-shore-99218.herokuapp.com/users/${props.sellerId}/sales/`;
        axios
            .get(url)
            .then(({data}) => {
                if (data.is_success) {
                    setAllItems(data.contents);

                }
            });
    });

    // Generate Sales Data
    function createData(time, amount) {
        return {time, amount};
    }

    function populateData(data) {
        let runningTotal = 0;
        for (let i = 0; i < allItems.length; i++) {
            runningTotal = runningTotal + allItems[i].totalCost;
            let date = allItems[i].created.split('T'); //change to split('.') if you want to time of the sale to display in chart
            data.push(createData(date[0], runningTotal));
        }
    }

    const data = [];
    populateData(data);

    return (
        <React.Fragment>
            <Title> Product Sales </Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time"/>
                    <YAxis>
                        <Label angle={270} position="left" style={{textAnchor: 'middle'}}>
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}