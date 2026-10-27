// Build with Swiper 14.3.0 and esbuild; see motion-libraries.md.
import Swiper from 'swiper';
import { A11y, EffectFade, Navigation } from 'swiper/modules';
Swiper.use([A11y, EffectFade, Navigation]);
window.Swiper = Swiper;
