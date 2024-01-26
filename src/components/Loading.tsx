export const Loading: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
  return (
    <div
      className="grid place-items-center my-10"
      style={{ ...(fullScreen && { height: "calc(100vh - 40px)" }) }}
    >
      <img
        src="/logo.png"
        alt="logo"
        width="40px"
        height="40px"
        className="spin"
      />
    </div>
  );
};
