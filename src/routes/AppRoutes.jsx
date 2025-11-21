import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/index.jsx";
import Virtualization from "../pages/Virtualization/index.jsx";
import AgGridFirst from "../pages/AgGridFirst/index.jsx";
import AgGridSecond from "../pages/AgGridSecond/index.jsx";
import Aggregation from "../pages/Aggregation/index.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/virtualization" element={<Virtualization />}/>
      <Route path="/aggrid-pagination" element={<AgGridFirst />}/>
      <Route path="/aggrid-table" element={<AgGridSecond />}/>
      <Route path="/aggregation" element={<Aggregation />}/>
    </Routes>
  );
}
