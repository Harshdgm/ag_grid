import { Link } from "react-router-dom";
import "./styles.css";

export default function Header() {
  return (
    <header className ="header">
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="/virtualization" className="link">Virtualization</Link>
        <Link to="/aggrid-pagination" className="link">AgGridFirst</Link>
        <Link to="/aggrid-table" className="link">AgGridSecond</Link>
        <Link to="/aggregation" className="link">Aggregation</Link>
      </nav>
    </header>
  );
}


