import { useEffect, useRef } from "react";

const AdBanner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Inject banner ad config
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.innerHTML = `
      atOptions = {
        'key' : '329e4e16be857e74719c7bd77be59ed9',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    const bannerScript = document.createElement("script");
    bannerScript.type = "text/javascript";
    bannerScript.src = "//trashycontinuousbubbly.com/329e4e16be857e74719c7bd77be59ed9/invoke.js";
    bannerScript.async = true;

    if (bannerRef.current) {
      bannerRef.current.innerHTML = "";
      bannerRef.current.appendChild(configScript);
      bannerRef.current.appendChild(bannerScript);
    }

    // Inject popup ad script
    const popupScript = document.createElement("script");
    popupScript.type = "text/javascript";
    popupScript.src = "//trashycontinuousbubbly.com/33/15/ed/3315edce9b2d181ee4fb1da4836791ce.js";
    popupScript.async = true;

    document.body.appendChild(popupScript);
  }, []);

  return (
    <div
      ref={bannerRef}
      style={{
        width: "100%",
        maxWidth: "728px",
        height: "90px",
        margin: "0",
        textAlign: "left"
      }}
    />
  );
};

export default AdBanner;
