import { useNavigate } from "react-router-dom";
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="header">
        <div className="logo">
          Token
        </div>
        <ul className="menu">
          <li onClick={() => navigate("/favorite")}>FAVORITE</li>
          <li onClick={() => navigate("/home")}>HOME</li>
          <li onClick={() => navigate("/chat")}>CHAT</li>
        </ul>

      </div>
    </div>
  );
}
