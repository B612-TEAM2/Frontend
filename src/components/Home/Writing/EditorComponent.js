import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";

class EditorComponent extends Component{
    constructor(props){
        super(props);
        this.quillRef = null;
        this.reactQuillRef = null;
    }

    componentDidMount() {
      this.attachQuillRefs();
    }
    componentDidUpdate() {
      this.attachQuillRefs();
    }
    attachQuillRefs = () => {
      if (typeof this.reactQuillRef.getEditor !== 'function') return;
      this.quillRef = this.reactQuillRef.getEditor();
      if (this.quillRef) {
        let toolbar = this.quillRef.getModule('toolbar');
        toolbar.addHandler('image', this.imageHandler);
      }
    }

    imageHandler = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = async () => {
        const file = input.files[0];
        const range = this.quillRef.getSelection(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          this.quillRef.insertEmbed(range.index, 'image', reader.result);
          this.quillRef.setSelection(range.index + 1);
          this.props.onImageChange(file);
        };
        reader.readAsDataURL(file);
      };
    }

    modules = {
        toolbar: {
          container: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            ['clean']
          ],
          handlers: {
            'image': this.imageHandler
          }
        },
      }
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
      ]

    render(){
        const { value, onChange } = this.props;
        return(
            <Div>
                <ReactQuill
                    style={{height: '100%'}}
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats} 
                    value={value || ''} 
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                    ref={(el) => {this.reactQuillRef = el}} />
            </Div>
        )
    }
}

EditorComponent.defaultProps = {
  handleImageChange: () => {},
  imagesCount: 0,
};

const Div = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  height: 50vh;
`;

export default EditorComponent