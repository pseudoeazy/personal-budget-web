import * as React from 'react';
const Hobbie = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_6_156)">
      <path
        d="M30 11.8L16 2L2 11.8H14.6V30H17.4V11.8H30ZM16 5.416L21.124 9.00001H10.876L16 5.416Z"
        fill="#1E1E1E"
      />
      <path
        d="M4.99599 16L2.25198 16.518L3.39999 22.636V30H6.19999L6.22799 24.4H8.99999V30H11.8V21.6H6.05999L4.99599 16Z"
        fill="#1E1E1E"
      />
      <path
        d="M25.94 21.6H20.2V30H23V24.4H25.772L25.8 30H28.6V22.636L29.748 16.518L27.004 16L25.94 21.6Z"
        fill="#1E1E1E"
      />
    </g>
    <defs>
      <clipPath id="clip0_6_156">
        <rect width={32} height={32} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default Hobbie;
