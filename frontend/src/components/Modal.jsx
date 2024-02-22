const Modal = ({ isOpened, onClose, children }) => {
  if (!isOpened) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[600px]">
          <div className="bg-white p-2 rounded">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
