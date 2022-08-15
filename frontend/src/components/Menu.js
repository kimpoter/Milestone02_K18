export function MenuModal({ menuImageUrl, closeModal }) {
  return (
    <div
      onClick={closeModal}
      className="z-[12] bg-black bg-opacity-40 h-screen fixed top-0 left-0 w-screen"
    >
      <div className="flex justify-center items-center h-full">
        <img
          onClick={(e) => e.stopPropagation()}
          src={menuImageUrl}
          className="max-h-screen min-h-[90vh]"
        />
      </div>
    </div>
  );
}

export function MenuContainer({ menuImageUrl }) {
  return <img src={menuImageUrl} className="h-[300px]" />;
}
