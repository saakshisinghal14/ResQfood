import FrameComponent5 from "./FrameComponent5";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent2 from "./FrameComponent2";
import FrameComponent1 from "./FrameComponent1";
import FrameComponent from "./FrameComponent";
import "./SeaTurtlesWebDesign.css";

const SeaTurtlesWebDesign = () => {
  return (
    <div className="sea-turtles-web-design">
      <FrameComponent5 />
      <b className="b">02</b>
      <b className="b1">01</b>
      <div className="frame-parent">
        <img className="frame-icon" alt="" />
        <div className="lines-parent">
          <img className="lines-icon" alt="" src="/lines.svg" />
          <div className="privacy-policy-link">
            <img
              className="gettyimages-535555239-612x6121-icon"
              alt=""
              src="/gettyimages535555239612x6121@2x.png"
            />
          </div>
          <div className="food-waste-organisation">
            <img
              className="gettyimages-472165353-612x612-icon"
              loading="lazy"
              alt=""
              src="/gettyimages472165353612x612-1@2x.png"
            />
          </div>
        </div>
      </div>
      <FrameComponent4 />
      <div className="frame-group">
        <FrameComponent3 />
        <FrameComponent2 />
      </div>
      <div className="back-to-top-button">
        <div className="search-icon">
          <img
            className="removebg-preview-1-icon"
            loading="lazy"
            alt=""
            src="/8128647removebgpreview-1@2x.png"
          />
          <div className="home-icon">
            <img
              className="grapes-removebg-preview-2-icon"
              alt=""
              src="/grapesremovebgpreview-2@2x.png"
            />
          </div>
          <img
            className="apple-removebg-preview-1-icon"
            loading="lazy"
            alt=""
            src="/appleremovebgpreview-1@2x.png"
          />
        </div>
      </div>
      <FrameComponent1 />
      <FrameComponent />
    </div>
  );
};

export default SeaTurtlesWebDesign;
