import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
var h2p = require("html2plaintext");

const MyEditor = ({ handlePostContent, postContent, generatedText }) => {
  const editor = useRef(null);
  console.log("posContent Type: ", typeof postContent);

  const [value, setValue] = useState("");
  console.log(value);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    height: "650",
    removeButtons: ["source"],
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
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => handlePostContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          // console.log(newContent.replace("/<[^>]+>/g", ""));
          console.log(h2p(newContent));
        }}
      />
    </div>
  );
};
export default MyEditor;
