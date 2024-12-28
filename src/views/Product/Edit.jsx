import Editor from "../../Components/shared/Editor";

const Edit = () => {
  const data = [
    {
      title: "Product Description",
      data: " <p>Mor mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.</p>",
    },
    {
      title: "Product Specification",
      data: "<ul><li>Forem ipsum dolor sit amet.</li><li>Forem ipsum dolor sit consectetur adipiscing elit.</li><li>Forem ipsum dolorconsectetur adipiscing elit..</li><li>Forem ipsum dolor sit am, consectetur</li></ul>",
    },
  ];
  return (
    <div className="container">
      <h2>About Product</h2>
      <Editor data={data} />
    </div>
  );
};

export default Edit;
