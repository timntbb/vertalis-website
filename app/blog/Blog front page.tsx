export default function BlogFrontPageBanner() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "420px",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 18% 50%, rgba(184,90,27,0.18) 0%, rgba(184,90,27,0.08) 18%, transparent 38%), radial-gradient(circle at 72% 48%, rgba(184,90,27,0.12) 0%, rgba(184,90,27,0.05) 16%, transparent 34%), linear-gradient(180deg, #080808 0%, #030303 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "72px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(184,90,27,0.18) 0%, rgba(184,90,27,0.08) 38%, transparent 72%)",
              filter: "blur(18px)",
            }}
          />
          <img
            src="/logo-final.png"
            alt="Vertalis logo"
            style={{
              position: "relative",
              zIndex: 2,
              width: "260px",
              height: "auto",
              display: "block",
              filter:
                "drop-shadow(0 0 12px rgba(0,0,0,0.45)) drop-shadow(0 0 10px rgba(184,90,27,0.08))",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "640px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#a1a1aa",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontSize: "0.78rem",
              fontWeight: 600,
            }}
          >
            Blog Front Page
          </p>
          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "3rem",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 600,
            }}
          >
            Founder-side legal insights for modern companies.
          </h1>
          <p
            style={{
              margin: 0,
              color: "#d4d4d8",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            Commentary on governance, contracts, capital readiness, and
            practical legal structure that helps founders scale with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}