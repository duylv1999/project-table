import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import { Button, Form, Input, Popconfirm, Select, Table, Tag } from "antd";
import { columnsData } from "./columns";
import { dataSource } from "./dataSource";
import { MdOutlineClear } from "react-icons/md";

const menu = [
    {
        label: "Ca 1",
        value: 1,
    },
    {
        label: "Ca 2",
        value: 2,
    },
    {
        label: "Ca 3",
        value: 3,
    },
];

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, handleSelect, ...restProps }) => {
    const [editing, setEditing] = useState(false);

    const toggleEdit = () => {
        setEditing(!editing);
    };

    const save = async () => {
        try {
            toggleEdit();
            // handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    const handleSelected = (value) => {
        try {
            handleSelect(value, record, dataIndex);
        } catch (error) {}
    };

    let childNode = editable ? (
        <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            options={menu}
            value={record[dataIndex] ? record[dataIndex].map((ele) => ele.id) : []}
            optionLabelProp="label"
            optionFilterProp="label"
            onBlur={save}
            // onDeselect={handleDeselect}
            maxTagCount={"responsive"}
            // tagRender={tagRenderShifts}
            onSelect={handleSelected}
            removeIcon={true}
        />
    ) : (
        children
    );

    return <td {...restProps}>{childNode}</td>;
};

const App = () => {
    console.log(columnsData);
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        // setDataSource(newData);
    };

    const components = {
        body: {
            // row: EditableRow,
            cell: EditableCell,
        },
    };

    const handleSelect = (value, record, dataIndex) => {
        const newData = [...dataSource];
    };

    const columns = columnsData.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
                handleSelect,
            }),
        };
    });

    return (
        <div>
            <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: "max-content", y: 240 }}
            />
        </div>
    );
};

export default App;
