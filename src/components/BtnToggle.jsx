const BtnToggle = ({ isOpen, onOpen }) => {
  return (
    <button className="btn-toggle" onClick={onOpen}>
      {isOpen ? "–" : "+"}
    </button>
  );
};

export default BtnToggle;
