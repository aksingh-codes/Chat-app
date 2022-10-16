// import Editor from "@draft-js-plugins/editor";
import { Editor, convertFromRaw, EditorState } from "draft-js";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const linkifyPlugin = createLinkifyPlugin();
const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin();
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

const ChatViewer = ({ chat }) => {
  const storedState = JSON.parse(chat.message);
  const contentState = convertFromRaw(storedState);
  const editorState = EditorState.createWithContent(contentState);
  // const editorState = contentState
  console.log(chat);
  return (
    <div className={"RichEditor-editor RichEditor-hidePlaceholder viewer"}>

      <Editor
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
        editorState={editorState}
        readOnly={true}
        plugins={plugins}
      />
    </div>
  );
};

export default ChatViewer;
