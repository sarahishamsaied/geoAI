import React from "react";
import { client } from "@gradio/client";

type Props = {};

const Upload = (props: Props) => {
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={(e) => setFile(e.target.files![0])} />
      <button>Upload</button>
    </div>
  );
};

export default Upload;
