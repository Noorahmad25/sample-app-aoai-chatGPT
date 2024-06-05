import React from 'react';
import { TextField, IconButton } from '@fluentui/react';
import { SendRegular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
interface Props {
  placeholder:string,
  onButtonClick?: () => void;
  text:string,
  setText?:(value: string) => void;
  allowBorder?:boolean
}
const CustomTextField: React.FC<Props> = ({placeholder,onButtonClick,text,setText,allowBorder=false}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '35px',
    background: 'linear-gradient(to right, #3a4951, #232c30)',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border:allowBorder ? "2px solid #378588" :"none"
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

  const buttonStyle: React.CSSProperties = {
    flex: '0 0 10%',
    height: '100%',
    color: 'white',
    borderRadius: '25px',
  };

  const navigate=useNavigate();

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setText?.(newValue || '');
  };

  return (
    <div style={containerStyle}>
      <div style={textFieldWrapperStyle}>
        <TextField
          placeholder={placeholder}
          borderless
          value={text}
          styles={{
            root:{
              color:"#FFFFFF"
            },
            fieldGroup: {
              borderRadius: '25px',
              backgroundColor: 'inherit',
              border: 'none',
            },
            field: {
              backgroundColor: 'inherit',
              color:"#FFFFFF",
              '::placeholder': {
                color: '#7c909b', 
              },
            },
          }}
          style={textFieldStyle}
          onChange={handleChange}
        />
      </div>
      <IconButton
        iconProps={{ iconName: 'Send' }}
        ariaLabel="Send"
        styles={{
          root: {
              backgroundColor:'transparent',
              color: "#FFFFFF",
              borderRadius: 10
          }
      }}
        onClick={onButtonClick}
      />
    </div>
  );
};

export default CustomTextField;
