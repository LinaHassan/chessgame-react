import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const History = () => {
  const historySate = useSelector((state) => state.boardHistory);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (historySate === "") return;
    setHistory((prevHistory) => [...prevHistory, historySate]);
  }, [historySate]);

  return (
    <div className="board_history">
      {history &&
        history.map((step) => (
          <div className="step" key={nanoid()}>
            <p>{step}</p>
          </div>
        ))}
    </div>
  );
};
export default History;
