<template>
  <!-- The two lines Irene lives by, in a storm-dark band with a lightning flash -->
  <section class="motto" aria-labelledby="motto-title">
    <div class="motto__sky" aria-hidden="true">
      <span class="motto__glow motto__glow--teal"></span>
      <span class="motto__glow motto__glow--indigo"></span>
      <svg class="motto__bolt" viewBox="0 0 64 120" fill="currentColor">
        <path d="M38 0 6 68h22L18 120l40-76H34L48 0z" />
      </svg>
      <span class="motto__flash"></span>
    </div>

    <div class="container motto__inner">
      <span v-reveal class="eyebrow motto__eyebrow">What drives me</span>

      <h2 id="motto-title" v-reveal="80" class="motto__title">
        Go big or
        <span class="motto__accent">go extinct.</span>
      </h2>

      <p v-reveal="160" class="motto__poem">
        <span>Some wait for the storm to pass.</span>
        <span class="motto__poem-strike">Some become it.</span>
      </p>

      <p v-reveal="240" class="motto__tag">
        <svg class="motto__icon" viewBox="0 0 64 120" fill="currentColor" aria-hidden="true">
          <path d="M38 0 6 68h22L18 120l40-76H34L48 0z" />
        </svg>
        <span>#feel_the_thunder</span>
        <svg class="motto__icon" viewBox="0 0 64 120" fill="currentColor" aria-hidden="true">
          <path d="M38 0 6 68h22L18 120l40-76H34L48 0z" />
        </svg>
      </p>
    </div>
  </section>
</template>

<style scoped>
  /* Always storm-dark, in both themes, so it stands apart from the page */
  .motto {
    position: relative;
    overflow: hidden;
    padding: 120px 0;
    background: #070c17;
    color: #e8edf5;
    border-top: 1px solid #1f2a40;
    isolation: isolate;
  }

  .motto__sky {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .motto__glow {
    position: absolute;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.35;
  }

  .motto__glow--teal {
    top: -220px;
    left: -140px;
    background: #0d9488;
  }

  .motto__glow--indigo {
    right: -160px;
    bottom: -260px;
    background: #6366f1;
  }

  .motto__bolt {
    position: absolute;
    top: 50%;
    right: 8%;
    width: clamp(140px, 22vw, 260px);
    color: #2dd4bf;
    opacity: 0.08;
    transform: translateY(-50%) rotate(8deg);
    animation: bolt 7s infinite;
  }

  /* The sky lights up for a moment, twice, like a thunder strike */
  .motto__flash {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 78% 45%, rgba(165, 243, 252, 0.22), transparent 60%);
    opacity: 0;
    animation: flash 7s infinite;
  }

  @keyframes flash {
    0%,
    80%,
    100% {
      opacity: 0;
    }

    82% {
      opacity: 1;
    }

    84% {
      opacity: 0.2;
    }

    86% {
      opacity: 0.8;
    }

    92% {
      opacity: 0;
    }
  }

  @keyframes bolt {
    0%,
    80%,
    100% {
      opacity: 0.08;
    }

    82%,
    86% {
      opacity: 0.4;
    }

    92% {
      opacity: 0.08;
    }
  }

  .motto__inner {
    position: relative;
  }

  .motto__eyebrow {
    color: #2dd4bf;
  }

  .motto__title {
    max-width: 820px;
    font-size: clamp(44px, 8.5vw, 96px);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .motto__accent {
    display: block;
    background: linear-gradient(100deg, #2dd4bf 10%, #818cf8 90%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* Two quiet lines, the second one lands harder */
  .motto__poem {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 32px;
    padding-left: 20px;
    border-left: 2px solid rgba(45, 212, 191, 0.5);
    color: #9aa6b8;
    font-family: var(--font-heading);
    font-size: clamp(18px, 2.4vw, 22px);
    font-style: italic;
    letter-spacing: 0.01em;
  }

  .motto__poem-strike {
    color: #e8edf5;
    font-weight: 600;
  }

  .motto__tag {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-top: 36px;
    padding: 12px 22px;
    border: 1px solid rgba(45, 212, 191, 0.35);
    border-radius: 999px;
    background: rgba(45, 212, 191, 0.08);
    color: #5eead4;
    font-family: var(--font-heading);
    font-size: clamp(16px, 2.4vw, 20px);
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .motto__icon {
    width: 10px;
    height: 19px;
    color: #facc15;
    filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.6));
  }

  @media (max-width: 600px) {
    .motto {
      padding: 88px 0;
    }

    .motto__bolt {
      right: -20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .motto__bolt,
    .motto__flash {
      animation: none;
    }
  }
</style>
