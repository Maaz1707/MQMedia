import { ImageResponse } from "next/og";

export const alt = "MQ Media — Where Vision Meets Precision";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0908",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.18) 0%, transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "3px solid #d4af37",
            color: "#d4af37",
            fontSize: 56,
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          MQ
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: 8,
            color: "#f1d896",
          }}
        >
          MQ MEDIA
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            letterSpacing: 6,
            color: "#a8a29a",
            textTransform: "uppercase",
          }}
        >
          Where Vision Meets Precision
        </div>
      </div>
    ),
    { ...size }
  );
}
