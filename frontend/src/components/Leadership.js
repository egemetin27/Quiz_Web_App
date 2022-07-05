import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
//import React, { Component } from 'react';  
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import { Link } from "react-router-dom";
import '../index.css';

function Leadership() {
    var [leaders, setLeaders] = useState([]);

    console.log(leaders);
    useEffect(function () {
        const getTable = async function () {
            const res = await fetch("http://localhost:3001/users/leadership");
            const dat = await res.json();
            console.log(dat);
            dat.forEach(ranking => {
                setLeaders(oldArray => [...oldArray, ranking]);
            });

        }
        getTable();
    }, []);

    return (
        <div className="leadership">
            <table>
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {leaders.map((val, key) =>
                        <tr key={key}>
                            <td>{val.username}</td>
                            <td>{val.score}</td>
                            <td>{val.date}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Leadership;