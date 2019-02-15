// Type definitions for qrcode.react 0.9
// Project: https://github.com/zpao/qrcode.react
// Definitions by: Mleko <https://github.com/mleko>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

/// <reference types="react" />

declare namespace qrcode {
  interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: "L" | "M" | "Q" | "H";
    renderAs?: "svg" | "canvas";
    className?: string;
    style?: string;
  }
  type QRCode = React.ComponentClass<QRCodeProps>;
}

declare module "qrcode.react" {
  const qrcode: qrcode.QRCode;
  export = qrcode;
}
