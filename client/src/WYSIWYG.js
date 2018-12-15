import React, { Component } from 'react';
import { EditorState, RichUtils, Modifier, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js/dist/Draft.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faHeading, faQuoteLeft, faCode, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faBold, faItalic, faUnderline, faHeading, faQuoteLeft, faCode, faTrashAlt)

const styleMap = {
  'CODE': {
    'fontFamily': 'monospace',
  }
}

function myBlockStyleFn(contentBlock) {
  //App.css contains classes for each custom contentBlock type
  return contentBlock.getType();
}

//this is the wysiwyg for creating blog posts
class MyEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      loaded: false
    };
    //retrieves local storage form where editor left off
    const content = window.localStorage.getItem('content');
    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
      //passess it to state of parent to be submitted
      this.props.setValue(content);
    }

    this.onChange = (editorState) => {
      const contentState = editorState.getCurrentContent(); //content of wysiwyg
      const rawContent = JSON.stringify(convertToRaw(contentState)); //convert to raw JSON, then to string to be stored
      window.localStorage.setItem('content', rawContent) //saves in local storage
      this.setState({editorState}); //updates the state of wysiwyg
      this.props.setValue(rawContent); //sets state of parent to be submitted to server
      console.log({editorState: this.state.editorState})
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = this.onTab.bind(this);
    this.loadContent = this.loadContent.bind(this);
  }
  loadContent() {
    fetch('api/load_article?title='+this.props.title)
      .then(res => res.json())
      .then(res => {
        if (res === "not found") {
          console.log(res)
          return
        }else{
          this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res))), loaded: true});
          this.props.setLoaded();
        }
    })
  }
  handleKeyCommand(command) {
    //Allows hot keys when in editor
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

    onTab(e) {
      //allows the use of the tab key in editor
      e.preventDefault();
    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        "   "
      );
    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    })
  }

//buttons for styling
  _onItalicClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));

  }
  _onBoldClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onUnderlineClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onCodeClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  }
  _onCodeBlockClick(e) {
    e.preventDefault();
    //this.onChange(RichUtils.toggleCode(this.state.editorState));
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'CODEBLOCK'));
  }
  _onH1Click(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'H1'));
  }
  _onH2Click(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'H2'));
  }
  _onH3Click(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'H3'));
  }
  _onBlockQuoteClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'BLOCKQUOTE'));
  }
  render() {
    let deleteButton;
    if (this.state.loaded) {deleteButton = <button className="style-button" onClick={this.props.toggleDelete}><FontAwesomeIcon icon="trash-alt" /></button>}
    return (
      <div name="article_data" value={this.state.article_data}>
        <div id="ribbon">
          <button className="style-button" type="button" onMouseDown={this._onBoldClick.bind(this)}><FontAwesomeIcon icon="bold" /></button>
          <button className="style-button" type="button" onMouseDown={this._onItalicClick.bind(this)}><FontAwesomeIcon icon="italic" /></button>
          <button className="style-button" type="button" onMouseDown={this._onUnderlineClick.bind(this)}><FontAwesomeIcon icon="underline" /></button>
          <button className="style-button" type="button" onMouseDown={this._onCodeClick.bind(this)}><FontAwesomeIcon icon="code" /></button>
          <button className="style-button" type="button" onMouseDown={this._onCodeBlockClick.bind(this)}><div className="custom-icon">&#123;..&#125;</div></button>
          <button className="style-button" type="button" onMouseDown={this._onH3Click.bind(this)}><FontAwesomeIcon icon="heading" /></button>
          <button className="style-button" type="button" onMouseDown={this._onBlockQuoteClick.bind(this)}><FontAwesomeIcon icon="quote-left" /></button>
          <button className="load" type="button" onClick={this.loadContent}>load</button>
          {deleteButton}
        </div>
        <div id="editor-div">
          <Editor 
            ref="editor" 
            editorState={this.state.editorState} 
            customStyleMap={styleMap} 
            blockStyleFn={myBlockStyleFn} 
            name="article_data" 
            value={this.state.value} 
            onTab={this.onTab} 
            onChange={this.onChange} 
            handleKeyCommand={this.handleKeyCommand} 
          />
        </div>
      </div>
      )
  }
}

//individual article to be read on article page as a read only editor
class ReadOnlyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    console.log({props: this.props})
    const content = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)));
    return (
      <div className="article-content">
        <Editor editorState={content} 
        customStyleMap={styleMap} 
        blockStyleFn={myBlockStyleFn}
        readOnly={true} />
        {/*<div className="author">{"~ " + this.props.author}</div>*/}
      </div>
    )
  }
}

export { MyEditor, ReadOnlyEditor };