import axios from 'axios';
import { Component, createSignal, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { styled, css } from 'solid-styled-components';
import { ProgressBarContainer } from './ProgressBar';
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
    border-color: ${(props: FileDropAreaCSSProps) => props.highlight ? 'purple' : '#ccc'};

    #fileuploader {
        display: none;
    }

    .upload-area {
        margin-top: 2em;
    }
`

const BtnClass = css`
    display: inline-block;
    padding: 10px;
    background: #ccc;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:hover {
        background: #dddddd;
    }
`

interface FileProgress {
    file:  File;
    progress: number;
}

const FileUploader: Component<FileUploaderProps> = (props: FileUploaderProps) => {

    const [shouldHighlight, setShouldHighlight] = createSignal(false);
    const initialFiles: Array<FileProgress> = [];
    // adding new indexes doesn't trigger updates so recommended practice is to use as key in obj
    const [state, setState] = createStore({ files: initialFiles  });

    const stopDefaultBehaviour = (e) => {
        // default behaviour is to open/download the file
        e.preventDefault();
        e.stopPropagation();
    }

    const previewFile = (file) => {

    }

    const uploadFile = async (file: File, index: number) => {
        console.log("upload this file: ", file)
        // TODO: uploads the file
        let formData = new FormData();
        formData.append(file.name, file)
        const response = await axios.post(props.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: function( progressEvent: ProgressEvent ) {
                console.log("progress event: ", progressEvent);
              this.uploadPercentage = Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 );
              console.log('upload progress:', this.uploadPercentage + "%");
            //   info on how to update state here: https://www.solidjs.com/docs/latest/api#createstore
              setState( 'files', index, 'progress', this.uploadPercentage )
            }
        })
        console.log(response);
    }

    const handleFiles = (files: FileList) => {
        console.log("files: ",  files)
        let fp: Array<FileProgress> = [];
        let i = 0;
        for (const f of files) {
            fp[i] = { file: f, progress: 0 } as FileProgress;
            i++;
        }
        console.log("fp: ", fp)
        setState({ files: fp });
        ([...files]).forEach(uploadFile);
    }
    const handleFileDrop = (e) => {
        stopDefaultBehaviour(e);
        console.log(e.dataTransfer)
        handleFiles(e.dataTransfer.files)
    }

    const onDragEnter = (e) => {
        stopDefaultBehaviour(e);
        setShouldHighlight(true)
    }

    const onDragLeave = (e) => {
        stopDefaultBehaviour(e);
        setShouldHighlight(false)
    }

    const onFileDialogChange = (e) => {
        console.log("files: ", e.target.files)
        handleFiles(e.target.files);
    }

    return (
        <FileUploaderDropArea id="fileuploader-area" highlight={shouldHighlight()} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={handleFileDrop} onDragOver={stopDefaultBehaviour} ondragenter={stopDefaultBehaviour} ondragleave={stopDefaultBehaviour}>
            <p>{props.description}</p>
            <input type="file" id="fileuploader" multiple accept={props.accept} onChange={onFileDialogChange} />
            <label for="fileuploader" class={BtnClass}>{props.label}</label>
            <div id="upload-area">
                <For each={state.files}>
                    {
                        (fp: FileProgress) => (
                            <ProgressBarContainer name={fp.file.name} percentage={fp.progress}/>
                        )
                    }
                </For>
            </div>
        </FileUploaderDropArea>
    )
}

export default FileUploader;