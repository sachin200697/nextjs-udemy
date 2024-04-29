"use client";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm(props: SnippetEditFormProps) {
  const [code, setCode] = useState(props.snippet.code);
  const onChange = (value: string = '') => {
    setCode(value);
  };
  return (
    <div>
      <Editor
        height={"25vh"}
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={onChange}
        options={{minimap: {enabled: false}}}
      />
    </div>
  );
}
