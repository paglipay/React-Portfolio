import React from "react";
import { Table } from 'react-bootstrap'

export default function JsonToTable() {
    const students = [
        ["Name", "Subject", "Marks"],
        ["ABC", "Arts", 80],
        ["XYZ", "Science", "70"],
    ];
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        {students[0].map((item, index) => {
                            return <th>{item}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {students.slice(1, students.length).map((item, index) => {
                        return (
                            <tr>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}