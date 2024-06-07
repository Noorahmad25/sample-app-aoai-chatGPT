import React, { useEffect, useRef, useState } from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

interface Props {
  placeholder: string,
  onButtonClick?: () => void;
  text: string,
  setText?: (value: string) => void;
  allowBorder?: boolean,
  isButtonRequired?: boolean
  onFocus?: () => void;
  onBlur?: () => void;
  isTextFieldFocused?: boolean
}

const CustomTextField: React.FC<Props> = ({ placeholder, onButtonClick, text, setText, allowBorder = false, isButtonRequired = true, onFocus, onBlur, isTextFieldFocused = false }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '35px',
    background: 'linear-gradient(to right,#232c30, #3a4951)',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: allowBorder ? "2px solid #378588" : "none"
  };

  const textFieldStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'inherit',
  };

  const textFieldWrapperStyle: React.CSSProperties = {
    flex: 1,
    borderRadius: '25px',
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setText?.(newValue || '');
  };

  const navigate = useNavigate();

  const handleNavigate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Stop the event from propagating to other elements
    event.preventDefault(); 
    setIsButtonClicked(true); // Set the flag to true
    navigate('/recommendations'); // Adjust the route as necessary
    setIsButtonClicked(false); // Reset the flag
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      onButtonClick?.();
    }
  };

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = () => {
    if (!isButtonClicked) {
      onBlur?.();
    }
  };

  const handleMouseDown = () => {
    setIsButtonClicked(true);
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 0);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
      <div style={containerStyle}>
        <div style={textFieldWrapperStyle}>
          <TextField
            placeholder={placeholder}
            borderless
            value={text}
            resizable={false}
            multiline
            rows={isTextFieldFocused ? 6 : 1}
            styles={{
              root: {
                color: "#FFFFFF",
                height: isTextFieldFocused ? "200px" : "25px",
                textOverflow: !isTextFieldFocused ? 'ellipsis' : 'initial',
                overflow: 'hidden',
              },
              fieldGroup: {
                borderRadius: '25px',
                backgroundColor: 'inherit',
                height: isTextFieldFocused ? "200px" : "25px",
                textOverflow: !isTextFieldFocused ? 'ellipsis' : 'initial',
                overflow: 'hidden',

                border: 'none',
              },
              field: {
                backgroundColor: 'inherit',
                height: isTextFieldFocused ? "200px" : "25px",
                textOverflow: !isTextFieldFocused ? 'ellipsis' : 'initial',
                overflow: 'hidden',

                color: "#FFFFFF",
                '::placeholder': {
                  color: '#7c909b',
                },
              },
            }}
            style={textFieldStyle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={handleBlur} // Use the custom handleBlur
          />
        </div>
      </div>

      {isButtonRequired && (
        <PrimaryButton
          style={{
            width: "100%",
            marginTop: 20,
            borderRadius: 10,
            padding: 20,
            background: "black",
            opacity: 0.5,
            border: "none"
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleNavigate}
        >
          Submit
        </PrimaryButton>
      )}
    </div>
  );
};

export default CustomTextField;
