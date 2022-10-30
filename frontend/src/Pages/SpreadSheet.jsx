import Spreadsheet from "react-spreadsheet";
import { useState } from "react";
const SpreadSheet=()=>{
    const [data, setData] = useState([
        [{ value: "Vanilla" }, { value: "Chocolate" }],
        [{ value: "Strawberry" }, { value: "Cookies" }],
      ]);
    return(
        <div>
            <Spreadsheet data={data} onChange={setData}/>
        </div>
    )
}
export default SpreadSheet