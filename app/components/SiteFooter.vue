<template>
  <footer id="contact" class="footer">
    <div class="container footer__inner">
      <div>
        <span v-reveal class="eyebrow">Contact</span>
        <h2 v-reveal="80" class="footer__title">Have a product in mind? Let’s build it.</h2>
        <p v-reveal="160" class="footer__text">
          Open to software engineering roles, freelance projects and partnerships with Invaincu Ltd. Email is the
          fastest way to reach me.
        </p>
      </div>

      <div v-reveal="240" class="footer__actions">
        <a :href="`mailto:${email}`" class="btn btn--primary">{{ email }}</a>
        <a href="https://github.com/baghor" class="btn btn--ghost" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>

    <div class="container footer__bottom">
      <span>© {{ year }} Ineza Irene Baghor</span>
      <span>Designed and built in Kigali, Rwanda</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const email = 'inezairene30@gmail.com'
  const year = new Date().getFullYear()
</script>

<style scoped>
  .footer {
    padding: 80px 0 32px;
    background: var(--bg-soft);
    border-top: 1px solid var(--border);
  }

  .footer__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
  }

  .footer__title {
    font-size: clamp(26px, 4vw, 34px);
    margin-bottom: 10px;
  }

  .footer__text {
    max-width: 460px;
    color: var(--text-muted);
  }

  .footer__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .footer__actions .btn {
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .footer__bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    margin-top: 56px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 14px;
  }
</style>
