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

const Edit = () => {
  return (
    <div      style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
>
      <h2>About Product</h2>
      <div className="editor-container">
        <div className="editor-section">
          <h3>Product Description:</h3>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>"
          />
        </div>
        <div className="editor-section">
          <h3>Product Specification:</h3>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data="<ul><li>Forem ipsum dolor sit amet.</li><li>Forem ipsum dolor sit consectetur...</li></ul>"
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
