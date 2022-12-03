import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import axios from "axios";
var h2p = require("html2plaintext");

const MyEditor = ({
  handlePostContent,
  postContent,
  generatedText,
  nextWord,
}) => {
  const editor = useRef(null);
  const [temp, setTemp] = useState("");
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

  return (
    <div style={{ height: "100vh" }}>
      <JoditEditor
        ref={editor}
        value={postContent}
        config={config}
        // onKeyDown={(e) => (e.keyCode == 32 ? console.log("key pressed") : null)}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => handlePostContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          // console.log(newContent.replace("/<[^>]+>/g", ""));
          window.onkeydown = (event) => {
            if (event.keyCode == 32) {
              console.log("**--**", newContent);
              nextWord(newContent);
            }
          };
          // console.log(h2p(newContent));
          console.log(h2p(newContent).split(". "));
          // a = newContent;
        }}
      />
    </div>
  );
};
export default MyEditor;
