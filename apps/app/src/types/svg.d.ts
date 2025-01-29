declare module '*.svg' {
  import React from 'react';
  const content: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}
