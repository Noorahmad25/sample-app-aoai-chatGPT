import React from 'react';
import { IconButton } from '@fluentui/react';

const CustomIconButton: React.FC = () => {


  return (
    <IconButton
      iconProps={{ iconName: 'Send' }} 
      ariaLabel="Send"
      onClick={()=>alert('Send button clicked')}
      style={{ color: 'white',marginTop:40,background:"black",padding:30,borderRadius:50 }}
    />
  );
};

export default CustomIconButton;
