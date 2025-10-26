import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full justify-between items-center p-5">
      <div className="">
          Token
        </div>
        <ul className="flex flex-row space-x-5">
          <li onClick={() => navigate("/favorite")}>FAVORITE</li>
          <li onClick={() => navigate("/home")}>HOME</li>
          <li onClick={() => navigate("/chat")}>CHAT</li>
        </ul>
    </div>
  );
}
