
import { useCallback, useState } from "react";
import EmptyTable from "../components/EmptyTable";
import RowInput from "../components/Row";

function DataTable() {
    const [rowsData, setRowsData] = useState([]);
    const [result, setResult] = useState(0);

    const addNewRow = useCallback(() => {
        const rowsInput = {
            inputValue: '',
            calculationType: 'add',
            enabled: true
        }
        setRowsData([...rowsData, rowsInput]);
    });

    const deleteRow = useCallback((index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        calculationResult(rows);
    });


    const toggleRowState = useCallback((state, index) => {
        const rows = [...rowsData];
        rows[index].enabled = state;
        calculationResult(rows);
    });

    const changeCalculationType = (ev, index) => {
        const rowsInput = [...rowsData];
        rowsInput[index].calculationType = ev.target.value;
        calculationResult(rowsData);

    }

    const handleChange = useCallback((ev, index) => {
        const { value } = ev.target;
        const rowsInput = [...rowsData];
        rowsInput[index].inputValue = value;
        calculationResult(rowsInput);

    });

    const calculationResult = useCallback((rows) => {
        let result = 0;
        rows.map((item) => {
            if (item.enabled) {
                result = item.calculationType === 'add' ? result + Number(item.inputValue) : result - Number(item.inputValue);
            }
        })
        setRowsData(rows);
        setResult(result);
    }, [result]);


    return (
        <div className="container">
            <button onClick={addNewRow} className="add btn">Add New Row</button>
            {rowsData.length > 0 ? <>
                <div className="row">
                    {rowsData?.map((element, index) => (
                        <RowInput key={index} rowData={element} handleChange={handleChange} index={index} deleteRow={deleteRow} toggleRowState={toggleRowState} changeCalculationType={changeCalculationType} />
                    ))}
                </div>
                <p className="result-text">The Result is : {result}</p>
            </> : <EmptyTable />}
        </div>

    );
}



export default DataTable;