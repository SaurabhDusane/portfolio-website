import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A1B",
          color: "#FF4500",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -0.5,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 6,
        }}
      >
        SD
      </div>
    ),
    { ...size }
  );
}
