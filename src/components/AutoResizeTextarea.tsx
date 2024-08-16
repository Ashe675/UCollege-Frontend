import { ChangeEvent, useEffect, useRef } from "react";

type AutoResizeTextareaProps = {
  className: string;
  value: string;
  disabled?: boolean;
  id: string;
  maxLength : number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function AutoResizeTextarea({
  value,
  onChange,
  className,
  id,
  disabled,
  maxLength
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      // Calcula la altura mínima basada en el contenido inicial
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, disabled]);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Resetea la altura
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta la altura al contenido
    }
  };

  return (
    <textarea
      minLength={0}
      maxLength={maxLength}
      id={id}
      disabled={disabled}
      ref={textareaRef}
      className={`resize-none overflow-hidden ${className}`}
      value={value}
      onChange={onChange}
      placeholder="Escribe aquí..."
      onInput={handleInput}
      style={{ minHeight: textareaRef.current?.scrollHeight }}
    ></textarea>
  );
}
