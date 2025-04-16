import { useState } from "react";

const AdBanner = () => {
  const handleClick = () => {
    // Inject ad script on click, even if the image stays visible
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key' : '329e4e16be857e74719c7bd77be59ed9',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "//trashycontinuousbubbly.com/329e4e16be857e74719c7bd77be59ed9/invoke.js";
    document.body.appendChild(script2);
  };

  return (
    <div style={{ width: "100%", maxWidth: 720, margin: "0", textAlign: "left" }}>
      {/* Keep the image visible even after the click */}
      <a
        href="https://1win.com" // Replace with actual 1win ad URL
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <img
          src="/banner.png" // Put this image inside your /public folder
          alt="Super Bonus Ad"
          style={{ width: "100%", cursor: "pointer" }}
        />
      </a>
    </div>
  );
};

export default AdBanner;

