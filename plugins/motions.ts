import { MotionOnePlugin } from 'vue-motion-one';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MotionOnePlugin);
});
