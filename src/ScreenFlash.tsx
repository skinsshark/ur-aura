const ScreenFlash = ({ flash }: { flash: boolean }) => {
  return flash ? <div className="screen-flash" /> : null;
};

export default ScreenFlash;
