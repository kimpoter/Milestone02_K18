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
          alt="menu"
          className="max-h-screen min-h-[90vh]"
        />
      </div>
    </div>
  );
}

export function MenuContainer({ menuImageUrl, handleOpenModal }) {
  return (
    <div className="flex flex-row space-x-2">
      {menuImageUrl.map((image) => {
        return (
          <button
            key={image.id}
            onClick={() =>
              handleOpenModal({
                url: image.imageUrl,
              })
            }
          >
            <img src={image.imageUrl} className="h-[200px]" alt="menu" />
          </button>
        );
      })}
    </div>
  );
}
