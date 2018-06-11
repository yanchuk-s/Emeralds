<template>
  <no-ssr>
    <div style="margin:1.5rem auto .5rem; max-width:1400px; max-height:none;">
      <div
        id="trustpilot"
        class="trustpilot-widget"
        data-locale="en-US"
        data-template-id="54ad5defc6454f065c28af8b"
        data-businessunit-id="4be9e24a00006400050a99b9"
        data-style-height="220px"
        data-style-width="100%"
        data-theme="light"
        data-stars="4,5">
        <a
          href="https://www.trustpilot.com/review/www.thenaturalsapphirecompany.com"
          target="_blank" />
      </div>
    </div>
  </no-ssr>
</template>

<script>
export default {
  name: 'TrustPilotWidget',

  head: {
    script: [
      { src: 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js' }
    ]
  },

  mounted ()
  {
    this.$nextTick(() =>
    {
      const trustbox = document.getElementById('trustpilot')
      window.Trustpilot.loadFromElement(trustbox)
    })
  }
}
</script>

<style scoped>

</style>
