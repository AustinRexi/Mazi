import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./editor.css";

const editorConfiguration = {
  toolbar: {
    items: ["bold", "italic", "underline", "indent"],
    viewportTopOffset: 30,
    shouldNotGroupWhenFull: true,
  },
};

function Editor({ data, style }) {
  if (!data) return null;
  const items = Array.isArray(data) ? data : [data];
  return (
    <div className="editor-container">
      {items.map((section, index) => (
        <div className="editor-section" key={index} style={{ ...style }}>
          <h3>{section.title}:</h3>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={section.data}
          />
        </div>
      ))}
    </div>
  );
}

export default Editor;
