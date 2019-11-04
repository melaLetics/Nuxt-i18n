<template>
  <section class="section">
    {{ $t('intro') }}

    <div>
      <label>{{ $t('switch') }}</label>
      <select v-model="myLanguage" class="form-control">
        <option
          v-for="locale in loadedLanguages"
          :key="locale.key"
          :value="locale.key"
        >
          {{ locale.description }}
        </option>
      </select>
    </div>
    <div>
      <button @click="changeLanguage()">{{ $t('button_text') }}</button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Startpage',
  computed: {
    ...mapState('locale', ['loadedLanguages']),
    ...mapState('locale', ['locale'])
  },
  created() {
    this.title = this.$t('title')
    this.message = this.$t('message')
    this.cancelText = this.$t('cancelText')
    this.confirmText = this.$t('confirmText')
    this.agreedText = this.$t('agreedText')
    this.disagreedText = this.$t('disagreedText')
    this.myLanguage = this.locale
  },
  methods: {
    changeLanguage() {
      this.$buefy.dialog.confirm({
        title: this.title,
        message: this.message,
        cancelText: this.cancelText,
        confirmText: this.confirmText,
        type: 'is-success',
        onConfirm: () => {
          this.$store.dispatch('locale/setLanguage', this.myLanguage)
          location.reload(true)
        },
        onCancel: () => this.$buefy.toast.open(this.disagreedText)
      })
    }
  }
}
</script>
