import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {PlanItems} from "./models/PlanItems";
import {servicesAPI} from "./services/api";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
function App() {

    const [planItems, setPlanItems] = useState<PlanItems[]>([])
    useEffect(()=>{
        servicesAPI.plannerItemsAPI.findAllForecastPlanerItems().then((value)=>setPlanItems(value))
    },[])

  return (
    <div >
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Дата отправки</TableCell>
                        <TableCell align="right">Прогноз на период </TableCell>
                        <TableCell align="right">Операций</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {planItems.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.dateOfSend}</TableCell>
                            <TableCell align="right">{row.forecastStart}-{row.forecastEnd} </TableCell>
                            <TableCell align="right">Удалить</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}

export default App;
