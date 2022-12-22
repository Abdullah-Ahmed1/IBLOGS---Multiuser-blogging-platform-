import React, { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2";
var h2p = require("html2plaintext");

const MyEditor = ({
  handlePostContent,
  postContent,
  generatedText,
  nextWord,
  left,
  right,
  handleSetScrap,
  scrap,
}) => {
  const editor = useRef(null);
  const [temp, setTemp] = useState("");
  const [scrapData, setScrapData] = useState(null);
  console.log("posContent Type: ", typeof postContent);

  const [value, setValue] = useState("");
  console.log(value);
  var a = "";
  console.log("a", a);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    height: "650",
    removeButtons: ["source"],
    autofocus: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    // toolbarAdaptive: false,
    //stoolbarInline: true,
    // enableDragAndDropFileToEditor: true,
    showCharsCounter: false,
    showWordsCounter: false,
    //showXPathInStatusbar: false,
    spellCheck: true,
    enter: "BR",
    // height: 1000,
    // maxHeight: 1000,
    // preset: "inline",
    // placeholder: "Start writing..............................",
    // showPlaceholder: true,
  };

  useEffect(() => {
    console.log("scraper----");
    if (h2p(postContent) !== "" && left !== 7) {
      const d = h2p(postContent).split(".");
      console.log("--**--*-->", d);
      axios
        .get(`http://localhost:5000/readerDashboard/scrap/${d[0]}`)
        .then((res) => {
          console.log(res.data);
          setScrapData(res.data);
          handleSetScrap();
        });
    }
  }, [postContent]);
  return (
    <div style={{ height: "100vh", padding: "0px 10px" }}>
      <Grid2 container direction={"row"}>
        <Grid2 lg={left}>
          <JoditEditor
            ref={editor}
            value={postContent}
            config={config}
            // onKeyDown={(e) => (e.keyCode == 32 ? console.log("key pressed") : null)}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => handlePostContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              // console.log("66788", newContent);
              // console.log(newContent.replace("/<[^>]+>/g", ""));
              window.onkeydown = (event) => {
                if (event.keyCode == 32) {
                  console.log("**--**", newContent);
                  nextWord(newContent);
                }
              };
              // console.log(h2p(newContent));

              // a = newContent;
            }}
          />
        </Grid2>
        <Grid2
          sx={
            left === 12
              ? { display: "none" }
              : {
                  display: "flex",
                  padding: "15px",
                  height: "550px",
                  overflow: "auto",
                }
          }
          lg={right}
          container
          direction={"column"}
        >
          <div>
            {scrapData ? (
              scrapData.map((item) => {
                return <p style={{ width: "100%" }}>{item}</p>;
              })
            ) : (
              <h4>Nothing to Show</h4>
            )}
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};
export default MyEditor;
