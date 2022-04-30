import { defineStore } from "pinia"
// import { useI18n } from "vue-i18n"

const languages = ['zh','en']
function languageValidity(language) {
    return languages.includes(language)
}
export const UseStoreLanguage = defineStore('Language', {
    state: () => ({
        _locale : languages[0]
    }),
    getters: {
        LanguageType:({_locale}) => _locale
    },
    actions: {
        setLanguageType(type) {
            if(languageValidity) {
                this._locale = type;
            } else {
                console.error('language change failed')
            }
        }
    },
})
