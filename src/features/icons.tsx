import React, { SVGProps } from "react";

export const TmdbLogo = React.memo((props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 423.04 35.4" {...props}>
    <defs>
      <linearGradient
        id="tmbl-logo-gradient"
        y1={17.7}
        x2={423.04}
        y2={17.7}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#90cea1" />
        <stop offset={0.56} stopColor="#3cbec9" />
        <stop offset={1} stopColor="#00b3e5" />
      </linearGradient>
    </defs>
    <title>{"The Movie DB"}</title>
    <g>
      <path
        d="M227.5 0h8.9l8.75 23.2h.1l8.9-23.2h8.35l-14.6 35.4h-6.25Zm46.6 0h7.8v35.4h-7.8Zm22.2 0h24.05v7.2H304.1v6.6h15.35V21H304.1v7.2h17.15v7.2H296.3Zm55 0H363a33.54 33.54 0 0 1 8.07 1 18.55 18.55 0 0 1 6.68 3 15.1 15.1 0 0 1 4.52 5.53A18.5 18.5 0 0 1 384 17.8a16.91 16.91 0 0 1-1.63 7.58 16.37 16.37 0 0 1-4.37 5.5 19.52 19.52 0 0 1-6.35 3.37A24.59 24.59 0 0 1 364 35.4h-12.71Zm7.81 28.2h4a21.57 21.57 0 0 0 5-.55 10.87 10.87 0 0 0 4-1.83 8.69 8.69 0 0 0 2.67-3.34 11.92 11.92 0 0 0 1-5.08 9.87 9.87 0 0 0-1-4.52 9 9 0 0 0-2.62-3.18 11.68 11.68 0 0 0-3.88-1.88 17.43 17.43 0 0 0-4.67-.62h-4.6ZM395.24 0h13.2a34.42 34.42 0 0 1 4.63.32 12.9 12.9 0 0 1 4.17 1.3 7.88 7.88 0 0 1 3 2.73A8.34 8.34 0 0 1 421.39 9a7.42 7.42 0 0 1-1.67 5 9.28 9.28 0 0 1-4.43 2.82v.1a10 10 0 0 1 3.18 1 8.38 8.38 0 0 1 2.45 1.85 7.79 7.79 0 0 1 1.57 2.62 9.16 9.16 0 0 1 .55 3.2 8.52 8.52 0 0 1-1.2 4.68 9.42 9.42 0 0 1-3.1 3 13.38 13.38 0 0 1-4.27 1.65 23.11 23.11 0 0 1-4.73.5h-14.5ZM403 14.15h5.65a8.16 8.16 0 0 0 1.78-.2 4.78 4.78 0 0 0 1.57-.65 3.34 3.34 0 0 0 1.13-1.2 3.63 3.63 0 0 0 .42-1.8 3.22 3.22 0 0 0-.47-1.82 3.33 3.33 0 0 0-1.23-1.13 5.77 5.77 0 0 0-1.7-.58 10.79 10.79 0 0 0-1.85-.17H403Zm0 14.65h7a8.91 8.91 0 0 0 1.83-.2 4.78 4.78 0 0 0 1.67-.7 4 4 0 0 0 1.23-1.3 3.71 3.71 0 0 0 .47-2 3.13 3.13 0 0 0-.62-2 4 4 0 0 0-1.58-1.15 7.83 7.83 0 0 0-2-.55 15.12 15.12 0 0 0-2.05-.15H403Zm-199 6.53h1a17.66 17.66 0 0 0 17.66-17.66A17.67 17.67 0 0 0 205 0h-.91a17.67 17.67 0 0 0-17.69 17.67 17.66 17.66 0 0 0 17.66 17.66ZM10.1 6.9H0V0h28v6.9H17.9v28.5h-7.8ZM39 0h7.8v13.2h15.1V0h7.8v35.4h-7.8V20.1H46.75v15.3H39Zm41.2 0h24v7.2H88v6.6h15.35V21H88v7.2h17.15v7.2h-25Zm55 0H147l8.15 23.1h.1l8.2-23.1h11.75v35.4h-7.8V8.25h-.1L158 35.4h-5.95l-9-27.15H143V35.4h-7.8Z"
        style={{
          fill: "url(#tmbl-logo-gradient)",
        }}
      />
    </g>
  </svg>
));

export const SiteLogo = React.memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 800"
    xmlSpace="preserve"
    width="1.2em"
    height="1.2em"
    {...props}
  >
    <linearGradient
      id="site-logo-dradient"
      gradientUnits="userSpaceOnUse"
      x1={655.052}
      y1={737.807}
      x2={758.177}
      y2={634.682}
    >
      <stop
        offset={0}
        style={{
          stopColor: "#e54b6c",
        }}
      />
      <stop
        offset={0.163}
        style={{
          stopColor: "#e95661",
        }}
      />
      <stop
        offset={0.652}
        style={{
          stopColor: "#f47246",
        }}
      />
      <stop
        offset={0.933}
        style={{
          stopColor: "#f87d3c",
        }}
      />
    </linearGradient>
    <path
      d="M791.7 668.7c-13.7-17.7-38.5-21.3-56.1-7.6-2.5 1.6-25.9 14.2-68.2-27.6-4.5-4.4-9.1-8-13.8-11.8-16 22-34.2 42.2-54.3 60.4 3.7 2.8 7.5 5.4 11.1 8.9 95.1 94.2 170.4 37.5 173.5 35.1 17.7-13.8 21.6-39.8 7.8-57.4z"
      style={{
        fill: "url(#site-logo-dradient)",
      }}
    />
    <linearGradient
      id="SVGID_00000060000729400057223560000016261226843538440889_"
      gradientUnits="userSpaceOnUse"
      x1={98.801}
      y1={630.712}
      x2={575.893}
      y2={153.62}
    >
      <stop
        offset={0.3}
        style={{
          stopColor: "#e54b6c",
        }}
      />
      <stop
        offset={0.9}
        style={{
          stopColor: "#f87d3c",
        }}
      />
    </linearGradient>
    <path
      style={{
        fill: "url(#SVGID_00000060000729400057223560000016261226843538440889_)",
      }}
      d="M337.4 54.8C151 54.8 0 205.9 0 392.2c0 186.3 151 337.4 337.4 337.4 186.3 0 337.3-151.1 337.3-337.4 0-186.3-151-337.4-337.3-337.4zm0 79.8c48 0 87 39 87 87s-38.9 87-87 87c-48 0-87-38.9-87-87 0-48 38.9-87 87-87zm40.3 259.8c0 22.3-18.1 40.4-40.4 40.4-22.3 0-40.4-18.1-40.4-40.4 0-22.3 18.1-40.4 40.4-40.4 22.3 0 40.4 18.1 40.4 40.4zm-213.2 87c-48 0-87-38.9-87-87 0-48 38.9-87 87-87 48 0 87 38.9 87 87-.1 48.1-39 87-87 87zm172.9 172.9c-48 0-87-38.9-87-87 0-48 38.9-87 87-87 48 0 87 38.9 87 87-.1 48.1-39 87-87 87zm172.8-172.9c-48 0-87-38.9-87-87 0-48 38.9-87 87-87 48 0 87 38.9 87 87s-39 87-87 87z"
    />
  </svg>
));
