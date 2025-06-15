import 'dotenv/config';
import { db } from '../configs/db';
import { apiDragonballTable, dragonballPlanetTable, dragonballTransformationTable } from '../configs/schema';
import { eq } from 'drizzle-orm';
import path from 'path';

interface DbCharacter {
  name: string;
  image: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  affiliation: string;
  description: string;
  originPlanetId?: number;
  transformations?: string;
  family?: string;
  saga?: string;
  height?: string;
  weight?: string;
  hair?: string;
  eyes?: string;
  deceased?: boolean;
  debut?: string;
  relatives?: string;
  techniques?: string;
  powerStats?: string;
  locations?: string;
  species?: string;
  movies?: string;
  series?: string;
  movieCharacters?: string;
  seriesCharacters?: string;
  userInfo?: string;
}

interface DbTransformation {
  name: string;
  ki: number;
  image: string;
  description?: string;
  characters?: string;
}

interface DbPlanet {
  name: string;
  description?: string;
  image?: string;
  races?: string;
}

const transformLocalImagePath = (cloudinaryUrl: string, type: 'characters' | 'planets' | 'transformations'): string => {
  const filename = path.basename(cloudinaryUrl);
  return `/public/dragonball-api/${type}/${filename}`;
};

async function clearTables() {
  console.log('🗑️ Limpiando tablas...');
  await db.delete(dragonballTransformationTable);
  await db.delete(apiDragonballTable);
  await db.delete(dragonballPlanetTable);
  console.log('✅ Tablas limpiadas');
}

async function importTransformations(transformations: DbTransformation[]) {
  console.log('🔄 Importando transformaciones...');
  for (const transformation of transformations) {
    await db.insert(dragonballTransformationTable).values({
      name: transformation.name,
      ki: Number(String(transformation.ki).replace(/[^0-9]/g, '') || '0'),
      image: transformLocalImagePath(transformation.image, 'transformations'),
      description: transformation.description || '',
      characters: transformation.characters || '[]'
    });
  }
  console.log('✅ Importación de transformaciones completada');
}

async function importCharacters(characters: DbCharacter[]) {
  console.log('🔄 Importando personajes...');
  for (const character of characters) {
    await db.insert(apiDragonballTable).values({
      name: character.name,
      image: transformLocalImagePath(character.image, 'characters'),
      ki: character.ki,
      maxKi: character.maxKi,
      race: character.race,
      gender: character.gender,
      affiliation: character.affiliation,
      description: character.description,
      originPlanetId: character.originPlanetId,
      transformations: character.transformations || '[]',
      family: character.family || '[]',
      saga: character.saga || '',
      height: character.height || '',
      weight: character.weight || '',
      hair: character.hair || '',
      eyes: character.eyes || '',
      deceased: character.deceased || false,
      debut: character.debut || '',
      relatives: character.relatives || '[]',
      techniques: character.techniques || '[]',
      powerStats: character.powerStats || '{}',
      locations: character.locations || '[]',
      species: character.species || '[]',
      movies: character.movies || '[]',
      series: character.series || '[]',
      movieCharacters: character.movieCharacters || '[]',
      seriesCharacters: character.seriesCharacters || '[]',
      userInfo: character.userInfo || '{}'
    });
  }
  console.log('✅ Importación de personajes completada');
}

async function importPlanets(planets: DbPlanet[]) {
  console.log('🔄 Importando planetas...');
  for (const planet of planets) {
    await db.insert(dragonballPlanetTable).values({
      name: planet.name,
      description: planet.description || '',
      image: planet.image ? transformLocalImagePath(planet.image, 'planets') : '',
      races: planet.races || '[]'
    });
  }
  console.log('✅ Importación de planetas completada');
}

const planets: DbPlanet[] = [
  {
    name: 'Namek',
    description: 'Planeta natal de los Namekianos. Escenario de importantes batallas y la obtención de las Dragon Balls de Namek.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145134/wxedvvh8kiyw00psvphl.webp',
    races: JSON.stringify(['Namekian'])
  },
  {
    name: 'Tierra',
    description: 'La Tierra también llamado Mundo del Dragón (Dragon World), es el planeta principal donde se desarrolla la serie de Dragon Ball. Se encuentra en el Sistema Solar de la Vía Láctea de las Galaxias del Norte del Universo 7, lugar que supervisa el Kaio del Norte, y tiene su equivalente en el Universo 6. El hogar de los terrícolas y los Guerreros Z. Ha sido atacado en varias ocasiones por enemigos poderosos.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145184/yq8zw7kk4fmhgyj4z0c7.webp',
    races: JSON.stringify(['Human', 'Android'])
  },
  {
    name: 'Vegeta',
    description: 'El planeta Vegeta, conocido como planeta Plant antes del fin de la Guerra Saiyan-tsufruiana en el año 730, es un planeta rocoso ficticio de la serie de manga y anime Dragon Ball y localizado en la Vía Láctea de las Galaxias del Norte del Universo 7 hasta su destrucción a manos de Freezer en los años 737-739. Planeta natal de los Saiyans, destruido por Freezer. Anteriormente conocido como Planeta Plant.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145235/tuxongfmdhde18bhkvo3.webp',
    races: JSON.stringify(['Saiyan'])
  },
  {
    name: 'Freezer No. 79',
    description: 'Planeta artificial utilizado por Freezer como base de operaciones y centro de clonación.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145256/d1vystda6qykng2jgyl9.webp',
    races: JSON.stringify(['Varios'])
  },
  {
    name: 'Kanassa',
    description: 'Planeta habitado por los Kanassans y conocido por la lucha entre Bardock y los habitantes del planeta.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145275/z3ilwrgtjs3ydzn7fnuz.webp',
    races: JSON.stringify(['Kanassan'])
  },
  {
    name: 'Monmar',
    description: 'Planeta donde Gohan y Krillin encontraron las Dragon Balls para revivir a sus amigos durante la Saga de Namek.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145287/aiqfvaq5c1ra0z7n6dj6.webp',
    races: JSON.stringify(['Unknown'])
  },
  {
    name: 'Yardrat',
    description: 'Planeta de la técnica Instant Transmission, aprendida por Goku durante su estancia.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145308/lsmpf6d0maaxnxebwjae.webp',
    races: JSON.stringify(['Yardratian'])
  },
  {
    name: 'Kaiō del Norte',
    description: 'El Planeta Kaio se encuentra al final del largo Camino de la Serpiente. Es donde viven el Kaio del Norte, su mascota Bubbles, al que utiliza como parte de su entrenamiento, y Gregory.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145347/sptximzpi1kike83bpue.webp',
    races: JSON.stringify(['Kaio'])
  },
  {
    name: 'Makyo',
    description: 'Makyo es un planeta y la fuente de alimentación de todos los malévolos, especialmente Garlic Jr., que solo aparece durante el Arco de Garlic Jr. de Dragon Ball Z.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145368/zjrixubdmmoxnx04nm5w.webp',
    races: JSON.stringify(['Makyan'])
  },
  {
    name: 'Babari',
    description: 'Planeta habitado por los Babari, es un planeta telúrico del Universo 10 donde residen los babarianos, hizo su primera aparición en el episodio 54 de Dragon Ball Super. Es donde Tarble, el hermano de Vegeta, se refugió.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145390/iwm1l1j9v0s6cjthztcp.webp',
    races: JSON.stringify(['Babarian'])
  },
  {
    name: 'Tsufur (Universo 6)',
    description: 'Planeta natal de los Tsufur, la raza a la que pertenecía el Dr. Raichi.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145436/h5djj2mr0xii8ljq7d5b.webp',
    races: JSON.stringify(['Tsufuru'])
  },
  {
    name: 'Desconocido',
    description: 'Sin informacion',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145640/arclw31gjcc1ct8kmmho.png',
    races: JSON.stringify(['Unknown'])
  },
  {
    name: 'Otro Mundo',
    description: 'El Otro Mundo en contraparte al Mundo de los vivos, es, en Dragon Ball, la versión del mundo de los muertos. Es donde los personajes van cuando mueren, y también donde residen las deidades superiores del universo. En el episodio 53 del anime, el Otro Mundo fue descrito como "la dimensión siguiente", y el acto de desear traer a la vida a una persona muerta con las Esferas del Dragón se llama "traer (a ellos) a esta dimensión.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146163/tn7auh3pfpbzs10i0ppa.webp',
    races: JSON.stringify(['Various'])
  },
  {
    name: 'Planeta de Bills',
    description: 'Planeta de Bills un cuerpo celeste ubicado dentro del mundo de los vivos del Universo 7, el cual aparece por primera vez en la película Dragon Ball Z: La Batalla de los Dioses.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146331/jgmkxichfmsbtd2hmkcd.webp',
    races: JSON.stringify(['God'])
  },
  {
    name: 'Planeta del Gran Kaio',
    description: 'El Planeta del Gran Kaio es donde se organiza el Torneo de Artes Marciales del Otro Mundo en honor a la muerte del Kaio del Norte (Kaito), donde participan guerreros poderosos.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146413/yispjokzfxukeotntxof.webp',
    races: JSON.stringify(['Kaio'])
  },
  {
    name: 'Nucleo del Mundo',
    description: 'El Núcleo del Mundo es el planeta nativo de toda la especie nucleica, del cual surgen los benévolos Kaio y Kaio-shin, así como los malévolos Makaio, Makaio-shin y Dioses Demoníacos en contrapartida.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145992/waomuzjcfz53ncny5sdo.webp',
    races: JSON.stringify(['Core Person'])
  },
  {
    name: 'Planeta sagrado',
    description: 'El Planeta Sagrado es el planeta localizado en el Reino Kaio-shin donde residen los Kaio-shin del Universo 7. No debe ser confundido con el Núcleo del Mundo.El Reino de los Kaio-shin, en el cual se encuentra localizado el planeta, es un reino especial completamente separado en el macrocosmos del Universo 7, es decir, está separado del Otro Mundo, del Mundo de los vivos y del Reino Demoníaco Oscuro.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146458/l9zvxxhxxeg1hjntexwx.webp',
    races: JSON.stringify(['Kaioshin'])
  },
  {
    name: 'Nuevo Planeta Tsufrui',
    description: 'El Nuevo Planeta Plant, también conocido como el Nuevo Planeta Tsufru, es el nombre que se le da al nuevo hogar de los Tsufruianos controlados por Vegeta Baby, ocasionado gracias al deseo concedido por medio de las Esferas del Dragón Definitivas de restaurar el Planeta Plant en la órbita de la Tierra.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146903/ttfkatsdjmahmhpmzrwv.webp',
    races: JSON.stringify(['Tuffle'])
  },
  {
    name: 'Templo móvil del Rey de Todo',
    description: 'El templo móvil del Rey de Todo (sala del trono), es como su nombre lo indica, un templo móvil en el cual reside los tronos de los dos Reyes de Todo en el Lugar de Supervivencia en Dragon Ball Super.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699142397/f2chnny1kxsvsrpl44y3.webp',
    races: JSON.stringify(['God'])
  },
  {
    name: 'Universo 11',
    description: 'El Universo 11, es, como su nombre lo indica, el undécimo de los doce universos existentes actualmente en el mundo de Dragon Ball. Este es gemelo del Universo 2 y el lugar de origen de las Tropas del Orgullo.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699151376/bavjiwcztgoixsek1ym1.webp',
    races: JSON.stringify(['Various'])
  }
];

const transformations: DbTransformation[] = [
  {
    name: 'Goku SSJ',
    ki: 3000000000, // 3 Billion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050838/x8vdjitiaygwbrbh3ps9.png',
    description: 'First Super Saiyan transformation achieved by Goku.',
    characters: JSON.stringify([1])
  },
  {
    name: 'Goku SSJ2',
    ki: 6000000000, // 6 Billion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050861/b4engvubliyprwpgdzns.png',
    description: 'Second level of Super Saiyan achieved by Goku.',
    characters: JSON.stringify([1])
  },
  {
    name: 'Goku SSJ3',
    ki: 24000000000, // 24 Billion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050875/kw8mf7q101rjjiir387d.png',
    description: 'Third level of Super Saiyan with extreme power drain.',
    characters: JSON.stringify([1])
  },
  {
    name: 'Goku SSJ4',
    ki: 2000000000000000, // 2 Quadrillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050888/iugojj27qfragm7rgum4.jpg',
    description: 'A powerful transformation that combines the power of a Great Ape with Super Saiyan.',
    characters: JSON.stringify([1])
  },
  {
    name: 'Goku SSJB',
    ki: 9000000000000000000, // 9 Quintillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050898/wfqyp1lornq8rpavfx04.png',
    description: 'Super Saiyan Blue, achieved through mastery of divine ki.',
    characters: JSON.stringify([1])
  },
  {
    name: 'Vegeta SSJ',
    ki: 330000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102175/dnbpmmovwjguohzx01lg.png',
    description: 'Vegeta\'s first Super Saiyan transformation.',
    characters: JSON.stringify([2])
  },
  {
    name: 'Vegeta SSJ2',
    ki: 24000000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102306/n3fixdteu9txlu3dddmc.png',
    description: 'Vegeta\'s mastery of the second Super Saiyan form.',
    characters: JSON.stringify([2])
  },
  {
    name: 'Vegeta SSJ4',
    ki: 1800000000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102363/cclvpjmuotw54t63xzgb.png',
    description: 'Vegeta\'s own version of SSJ4, achieved through Blutz Waves.',
    characters: JSON.stringify([2])
  },
  {
    name: 'Vegeta SSJB',
    ki: 100000000000000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102458/ran2samfpy6eerykx7xb.png',
    description: 'Vegeta\'s mastery of divine ki, matching Goku\'s power.',
    characters: JSON.stringify([2])
  },
  {
    name: 'Vegeta Mega Instinc Evil',
    ki: 19840000000000000000000000, // 19.84 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102556/tccogsakz8uwwpwz0otm.png',
    characters: JSON.stringify([2])
  },
  {
    name: 'Piccolo Super Namekian',
    ki: 2175000000, // 2.175 Billion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103067/yaqh8ucsnimqpcfvxxih.webp',
    characters: JSON.stringify([3])
  },
  {
    name: 'Piccolo Orange',
    ki: 41250000000000000, // 41.25 Quintillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103138/hjgmzwrquikst59vgl1h.png',
    characters: JSON.stringify([3])
  },
  {
    name: 'Freezer 2nd Form',
    ki: 1060000, // 1.060.000
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103384/nmxb4cjfjo5rfosxkxji.png',
    characters: JSON.stringify([5])
  },
  {
    name: 'Freezer 3rd Form',
    ki: 2120000, // 2.120.000
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103453/ff7gj92uqoaeixpcen5d.webp',
    characters: JSON.stringify([5])
  },
  {
    name: 'Freezer Perfect Form',
    ki: 60000000, // 60.000.000
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103535/ml30m64bnrbvfrsd0ulo.png',
    characters: JSON.stringify([5])
  },
  {
    name: 'Freezer Perfect Form (Golden)',
    ki: 100000000000000000, // 100 Quintillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103644/lqyq2xsuxlw635ez09tr.png',
    characters: JSON.stringify([5])
  },
  {
    name: 'Zarbon Monster',
    ki: 30,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115148/yqjsplbbeb2bq30cprbf.png',
    characters: JSON.stringify([6])
  },
  {
    name: 'Imperfect Form',
    ki: 370000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115356/hdx9lnwyh1uoiohwzrye.png',
    characters: JSON.stringify([9])
  },
  {
    name: 'Semi Perfect Form',
    ki: 897000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115417/ejtkaedhxk0tlxbvkwfa.webp',
    characters: JSON.stringify([9])
  },
  {
    name: 'Super Perfect Form',
    ki: 10970000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115577/amtizmras2gdswzw4pa6.png',
    characters: JSON.stringify([9])
  },
  {
    name: 'Gohan SSJ',
    ki: 4700000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115821/tqbqt5vqj30ce1ooiqsi.png',
    characters: JSON.stringify([10])
  },
  {
    name: 'Gohan SSJ2',
    ki: 10200000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115857/rllf9puo39dhhcxhh9e7.webp',
    characters: JSON.stringify([10])
  },
  {
    name: 'Gohan Ultimate',
    ki: 43000000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116154/zqcs85a5magvi9cjsvm6.webp',
    characters: JSON.stringify([10])
  },
  {
    name: 'Gohan Beast',
    ki: 25600000000000000000000, // 25.6 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116269/thotogohux1vogilpyas.png',
    characters: JSON.stringify([10])
  },
  {
    name: 'Trunks SSJ',
    ki: 905000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116809/ar639rlkzcqjmnlvmrq7.png',
    characters: JSON.stringify([16])
  },
  {
    name: 'Trunks SSJ2',
    ki: 18000000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116921/hbt3qrbu86zactkkfgm3.jpg',
    characters: JSON.stringify([16])
  },
  {
    name: 'Trunks SSJ3',
    ki: 1250000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117200/yswhfez5fdbteuyvghds.webp',
    characters: JSON.stringify([16])
  },
  {
    name: 'Trunks Rage',
    ki: 17500000000000000, // 17.5 Quintillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117449/pj6jix0qmbffmammeedo.png',
    characters: JSON.stringify([16])
  },
  {
    name: 'Gotenks SSJ',
    ki: 5700000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117748/ejdwijlhlfc8mhvb0fpn.png',
    characters: JSON.stringify([15])
  },
  {
    name: 'Gotenks SSJ3',
    ki: 45600000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117802/iasvpxc7urinhfwriwfn.webp',
    characters: JSON.stringify([15])
  },
  {
    name: 'Super Buu',
    ki: 5670000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699118823/dis9ipwwvohtfmy1peyu.webp',
    characters: JSON.stringify([32])
  },
  {
    name: 'Majin Buu (Gotenks)',
    ki: 12300000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699118971/pimtawxtqt8wtml5t8wk.png',
    characters: JSON.stringify([32])
  },
  {
    name: 'Majin Buu (Gohan)',
    ki: 14800000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119043/ajvq0rfmeqh5fstmmq2q.webp',
    characters: JSON.stringify([32])
  },
  {
    name: 'Majin Buu (Pure)',
    ki: 4000000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119236/tqbwgmghi4ir47xltk3z.png',
    characters: JSON.stringify([32])
  },
  {
    name: 'Gogeta SSJ',
    ki: 6300000000000000, // 6.3 sextillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119709/mevkuuaqnbwrm1beiorc.png',
    characters: JSON.stringify([65])
  },
  {
    name: 'Gogeta SSJ4',
    ki: 168000000000000, // 168 quadrillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119779/c6owx20373wbh3q9dynw.png',
    characters: JSON.stringify([65])
  },
  {
    name: 'Gogeta SSJB',
    ki: 12600000000000000000, // 12.6 septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119800/i4bebw9a4pw3yzk1rrmc.png',
    characters: JSON.stringify([65])
  },
  {
    name: 'Gogeta SSJB Evolved',
    ki: 1260000000000000000000, // 1.26 octillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119863/nc1bhpdpzspbd8yxnt97.png',
    characters: JSON.stringify([65])
  },
  {
    name: 'Vegetto SSJ',
    ki: 9000000000000, // 9 Trillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120073/wjpgltaxk350sl3lnxct.png',
    characters: JSON.stringify([66])
  },
  {
    name: 'Vegetto SSJB',
    ki: 10800000000000000000, // 10.8 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120135/z0gbiyenfmdemzf1vvxv.png',
    characters: JSON.stringify([66])
  },
  {
    name: 'Super Janemba',
    ki: 75000000000,
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120959/bo6n1qvcc1tzq2jyzyhq.webp',
    characters: JSON.stringify([67])
  },
  {
    name: 'Broly SSJ Legendary',
    ki: 11200000000000000000, // 11.2 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699121913/bwa20djt8ekpcydxm6lf.webp',
    characters: JSON.stringify([68])
  },
  {
    name: 'Goku Ultra Instinc',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123373/tmj6mkodjqbxlc6d3qfi.png',
    characters: JSON.stringify([1])
  },
  {
    name: 'Vegeta Ultra Instinct',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123456/vegeta_ultra_instinct.webp',
    characters: JSON.stringify([2])
  },
  {
    name: 'Gohan Ultra Instinct',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123534/gohan_ultra_instinct.webp',
    characters: JSON.stringify([10])
  },
  {
    name: 'Broly Full Power',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123612/broly_full_power.webp',
    characters: JSON.stringify([68])
  },
  {
    name: 'Cell Max',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123690/cell_max.webp',
    characters: JSON.stringify([9])
  },
  {
    name: 'Goku Black',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123770/goku_black.webp',
    characters: JSON.stringify([1])
  },
  {
    name: 'Vegeta Blue Evolved',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123850/vegeta_blue_evolved.webp',
    characters: JSON.stringify([2])
  },
  {
    name: 'Jiren',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123931/jiren.webp',
    characters: JSON.stringify([69])
  },
  {
    name: 'Toppo',
    ki: 90000000000000000000, // 90 Septillion
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699124012/toppo.webp',
    characters: JSON.stringify([70])
  },
  {
    name: 'Kefla',
    ki: '90.000.000.000',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044844/kefla.webp',
    affiliation: 'Pride Troopers',
    description: 'Kefla es la fusión de Caulifla y Kale mediante los pendientes Pothala, originaria del Universo 6. Es una de las Saiyajin más poderosas y participa en el Torneo del Poder, mostrando un poder abrumador y la capacidad de transformarse en Super Saiyan y Super Saiyan 2.',
    originPlanetId: 25
  },
  {
    name: 'Jiren',
    ki: '90.000.000.000',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044856/jiren.webp',
    affiliation: 'Pride Troopers',
    description: 'Jiren es el guerrero más fuerte del Universo 11 y miembro de las Tropas del Orgullo. Es conocido por su increíble fuerza, velocidad y resistencia, superando incluso a los dioses de la destrucción en combate. Participa en el Torneo del Poder y es uno de los rivales más formidables de Goku.',
    originPlanetId: 25
  },
  {
    name: 'Toppo',
    ki: '90.000.000.000',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044868/toppo.webp',
    affiliation: 'Pride Troopers',
    description: 'Toppo es el líder de las Tropas del Orgullo del Universo 11 y un candidato a Dios de la Destrucción. Es un luchador honorable y extremadamente poderoso, capaz de usar la energía de la destrucción en combate.',
    originPlanetId: 25
  },
  {
    name: 'Dyspo',
    ki: '50 Trillion',
    maxKi: '150 Quintillion',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048034/kquxnkdxfkmnzkw0kiku.webp',
    affiliation: 'Pride Troopers',
    description: 'Dyspo es uno de los miembros del Equipo Universo 11 como uno de los soldados más poderosos de las Tropas del Orgullo junto con Jiren y su líder Toppo.',
    originPlanetId: 25
  },
  {
    name: 'Marcarita',
    ki: '10 septillion',
    maxKi: '99.5 septillion',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048057/x2mldjzrnvwymvpavmud.webp',
    affiliation: 'Assistant of Vermoud',
    description: 'Marcarita es el ángel guía del Universo 11, sirviente y maestra de artes marciales del Dios de la Destrucción Vermoud. Es un personaje de la Arco de la Supervivencia Universal de Dragon Ball Super.',
    originPlanetId: 25
  },
  {
    name: 'Vermoudh',
    ki: '9.9 Septillion',
    maxKi: '100 septillion',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048136/woen6ahkou5lq2xbqwub.webp',
    affiliation: 'Pride Troopers',
    description: 'Vermoudh es el Dios de la Destrucción del Universo 11. Es un personaje excéntrico y poderoso, responsable de mantener el equilibrio en su universo.',
    originPlanetId: 25
  },
  {
    name: 'Zeno',
    ki: '500 Septillion',
    maxKi: '500 Septillion',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047629/bmikekmvwebqlebcr1e2.webp',
    affiliation: 'Other',
    description: 'Zeno es el Rey de Todo, la deidad suprema que gobierna todos los universos en Dragon Ball. Tiene la capacidad de borrar universos enteros con un simple gesto.',
    originPlanetId: 0
  },
  {
    name: 'Goku Jr.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044676/goku_jr.webp',
    ki: '1.000.000',
    maxKi: '1.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Goku Jr. es un personaje de la serie Dragon Ball GT, que aparece como el bisnieto de Goku. Es un niño guerrero que, al igual que su antepasado, muestra un gran potencial y habilidades de combate desde una edad temprana. Goku Jr. es uno de los pocos personajes que puede transformarse en Super Saiyan 4, y juega un papel clave en la derrota de Baby, el principal antagonista de la serie.',
    originPlanetId: 2
  },
  {
    name: 'Vegeta Jr.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044688/vegeta_jr.webp',
    ki: '1.000.000',
    maxKi: '1.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Vegeta Jr. es un personaje de la serie Dragon Ball GT, que aparece como el bisnieto de Vegeta. Es un niño guerrero que, al igual que su antepasado, muestra un gran potencial y habilidades de combate desde una edad temprana. Vegeta Jr. es uno de los pocos personajes que puede transformarse en Super Saiyan 4, y juega un papel clave en la derrota de Baby, el principal antagonista de la serie.',
    originPlanetId: 2
  },
  {
    name: 'Pan',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044700/pan.webp',
    ki: '500.000',
    maxKi: '500.000',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Pan es un personaje de la serie Dragon Ball GT, que aparece como la hija de Goku Jr. y Vegeta Jr. Es una niña guerrera que muestra un gran potencial y habilidades de combate desde una edad muy temprana. Pan es uno de los pocos personajes que puede transformarse en Super Saiyan 4, y juega un papel clave en la derrota de Baby, el principal antagonista de la serie.',
    originPlanetId: 2
  },
  {
    name: 'Uub',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044712/uub.webp',
    ki: '1.000.000',
    maxKi: '1.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Uub es un personaje de la serie Dragon Ball Z, que aparece como el hijo de Mr. Satan y un gran admirador de Goku. Es un niño guerrero que muestra un gran potencial y habilidades de combate desde una edad temprana. Uub es el reencarnación humana de Kid Buu, el villano final de Dragon Ball Z, y tiene la capacidad de transformarse en un poderoso guerrero con habilidades mágicas. Es finalmente entrenado por Goku como su discípulo.',
    originPlanetId: 2
  },
  {
    name: 'Mr. Satan',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044724/mr_satan.webp',
    ki: '0',
    maxKi: '0',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Mr. Satan, también conocido como Hercule Satan, es un personaje de la serie Dragon Ball Z, que aparece como el campeón de las Artes Marciales de la Tierra y un gran amigo de Goku. Aunque al principio es retratado como un personaje cómico y algo cobarde, Mr. Satan demuestra ser un aliado valioso y un héroe en varias ocasiones. Es el padre de Pan y el abuelo de Goku Jr.',
    originPlanetId: 2
  },
  {
    name: 'Chi-Chi',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044736/chi_chi.webp',
    ki: '0',
    maxKi: '0',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Chi-Chi es un personaje de la serie Dragon Ball, que aparece como la esposa de Goku y la madre de Gohan y Goten. Es una mujer fuerte y decidida, que a menudo muestra una gran preocupación por la seguridad de su familia. Chi-Chi es también una guerrera formidable, con habilidades de combate y técnicas de artes marciales. A pesar de su temperamento a veces explosivo, es un personaje muy querido en la serie.',
    originPlanetId: 2
  },
  {
    name: 'Bulma (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044748/bulma_future.webp',
    ki: '0',
    maxKi: '0',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Bulma (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Bulma. Es una científica brillante y una guerrera valiente, que juega un papel clave en la lucha contra los villanos en el futuro. Bulma (Future) es responsable de la creación de varios dispositivos y armas avanzadas, que son cruciales para la derrota de los enemigos. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Trunks (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044760/trunks_future.webp',
    ki: '1.500.000',
    maxKi: '400.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Trunks (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Trunks. Es un guerrero valiente y decidido, que juega un papel importante en la lucha contra los villanos en el futuro. Trunks (Future) es uno de los pocos personajes que puede transformarse en Super Saiyan 2, y es conocido por su espada y su cabello púrpura. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Goten (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044772/goten_future.webp',
    ki: '1.000.000',
    maxKi: '200.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Goten (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Goten. Es un niño guerrero que, al igual que su hermano mayor Trunks, muestra un gran potencial y habilidades de combate desde una edad temprana. Goten (Future) es uno de los pocos personajes que puede transformarse en Super Saiyan 2, y juega un papel clave en la lucha contra los villanos en el futuro. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Pan (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044784/pan_future.webp',
    ki: '500.000',
    maxKi: '500.000',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Pan (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Pan. Es una niña guerrera que muestra un gran potencial y habilidades de combate desde una edad muy temprana. Pan (Future) es uno de los pocos personajes que puede transformarse en Super Saiyan 2, y juega un papel clave en la lucha contra los villanos en el futuro. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Bardock (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044796/bardock_future.webp',
    ki: '10.000.000',
    maxKi: '10.000.000',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Hero',
    description: 'Bardock (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Bardock. Es un guerrero Saiyan de gran poder y el líder de un escuadrón de élite de Saiyans en el futuro. Bardock (Future) es conocido por su valentía y su deseo de proteger a su pueblo de la destrucción. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 3
  },
  {
    name: 'Raditz (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044808/raditz_future.webp',
    ki: '5.000.000',
    maxKi: '5.000.000',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Raditz (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Raditz. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Raditz (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Raditz original.',
    originPlanetId: 3
  },
  {
    name: 'Broly (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044820/broly_future.webp',
    ki: '500.000.000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Broly (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Broly. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Broly (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Broly original.',
    originPlanetId: 3
  },
  {
    name: 'Cell Max (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044832/cell_max_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Android',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Cell Max (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Cell Max. Es un bioandroide creado a partir de las células de los guerreros más poderosos del universo, incluyendo a Goku, Vegeta, Piccolo y Freezer. Cell Max (Future) tiene la capacidad de transformarse en varias formas, cada una más poderosa que la anterior, y de absorber a otros seres para aumentar su poder. Es finalmente derrotado por Gohan en su forma de Super Saiyan 2.',
    originPlanetId: 2
  },
  {
    name: 'Goku Black (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044844/goku_black_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Goku Black (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Goku Black. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Goku Black (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Goku Black original.',
    originPlanetId: 2
  },
  {
    name: 'Vegeta Blue Evolved (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044856/vegeta_blue_evolved_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Vegeta Blue Evolved (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Vegeta Blue Evolved. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Vegeta Blue Evolved (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Vegeta Blue Evolved original.',
    originPlanetId: 2
  },
  {
    name: 'Jiren (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044868/jiren_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Alien',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Jiren (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Jiren. Es un guerrero alienígena de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Jiren (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Jiren original.',
    originPlanetId: 2
  },
  {
    name: 'Toppo (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044880/toppo_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Alien',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Toppo (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Toppo. Es un guerrero alienígena de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Toppo (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Toppo original.',
    originPlanetId: 2
  },
  {
    name: 'Kefla (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044892/kefla_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Female',
    affiliation: 'Villain',
    description: 'Kefla (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Kefla. Es una guerrera Saiyan de gran poder, que ha sido corrompida por el odio y el deseo de venganza. Kefla (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Kefla original.',
    originPlanetId: 2
  }
];

const characters: DbCharacter[] = [
  {
    name: 'Goku',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044374/hlpy6q013uw3itl5jzic.webp',
    ki: '60.000.000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'El protagonista de la serie, conocido por su gran poder y personalidad amigable. Originalmente enviado a la Tierra como un infante volador con la misión de conquistarla. Sin embargo, el caer por un barranco le proporcionó un brutal golpe que si bien casi lo mata, este alteró su memoria y anuló todos los instintos violentos de su especie, lo que lo hizo crecer con un corazón puro y bondadoso, pero conservando todos los poderes de su raza. No obstante, en la nueva continuidad de Dragon Ball se establece que él fue enviado por sus padres a la Tierra con el objetivo de sobrevivir a toda costa a la destrucción de su planeta por parte de Freeza. Más tarde, Kakarot, ahora conocido como Son Goku, se convertiría en el príncipe consorte del monte Fry-pan y líder de los Guerreros Z, así como el mayor defensor de la Tierra y del Universo 7, logrando mantenerlos a salvo de la destrucción en innumerables ocasiones, a pesar de no considerarse a sí mismo como un héroe o salvador.',
    originPlanetId: 2
  },
  {
    name: 'Vegeta',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044422/i9hpfjplth6gjudvhsx3.webp',
    ki: '54.000.000',
    maxKi: '19.84 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Príncipe de los Saiyans, inicialmente un villano, pero luego se une a los Z Fighters. A pesar de que a inicios de Dragon Ball Z, Vegeta cumple un papel antagónico, poco después decide rebelarse ante el Imperio de Freeza, volviéndose un aliado clave para los Guerreros Z. Con el paso del tiempo llegaría a cambiar su manera de ser, optando por permanecer y vivir en la Tierra para luchar a su lado contra las inminentes adversidades que superar. Junto con Piccolo, él es de los antiguos enemigos de Goku que ha evolucionando al pasar de ser un villano y antihéroe, a finalmente un héroe a lo largo del transcurso de la historia, convirtiéndose así en el deuteragonista de la serie.',
    originPlanetId: 3
  },
  {
    name: 'Piccolo',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044481/u9fhpc9smihu2kud3cuc.webp',
    ki: '2.000.000',
    maxKi: '500.000.000',
    race: 'Namekian',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Es un namekiano que surgió tras ser creado en los últimos momentos de vida de su padre, siendo su actual reencarnación. Aunque en un principio fue el archienemigo de Son Goku, con el paso del tiempo fue haciéndose menos malvado hasta finalmente convertirse en un ser bondadoso y miembro de los Guerreros Z. A través del tiempo, también comenzó a tomarle cariño a su discípulo Son Gohan, a quien veía como una especie de "vástago" y formando un lazo de amistad con este.',
    originPlanetId: 1
  },
  {
    name: 'Bulma',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044496/bifhe9qarbrgvm0tsiru.webp',
    ki: '0',
    maxKi: '0',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Bulma es la protagonista femenina de la serie manga Dragon Ball y sus adaptaciones al anime Dragon Ball, Dragon Ball Z, Dragon Ball Super y Dragon Ball GT. Es hija del Dr. Brief y su esposa Panchy, hermana menor de Tights y una gran amiga de Son Goku con quien inicia la búsqueda de las Esferas del Dragón. En Dragon Ball Z tuvo a Trunks, primogénito de quien sería su esposo Vegeta, a su hija Bra[3] y su hijo adulto del tiempo alterno Trunks del Futuro Alternativo.',
    originPlanetId: 2
  },
  {
    name: 'Krillin',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044508/krillin.webp',
    ki: '2.500.000',
    maxKi: '2.500.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Krillin es un personaje de la serie Dragon Ball. Es un amigo cercano de Goku y uno de los pocos personajes humanos que puede mantenerse al día con los guerreros saiyans en términos de poder y habilidades de combate. A lo largo de la serie, Krillin se convierte en un guerrero formidable por derecho propio, aunque a menudo se le considera el "más débil" de los Guerreros Z debido a su humanidad.',
    originPlanetId: 2
  },
  {
    name: 'Gohan',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044520/gohan.webp',
    ki: '1.500.000',
    maxKi: '400.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Gohan es el hijo de Goku y Chi-Chi, y el hermano menor de Goten. Es un personaje clave en la serie Dragon Ball, especialmente durante la Saga de Cell, donde alcanza su forma de Super Saiyan 2 y juega un papel crucial en la derrota de Cell. A lo largo de la serie, Gohan pasa de ser un niño tímido y asustadizo a un guerrero poderoso y decidido, aunque a menudo prefiere evitar pelear y llevar una vida pacífica.',
    originPlanetId: 2
  },
  {
    name: 'Goten',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044532/goten.webp',
    ki: '1.000.000',
    maxKi: '200.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Goten es el segundo hijo de Goku y Chi-Chi, y el hermano menor de Gohan. Es un niño guerrero que, al igual que su hermano mayor, muestra un gran potencial y habilidades de combate desde una edad temprana. Goten se convierte en Super Saiyan a una edad muy joven, y junto con su amigo Trunks, forma la fusión de Gotenks, que es una de las fusiones más poderosas de la serie.',
    originPlanetId: 2
  },
  {
    name: 'Trunks',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044544/trunks.webp',
    ki: '1.200.000',
    maxKi: '250.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Trunks es el hijo de Vegeta y Bulma, y el hermano menor de Bra. Es un guerrero valiente y decidido que juega un papel importante en la serie Dragon Ball, especialmente durante la Saga de Cell y la Saga de Majin Buu. Trunks es conocido por su cabello púrpura y su espada, y es uno de los pocos personajes que puede transformar en Super Saiyan 2. También es uno de los personajes principales en la película Dragon Ball Z: La Batalla de los Dioses, donde ayuda a derrotar a Bills, el Dios de la Destrucción.',
    originPlanetId: 2
  },
  {
    name: 'Piccolo Daimaoh',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044556/piccolo_daimaoh.webp',
    ki: '500.000',
    maxKi: '500.000',
    race: 'Namekian',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Piccolo Daimaoh, también conocido como el Rey Demonio Piccolo, es uno de los villanos más poderosos y malvados de la serie Dragon Ball. Es la forma original y malvada de Piccolo, antes de fusionarse con Kami y volverse bueno. Piccolo Daimaoh es responsable de la creación de varios de los villanos en la serie, incluyendo a Piccolo Jr. y a los guerreros demoníacos. Tiene la capacidad de regenerar su cuerpo y de aumentar su poder a través de la absorción de otros seres.',
    originPlanetId: 1
  },
  {
    name: 'Demonio del Dragón',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044568/demonio_del_dragon.webp',
    ki: '750.000',
    maxKi: '750.000',
    race: 'Demon',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'El Demonio del Dragón es una de las primeras amenazas a las que se enfrenta Goku en la serie Dragon Ball. Es un ser demoníaco que puede cambiar de forma y que tiene la capacidad de absorber la energía vital de otros seres. El Demonio del Dragón es responsable de la muerte de varios personajes en la serie, incluyendo a Krillin. Es finalmente derrotado por Goku con la ayuda de las Esferas del Dragón.',
    originPlanetId: 2
  },
  {
    name: 'Garlic Jr.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044580/garlic_jr.webp',
    ki: '1.000.000',
    maxKi: '1.000.000',
    race: 'Makyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Garlic Jr. es un villano de la serie Dragon Ball Z, que aparece como el principal antagonista en la película Dragon Ball Z: El árbol del poder. Es un antiguo enemigo de Goku y un poderoso guerrero que busca venganza contra los Saiyans por la destrucción de su planeta. Garlic Jr. tiene la capacidad de transformarse en un monstruo gigante y de absorber la energía vital de otros seres. Es finalmente derrotado por Goku y Vegeta.',
    originPlanetId: 8
  },
  {
    name: 'Nappa',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044592/nappa.webp',
    ki: '4.000.000',
    maxKi: '4.000.000',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Nappa es un villano de la serie Dragon Ball Z, que aparece como uno de los principales antagonistas durante la Saga de los Saiyans. Es un guerrero Saiyan de gran poder y el compañero de Vegeta. Nappa es responsable de la destrucción del Planeta Namek y de la muerte de varios personajes en la serie. Es finalmente derrotado por Goku y los Guerreros Z.',
    originPlanetId: 3
  },
  {
    name: 'Raditz',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044604/raditz.webp',
    ki: '5.000.000',
    maxKi: '5.000.000',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Raditz es un villano de la serie Dragon Ball Z, que aparece como el principal antagonista en la Saga de los Saiyans. Es el hermano mayor de Goku y uno de los guerreros más poderosos de los Saiyans. Raditz llega a la Tierra con la intención de reclutar a Goku para conquistar planetas, pero se convierte en un enemigo después de que Goku se niega. Es finalmente derrotado por Goku y Piccolo.',
    originPlanetId: 3
  },
  {
    name: 'Bardock',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044616/bardock.webp',
    ki: '10.000.000',
    maxKi: '10.000.000',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Hero',
    description: 'Bardock es un personaje de la serie Dragon Ball, que aparece como el padre de Goku y Raditz. Es un guerrero Saiyan de gran poder y el líder de un escuadrón de élite de Saiyans. Bardock es conocido por su valentía y su deseo de proteger a su pueblo de la destrucción. Es finalmente asesinado por Freezer, pero no antes de enviar a su hijo Goku a la Tierra para salvarlo de la destrucción del Planeta Vegeta.',
    originPlanetId: 3
  },
  {
    name: 'Freezer',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044628/freezer.webp',
    ki: '120.000.000',
    maxKi: '100 Quintillion',
    race: 'Alien',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Freezer es uno de los villanos más poderosos y temidos de la serie Dragon Ball. Es el emperador del universo y el líder del Imperio de Freezer. Freezer es responsable de la destrucción del Planeta Vegeta y de la muerte de muchos personajes en la serie. Tiene la capacidad de transformarse en varias formas, cada una más poderosa que la anterior. Freezer es finalmente derrotado por Goku en su forma de Super Saiyan.',
    originPlanetId: 4
  },
  {
    name: 'Cell',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044640/cell.webp',
    ki: '150.000.000',
    maxKi: '90 Septillion',
    race: 'Android',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Cell es uno de los villanos más poderosos de la serie Dragon Ball Z. Es un bioandroide creado a partir de las células de los guerreros más poderosos del universo, incluyendo a Goku, Vegeta, Piccolo y Freezer. Cell tiene la capacidad de transformarse en varias formas, cada una más poderosa que la anterior, y de absorber a otros seres para aumentar su poder. Es finalmente derrotado por Gohan en su forma de Super Saiyan 2.',
    originPlanetId: 2
  },
  {
    name: 'Majin Buu',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044652/majin_buu.webp',
    ki: '300.000.000',
    maxKi: '90 Septillion',
    race: 'Majin',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Majin Buu es uno de los villanos más poderosos y antiguos de la serie Dragon Ball. Es un ser mágico creado por el hechicero Bibidi, y tiene la capacidad de destruir planetas enteros con su poder. Majin Buu puede transformarse en varias formas, cada una con diferentes habilidades y niveles de poder. Es finalmente derrotado por Goku y Vegeta en su forma de Super Buu.',
    originPlanetId: 2
  },
  {
    name: 'Broly',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044664/broly.webp',
    ki: '500.000.000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Broly es uno de los villanos más poderosos de la serie Dragon Ball, que aparece como el principal antagonista en la película Dragon Ball Z: Broly - El legendario Super Saiyan. Es un guerrero Saiyan de gran poder, que fue exiliado a un planeta lejano por su propio padre. Broly tiene la capacidad de transformarse en un monstruo gigante y de aumentar su poder a través de la ira y el odio. Es finalmente derrotado por Goku, Vegeta y Piccolo.',
    originPlanetId: 3
  },
  {
    name: 'Goku Jr.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044676/goku_jr.webp',
    ki: '1.000.000',
    maxKi: '1.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Goku Jr. es un personaje de la serie Dragon Ball GT, que aparece como el bisnieto de Goku. Es un niño guerrero que, al igual que su antepasado, muestra un gran potencial y habilidades de combate desde una edad temprana. Goku Jr. es uno de los pocos personajes que puede transformarse en Super Saiyan 4, y juega un papel clave en la derrota de Baby, el principal antagonista de la serie.',
    originPlanetId: 2
  },
  {
    name: 'Vegeta Jr.',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044688/vegeta_jr.webp',
    ki: '1.000.000',
    maxKi: '1.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Vegeta Jr. es un personaje de la serie Dragon Ball GT, que aparece como el bisnieto de Vegeta. Es un niño guerrero que, al igual que su antepasado, muestra un gran potencial y habilidades de combate desde una edad temprana. Vegeta Jr. es uno de los pocos personajes que puede transformarse en Super Saiyan 4, y juega un papel clave en la derrota de Baby, el principal antagonista de la serie.',
    originPlanetId: 2
  },
  {
    name: 'Pan',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044700/pan.webp',
    ki: '500.000',
    maxKi: '500.000',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Pan es un personaje de la serie Dragon Ball GT, que aparece como la hija de Goku Jr. y Vegeta Jr. Es una niña guerrera que muestra un gran potencial y habilidades de combate desde una edad muy temprana. Pan es uno de los pocos personajes que puede transformarse en Super Saiyan 4, y juega un papel clave en la derrota de Baby, el principal antagonista de la serie.',
    originPlanetId: 2
  },
  {
    name: 'Uub',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044712/uub.webp',
    ki: '1.000.000',
    maxKi: '1.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Uub es un personaje de la serie Dragon Ball Z, que aparece como el hijo de Mr. Satan y un gran admirador de Goku. Es un niño guerrero que muestra un gran potencial y habilidades de combate desde una edad temprana. Uub es el reencarnación humana de Kid Buu, el villano final de Dragon Ball Z, y tiene la capacidad de transformarse en un poderoso guerrero con habilidades mágicas. Es finalmente entrenado por Goku como su discípulo.',
    originPlanetId: 2
  },
  {
    name: 'Mr. Satan',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044724/mr_satan.webp',
    ki: '0',
    maxKi: '0',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Mr. Satan, también conocido como Hercule Satan, es un personaje de la serie Dragon Ball Z, que aparece como el campeón de las Artes Marciales de la Tierra y un gran amigo de Goku. Aunque al principio es retratado como un personaje cómico y algo cobarde, Mr. Satan demuestra ser un aliado valioso y un héroe en varias ocasiones. Es el padre de Pan y el abuelo de Goku Jr.',
    originPlanetId: 2
  },
  {
    name: 'Chi-Chi',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044736/chi_chi.webp',
    ki: '0',
    maxKi: '0',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Chi-Chi es un personaje de la serie Dragon Ball, que aparece como la esposa de Goku y la madre de Gohan y Goten. Es una mujer fuerte y decidida, que a menudo muestra una gran preocupación por la seguridad de su familia. Chi-Chi es también una guerrera formidable, con habilidades de combate y técnicas de artes marciales. A pesar de su temperamento a veces explosivo, es un personaje muy querido en la serie.',
    originPlanetId: 2
  },
  {
    name: 'Bulma (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044748/bulma_future.webp',
    ki: '0',
    maxKi: '0',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Bulma (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Bulma. Es una científica brillante y una guerrera valiente, que juega un papel clave en la lucha contra los villanos en el futuro. Bulma (Future) es responsable de la creación de varios dispositivos y armas avanzadas, que son cruciales para la derrota de los enemigos. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Trunks (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044760/trunks_future.webp',
    ki: '1.500.000',
    maxKi: '400.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Trunks (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Trunks. Es un guerrero valiente y decidido, que juega un papel importante en la lucha contra los villanos en el futuro. Trunks (Future) es uno de los pocos personajes que puede transformarse en Super Saiyan 2, y es conocido por su espada y su cabello púrpura. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Goten (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044772/goten_future.webp',
    ki: '1.000.000',
    maxKi: '200.000.000',
    race: 'Human',
    gender: 'Male',
    affiliation: 'Z Fighter',
    description: 'Goten (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Goten. Es un niño guerrero que, al igual que su hermano mayor Trunks, muestra un gran potencial y habilidades de combate desde una edad temprana. Goten (Future) es uno de los pocos personajes que puede transformarse en Super Saiyan 2, y juega un papel clave en la lucha contra los villanos en el futuro. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Pan (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044784/pan_future.webp',
    ki: '500.000',
    maxKi: '500.000',
    race: 'Human',
    gender: 'Female',
    affiliation: 'Z Fighter',
    description: 'Pan (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Pan. Es una niña guerrera que muestra un gran potencial y habilidades de combate desde una edad muy temprana. Pan (Future) es uno de los pocos personajes que puede transformarse en Super Saiyan 2, y juega un papel clave en la lucha contra los villanos en el futuro. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 2
  },
  {
    name: 'Bardock (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044796/bardock_future.webp',
    ki: '10.000.000',
    maxKi: '10.000.000',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Hero',
    description: 'Bardock (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Bardock. Es un guerrero Saiyan de gran poder y el líder de un escuadrón de élite de Saiyans en el futuro. Bardock (Future) es conocido por su valentía y su deseo de proteger a su pueblo de la destrucción. A pesar de las dificultades y tragedias que enfrenta en su futuro, sigue siendo un personaje optimista y decidido.',
    originPlanetId: 3
  },
  {
    name: 'Raditz (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044808/raditz_future.webp',
    ki: '5.000.000',
    maxKi: '5.000.000',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Raditz (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Raditz. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Raditz (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Raditz original.',
    originPlanetId: 3
  },
  {
    name: 'Broly (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044820/broly_future.webp',
    ki: '500.000.000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Broly (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Broly. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Broly (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Broly original.',
    originPlanetId: 3
  },
  {
    name: 'Cell Max (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044832/cell_max_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Android',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Cell Max (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Cell Max. Es un bioandroide creado a partir de las células de los guerreros más poderosos del universo, incluyendo a Goku, Vegeta, Piccolo y Freezer. Cell Max (Future) tiene la capacidad de transformarse en varias formas, cada una más poderosa que la anterior, y de absorber a otros seres para aumentar su poder. Es finalmente derrotado por Gohan en su forma de Super Saiyan 2.',
    originPlanetId: 2
  },
  {
    name: 'Goku Black (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044844/goku_black_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Goku Black (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Goku Black. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Goku Black (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Goku Black original.',
    originPlanetId: 2
  },
  {
    name: 'Vegeta Blue Evolved (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044856/vegeta_blue_evolved_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Vegeta Blue Evolved (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Vegeta Blue Evolved. Es un guerrero Saiyan de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Vegeta Blue Evolved (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Vegeta Blue Evolved original.',
    originPlanetId: 2
  },
  {
    name: 'Jiren (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044868/jiren_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Alien',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Jiren (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Jiren. Es un guerrero alienígena de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Jiren (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Jiren original.',
    originPlanetId: 2
  },
  {
    name: 'Toppo (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044880/toppo_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Alien',
    gender: 'Male',
    affiliation: 'Villain',
    description: 'Toppo (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Toppo. Es un guerrero alienígena de gran poder, que ha sido corrompido por el odio y el deseo de venganza. Toppo (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Toppo original.',
    originPlanetId: 2
  },
  {
    name: 'Kefla (Future)',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044892/kefla_future.webp',
    ki: '90000000000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Female',
    affiliation: 'Villain',
    description: 'Kefla (Future) es un personaje de la serie Dragon Ball, que aparece como la versión del futuro de Kefla. Es una guerrera Saiyan de gran poder, que ha sido corrompida por el odio y el deseo de venganza. Kefla (Future) es uno de los principales antagonistas en el futuro, y es responsable de la muerte de muchos personajes. A pesar de su maldad, todavía muestra destellos de la bondad que tenía como Kefla original.',
    originPlanetId: 2
  }
];