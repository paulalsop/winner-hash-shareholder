import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import messages from './message.js'
const i18n = createI18n({
  globalInjection:true,
  legacy: false, // you must specify 'legacy: false' option
  locale:  'zh',
  messages,
});

export default i18n
