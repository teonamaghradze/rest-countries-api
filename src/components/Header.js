import "./Header.styles.css";
import { Outlet } from "react-router-dom";

const Header = ({ src, mode, handleModeClick, className }) => {
  return (
    <div className={className}>
      <div className="header-container">
        <h1 className="question">Where in the world?</h1>

        <div className="icon-mode-container">
          <img
            onClick={handleModeClick}
            className="mode-logo"
            src={src}
            alt="mode-icon"
          />
          <span className={`${className} mode`}>{mode}</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
