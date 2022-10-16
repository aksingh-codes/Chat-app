import { useRef, useState } from "react";
import { nanoid } from "nanoid"
import Editor from "@draft-js-plugins/editor";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import { convertToHTML } from "draft-convert"
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";

import { BsTypeBold, BsCodeSquare, BsTypeItalic, BsTypeUnderline, BsBlockquoteLeft, BsCodeSlash, BsTypeStrikethrough } from "react-icons/bs"
import { AiOutlineUnorderedList, AiOutlineOrderedList} from "react-icons/ai"
import { IoMdSend } from "react-icons/io"

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const linkifyPlugin = createLinkifyPlugin();
const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [linkifyPlugin, hashtagPlugin, emojiPlugin];

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

const StyleButton = (props) => {
  let className = "RichEditor-styleButton";
  if (props.active) {
    className += " RichEditor-activeButton";
  }
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: <BsBlockquoteLeft />, style: "blockquote" },
  { label: <AiOutlineUnorderedList />, style: "unordered-list-item" },
  { label: <AiOutlineOrderedList />, style: "ordered-list-item" },
  { label: <BsCodeSquare />, style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={nanoid()}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: <BsTypeBold />, style: "BOLD" },
  { label: <BsTypeItalic />, style: "ITALIC" },
  { label: <BsTypeUnderline />, style: "UNDERLINE" },
  { label: <BsTypeStrikethrough />, style: "STRIKETHROUGH" },
  { label: <BsCodeSlash />, style: "CODE" },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={nanoid()}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const ChatEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editor = useRef(null);

  const onChange = (editorState) => setEditorState(editorState);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const onTab = (e) => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  const sendMessage = () => {
    const currentContent = editorState.getCurrentContent();
    const raw = convertToRaw(currentContent);
    const message = JSON.stringify(raw);
    // const message = convertToHTML(currentContent)
    console.log(message);
    props.socket.emit("chat", { message });
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div ref={props.editorRef} className="editor bg-dark text-light RichEditor-root shadow">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={className} onClick={() => editor.current.focus()}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          onTab={onTab}
          placeholder="Tell a story..."
          ref={editor}
          spellCheck={true}
          plugins={plugins}
        />
        {/* <EmojiSuggestions /> */}
        <EmojiSelect />
      </div>
      <button className="btn btn-success mt-2" onClick={sendMessage}>
        {<IoMdSend />}
      </button>
    </div>
  );
};

export default ChatEditor;
