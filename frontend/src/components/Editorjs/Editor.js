import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const MyEditor = ({ content, setContent }) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    height: "650",

    toolbarAdaptive: false,
    toolbarInline: true,
    enableDragAndDropFileToEditor: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    spellCheck: true,
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
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          console.log(newContent);
        }}
      />
    </div>
  );
};
export default MyEditor;
