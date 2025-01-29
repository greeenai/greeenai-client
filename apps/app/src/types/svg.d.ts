declare module '*.svg' {
  import React from 'react';
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}
