import * as React from "react";
import Sun from "./icons/Sun";
import Moon from "./icons/Moon";
import "./HeroDecor.css";

const HeroDecor: React.FC = React.memo(() => {
  return (
    <div className="heroDecor" aria-hidden="true">
      {/* Render both to avoid hydration flicker; CSS decides visibility */}
      <Sun className="heroDecor__svg sun" />
      <Moon className="heroDecor__svg moon" />
    </div>
  );
});

HeroDecor.displayName = 'HeroDecor';

export default HeroDecor;
