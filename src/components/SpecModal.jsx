"use client";

export default function SpecModal({ activeSpec, onClose, playCyberSound }) {
  if (!activeSpec) return null;

  return (
    <div 
      className="spec-modal-backdrop" 
      data-lenis-prevent="true"
      onClick={() => {
        playCyberSound?.('close');
        onClose?.();
      }}
    >
      <div 
        className="spec-modal-card" 
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="spec-modal-header">
          <div className="spec-modal-title-area">
            <div className="spec-modal-subtitle">{"// SYSTEM SPECIFICATION • "}{activeSpec.id}</div>
            <h3>{activeSpec.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>{activeSpec.subtitle}</p>
          </div>
          <button 
            className="spec-modal-close-btn" 
            onClick={() => {
              playCyberSound?.('close');
              onClose?.();
            }}
            title="Close Spec (ESC)"
          >
            ✕
          </button>
        </div>

        {/* DATA FLOW DIAGRAM */}
        <div className="spec-section-heading">DATA-FLOW &amp; INTERACTION PIPELINE</div>
        <div className="spec-pipeline-box" data-lenis-prevent="true">
          <div className="spec-pipeline-flow">
            {activeSpec.flow.map((step, idx) => (
              <div key={idx} className="spec-step-item">
                <div className={`spec-node ${step.primary ? 'primary' : ''}`}>
                  <span className="spec-step-num">{`0${idx + 1}`}</span>
                  <span>{step.label}</span>
                </div>
                {idx < activeSpec.flow.length - 1 && <span className="spec-arrow">➔</span>}
              </div>
            ))}
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="spec-section-heading">PRODUCTION BENCHMARKS &amp; METRICS</div>
        <div className="spec-metrics-grid">
          {activeSpec.metrics.map((m, idx) => (
            <div key={idx} className="spec-metric-item">
              <div className="metric-label">{m.label}</div>
              <div className="metric-val">{m.val}</div>
            </div>
          ))}
        </div>

        {/* ARCHITECTURE NARRATIVE */}
        <div className="spec-section-heading">PROJECT OVERVIEW &amp; ENGINEERING BLUEPRINT</div>
        <div className="spec-narrative-box">
          {activeSpec.narrative}
        </div>

        {/* VERIFIED TECH ARSENAL */}
        <div className="spec-section-heading">VERIFIED TECH ARSENAL &amp; PRIMITIVES</div>
        <div className="spec-tech-pills">
          {activeSpec.tech.map((t, idx) => (
            <span key={idx} className="spec-tech-pill">
              {t}
            </span>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="spec-actions-row">
          <a 
            href={activeSpec.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="spec-visit-link"
          >
            VISIT LIVE PRODUCTION <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
