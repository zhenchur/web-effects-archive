import dunes from './assets/dunes.webp';
import sandlight from './assets/sandlight.webp';
import mist from './assets/mist.webp';
import highlands from './assets/highlands.webp';
import reflection from './assets/reflection.webp';
import firstlight from './assets/firstlight.webp';
import horizon from './assets/horizon.webp';

export const FILM_CARDS = [
  { src: dunes, title: 'Дюны', subtitle: 'Линии песка', alt: 'Свет и тень на песчаных дюнах' },
  { src: sandlight, title: 'Последний свет', subtitle: 'Намибия', alt: 'Золотая дюна на фоне тёмных гор' },
  { src: mist, title: 'Тишина', subtitle: 'Зимний лес', alt: 'Хвойный лес в тумане' },
  { src: highlands, title: 'Выше облаков', subtitle: 'Колорадо', alt: 'Горное озеро среди скал' },
  { src: reflection, title: 'Отражение', subtitle: 'Швейцария', alt: 'Горы отражаются в спокойном озере' },
  { src: firstlight, title: 'Раннее утро', subtitle: 'Швейцария', alt: 'Солнечные лучи проходят сквозь туманный лес' },
  { src: horizon, title: 'Горизонт', subtitle: 'Невада', alt: 'Светлая дюна над пустынными кустарниками' },
] as const;
