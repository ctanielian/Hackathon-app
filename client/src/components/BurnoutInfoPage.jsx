import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import LeafIcon from "./LeafIcon.jsx";

function getTierInfo(burnRate, colors) {
  if (burnRate < 0.3) {
    return {
      title: "Low burn-rate zone",
      summary: "Your recent signals suggest strain is present but still relatively well-contained.",
      color: colors.burnGood,
      badge: "Low",
      meaning:
        "Scientifically, this usually means your workload, task pace, and recent recovery signals are staying near your personal baseline. It does not mean zero stress - just that your current pattern does not strongly resemble burnout escalation."
    };
  }
  if (burnRate < 0.6) {
    return {
      title: "Moderate burn-rate zone",
      summary: "Your working pattern is drifting away from baseline and recovery may be lagging behind effort.",
      color: colors.burnWarn,
      badge: "Moderate",
      meaning:
        "Scientifically, this range suggests meaningful deviation in the kinds of markers often associated with overload: slower pace, longer sustained effort, or fatigue-related inputs. It is not a diagnosis, but it is a signal that your stress load may be accumulating."
    };
  }
  return {
    title: "High burn-rate zone",
    summary: "Your current pattern strongly resembles sustained overload and reduced recovery capacity.",
    color: colors.burnHigh,
    badge: "High",
    meaning:
      "Scientifically, this means the app is seeing a stronger clustering of burnout-related indicators - extended duration, reduced pace, fatigue signals, or repeated strain compared with your baseline. This is best treated as an early-warning indicator rather than a clinical conclusion."
  };
}

export default function BurnoutInfoPage({ burnRate, onBack }) {
  const { colors } = useContext(ThemeContext);
  const tier = getTierInfo(burnRate, colors);

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8" style={{ background: colors.dashBg, color: colors.secondaryText }}>
      <div className="mx-auto max-w-5xl pb-20">
        <div
          className="rounded-[32px] p-6 shadow-glow"
          style={{ background: colors.sidebarBg, color: colors.wordmark, border: `1px solid ${colors.sidebarBorder}` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <LeafIcon className="h-12 w-12" primary={colors.primary} secondary={colors.secondary} />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em]" style={{ color: colors.navText }}>Burnout Meter Guide</p>
                <h1 className="font-display text-4xl">What your burnout score means</h1>
              </div>
            </div>
            <button
              onClick={onBack}
              className="rounded-full px-5 py-3 text-sm font-bold"
              style={{ background: colors.primary, color: colors.primaryText }}
            >
              Back to dashboard
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] p-6 shadow-lg" style={{ background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: colors.muted }}>Your current reading</p>
                <h2 className="mt-2 font-display text-3xl">{tier.title}</h2>
              </div>
              <div
                className="rounded-full border px-4 py-2 text-sm font-bold"
                style={{ background: colors.secondary, color: colors.secondaryText, borderColor: colors.cardBorder }}
              >
                {Math.round(burnRate * 100)}%
              </div>
            </div>

            <div className="mt-6 h-6 overflow-hidden rounded-full" style={{ background: colors.secondary }}>
              <div className="h-full rounded-full" style={{ width: `${Math.round(burnRate * 100)}%`, background: tier.color }} />
            </div>

            <div className="mt-6 rounded-[24px] p-5" style={{ background: colors.secondary }}>
              <div className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: colors.muted }}>Plain-language summary</div>
              <p className="mt-3 leading-8">{tier.summary}</p>
            </div>

            <div className="mt-4 rounded-[24px] p-5" style={{ background: colors.secondary }}>
              <div className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: colors.muted }}>Scientific interpretation</div>
              <p className="mt-3 leading-8">{tier.meaning}</p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] p-6 shadow-lg" style={{ background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
              <p className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: colors.muted }}>How Wellby estimates this</p>
              <ul className="mt-4 space-y-3 text-sm leading-7">
                <li>Work pace relative to your baseline over prior sessions.</li>
                <li>Time spent working compared with your usual session length.</li>
                <li>Mood and fatigue-related inputs when they are available.</li>
                <li>Local burnout prediction signals from the connected model.</li>
              </ul>
            </div>

            <div className="rounded-[32px] p-6 shadow-lg" style={{ background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
              <p className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: colors.muted }}>How to read the scale</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "0% - 29%", meaning: "Lower current burnout risk signal", color: colors.burnGood },
                  { label: "30% - 59%", meaning: "Moderate strain - worth monitoring", color: colors.burnWarn },
                  { label: "60% - 100%", meaning: "High strain - break recommended", color: colors.burnHigh }
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-[20px] p-4" style={{ background: colors.secondary }}>
                    <span className="mt-1 h-3 w-3 rounded-full" style={{ background: item.color }} />
                    <div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-sm" style={{ color: colors.muted }}>{item.meaning}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] p-6 shadow-lg" style={{ background: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
              <p className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: colors.muted }}>Important note</p>
              <p className="mt-3 text-sm leading-7">
                This meter is an educational wellbeing estimate, not a medical or psychological diagnosis. It is best used as an early signal to reflect, rest, and adjust workload when needed.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <footer
        className="fixed bottom-0 left-0 right-0 px-4 py-3 text-center text-xs font-semibold"
        style={{ background: colors.sidebarBg, color: colors.wordmark }}
      >
        Wellby is a wellness companion, not a substitute for professional mental health care.
      </footer>
    </div>
  );
}
