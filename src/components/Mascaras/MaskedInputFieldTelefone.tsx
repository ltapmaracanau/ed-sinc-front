import { useRef, memo } from 'react';
import InputMask from 'react-input-mask';

export const MaskedInputFieldTelefone = memo(({ inputRef, ...props }: any) => {
  const maskRef = useRef(null);

  return (
    <InputMask mask="(99)99999-9999" {...props}>
      {(inputProps: any) => {
        if (inputRef) {
          if (typeof inputRef === 'function') {
            inputRef(maskRef.current);
          } else if (typeof inputRef === 'object') {
            inputRef.current = maskRef.current;
          }
        }
        
        return <input ref={maskRef} {...inputProps} />;
      }}
    </InputMask>
  );
});