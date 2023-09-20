import React from 'react';

type Props = {
  indeterminate?: boolean;
};

const TableCheckBox: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { indeterminate = false, ...rest },
  ref
) => {
  const defaultRef = React.useRef<HTMLInputElement>();
  const resolvedRef = (ref ||
    defaultRef) as React.MutableRefObject<HTMLInputElement>;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </>
  );
};

export default React.forwardRef(TableCheckBox);