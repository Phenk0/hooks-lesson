import { useState } from "react";
import BtnToggle from "./BtnToggle";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const openHandler = () => setIsOpen((open) => !open);
  return (
    <div className="box">
      <BtnToggle isOpen={isOpen} onOpen={openHandler} />
      {isOpen && children}
    </div>
  );
};

export default Box;
