import axios from "axios";
import dayjs from "dayjs";
import { Component, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { styled } from "solid-styled-components";
import { BtnClass } from "../common";
import { UploadedTable } from "./UploadedTable";
import { FileProgress } from "./types";

interface FileUploaderProps {
  accept: string;
  description: string;
  label: string;
  url: string;
}

interface FileDropAreaCSSProps {
  highlight: boolean;
}

const FileUploaderDropArea = styled("div")`
  text-align: center;
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 80%;
  margin: 100px auto;
  padding: 20px;
  border-color: ${(props: FileDropAreaCSSProps) =>
    props.highlight ? "#84DE02" : "#ccc"};

  #fileuploader {
    display: none;
  }

  #upload-area {
    margin-top: 2em;
  }
`;

const FileUploader: Component<FileUploaderProps> = (
  props: FileUploaderProps
) => {
  const timeFormat = "DD-MM-YYYY HH:mm:ss:SSS";
  const [shouldHighlight, setShouldHighlight] = createSignal(false);
  const initialFiles: Array<FileProgress> = [];
  // adding new indexes doesn't trigger updates so recommended practice is to use as key in obj
  const [state, setState] = createStore({ files: initialFiles });

  const stopDefaultBehaviour = (e) => {
    // default behaviour is to open/download the file
    e.preventDefault();
    e.stopPropagation();
  };

  const uploadFile = async (file: File, index: number) => {
    console.log("upload this file: ", file);
    let formData = new FormData();
    formData.append(file.name, file);
    try {
      const response = await axios.post(props.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function (progressEvent: ProgressEvent) {
          console.log("progress event: ", progressEvent);
          this.uploadPercentage = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          //   info on how to update state here: https://www.solidjs.com/docs/latest/api#createstore
          setState("files", index, "progress", this.uploadPercentage);
        },
      });
      console.log("resp: ", response);
      setState("files", index, {
        endTime: dayjs().format(timeFormat),
        status: response.status == 200 ? "Completed" : "Error",
      });
    } catch (err) {
      console.log(err);
      setState("files", index, {
        endTime: dayjs().format(timeFormat),
        status: "Error",
      });
    } finally {
      console.log(state.files);
    }
  };

  const handleFiles = (files: FileList) => {
    console.log("files: ", files);
    let fp: Array<FileProgress> = [];
    let i = 0;
    for (const f of files) {
      fp[i] = {
        file: f,
        progress: 0,
        startTime: dayjs().format(timeFormat),
        status: "Pending",
      } as FileProgress;
      i++;
    }
    console.log(fp);
    setState({ files: fp });
    [...files].forEach(uploadFile);
  };
  const handleFileDrop = (e) => {
    stopDefaultBehaviour(e);
    console.log(e.dataTransfer);
    handleFiles(e.dataTransfer.files);
  };

  const onDragEnter = (e) => {
    stopDefaultBehaviour(e);
    setShouldHighlight(true);
  };

  const onDragLeave = (e) => {
    stopDefaultBehaviour(e);
    setShouldHighlight(false);
  };

  const onFileDialogChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <FileUploaderDropArea
      id="fileuploader-area"
      highlight={shouldHighlight()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={handleFileDrop}
      onDragOver={stopDefaultBehaviour}
      ondragenter={stopDefaultBehaviour}
      ondragleave={stopDefaultBehaviour}
    >
      <p>{props.description}</p>
      <input
        type="file"
        id="fileuploader"
        multiple
        accept={props.accept}
        onChange={onFileDialogChange}
      />
      <label for="fileuploader" class={BtnClass}>
        {props.label}
      </label>
      <div id="upload-area">
        <UploadedTable files={state.files} />
      </div>
    </FileUploaderDropArea>
  );
};

export default FileUploader;
