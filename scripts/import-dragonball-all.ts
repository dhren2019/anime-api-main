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

  const existingPlanets = await db.select({ id: dragonballPlanetTable.id }).from(dragonballPlanetTable);
  const planetIds = new Set(existingPlanets.map((planet) => planet.id));

  for (const character of characters) {
    if (!character.originPlanetId || !planetIds.has(character.originPlanetId)) {
      console.error(`❌ Error: El planeta con ID ${character.originPlanetId} no existe en la tabla dragonball_planet.`);
      continue;
    }

    await db.insert(apiDragonballTable).values({
      name: character.name,
      image: transformLocalImagePath(character.image, 'characters'),
      ki: Number(character.ki),
      maxKi: Number(character.maxKi),
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
    name: "Goku",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044374/hlpy6q013uw3itl5jzic.webp",
    ki: "60.000.000",
    maxKi: "90 Septillion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "El protagonista de la serie, conocido por su gran poder y personalidad amigable...",
    originPlanetId: 2
  },
  {
    name: "Vegeta",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044422/i9hpfjplth6gjudvhsx3.webp",
    ki: "54.000.000",
    maxKi: "19.84 Septillion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Príncipe de los Saiyans, inicialmente un villano, pero luego se une a los Z Fighters...",
    originPlanetId: 3
  },
  {
    name: "Piccolo",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044481/u9fhpc9smihu2kud3cuc.webp",
    ki: "2.000.000",
    maxKi: "500.000.000",
    race: "Namekian",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Es un namekiano que surgió tras ser creado en los últimos momentos de vida de su padre...",
    originPlanetId: 1
  },
  {
    name: "Bulma",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044496/bifhe9qarbrgvm0tsiru.webp",
    ki: "0",
    maxKi: "0",
    race: "Human",
    gender: "Female",
    affiliation: "Z Fighter",
    description: "Bulma es la protagonista femenina de la serie manga Dragon Ball y sus adaptaciones al anime...",
    originPlanetId: 2
  },
  {
    name: "Freezer",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044513/ux3n5u0tjdvysjao4w8s.webp",
    ki: 530,
    maxKi: "52.71 Septillion",
    race: "Frieza Race",
    gender: "Male",
    affiliation: "Army of Frieza",
    description: "Freezer es el tirano espacial y el principal antagonista de la saga de Freezer.",
    originPlanetId: 4
  },
  {
    name: "Zarbon",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044531/jcdgte2shoaj2jh0ruob.webp",
    ki: 20,
    maxKi: 30,
    race: "Frieza Race",
    gender: "Male",
    affiliation: "Army of Frieza",
    description: "Zarbon es uno de los secuaces de Freezer y un luchador poderoso.",
    originPlanetId: 4
  },
  {
    name: "Dodoria",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044548/m2mixyphepp8qwcigb3g.webp",
    ki: 18,
    maxKi: 20,
    race: "Frieza Race",
    gender: "Male",
    affiliation: "Army of Frieza",
    description: "Dodoria es otro secuaz de Freezer conocido por su brutalidad.",
    originPlanetId: 4
  },
  {
    name: "Ginyu",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699129673/dxsl3rjhrfmajo2gealz.webp",
    ki: 9,
    maxKi: 25,
    race: "Frieza Race",
    gender: "Male",
    affiliation: "Army of Frieza",
    description: "Ginyu es el líder del la élite de mercenarios de mayor prestigio del Ejército de Freeza...",
    originPlanetId: 4
  },
  {
    name: "Celula",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044573/mz09ghskyzf0skprredi.webp",
    ki: "250.000.000",
    maxKi: "5 Billion",
    race: "Android",
    gender: "Male",
    affiliation: "Freelancer",
    description: "Cell conocido como Célula en España, es un bioandroide creado por la computadora del Dr. Gero...",
    originPlanetId: 2
  },
  {
    name: "Gohan",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044627/kigekwjt2m8nwopgvabv.webp",
    ki: "45.000.000",
    maxKi: "40 septillion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Son Gohanda en su tiempo en España, o simplemente Gohan en Hispanoamérica, es uno de los personajes principales...",
    originPlanetId: 2
  },
  {
    name: "Krillin",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046768/ay2b4ps6xc5i4uhcxoio.webp",
    ki: "1.000.000",
    maxKi: "1 Billion",
    race: "Human",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Amigo cercano de Goku y guerrero valiente, es un personaje del manga y anime de Dragon Ball...",
    originPlanetId: 2
  },
  {
    name: "Tenshinhan",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046784/umcprk7ugb5q8cb9uhrh.webp",
    ki: "2.400.000",
    maxKi: "80.000.000",
    race: "Human",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Maestro de las artes marciales y miembro de los Z Fighters...",
    originPlanetId: 2
  },
  {
    name: "Yamcha",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047468/euprvykftdyup1uw6z4p.webp",
    ki: "1.980.000",
    maxKi: "4.000.000",
    race: "Human",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Luchador que solía ser un bandido del desierto.",
    originPlanetId: 2
  },
{
   name: "Chi-Chi",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046815/rizrttygnvfwv4gntrkw.webp",
    ki: 0,
    maxKi: 0,
    race: "Human",
    gender: "Female",
    affiliation: "Z Fighter",
    description: "Esposa de Goku y madre de Gohan. Es la princesa del Monte Fry-pan siendo la hija de la fallecida reina de esta montaña y el Rey Gyuma, ella terminaría conociendo a Son Goku cuando era tan solo una niña para años más tarde durante su adolescencia ser su esposa y convertirse en la estricta pero amorosa madre de Gohan y Goten.",
    originPlanetId: 2
  },
  {
    name: "Gotenks",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046837/sfc007ookoxjac1j0mkl.webp",
    ki: "65.600.000",
    maxKi: "34.8 Billion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Gotenks también conocido inicialmente como Gotrunk en el doblaje al español de España, es el resultado de la Danza de la Fusión llevada a cabo correctamente por Goten y Trunks.",
    originPlanetId: 2
  },
  {
    name: "Trunks",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046959/qmzg7t9u7nhmsqlpt83o.webp",
    ki: "50.000.000",
    maxKi: "37.4 septllion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Hijo de Vegeta y Bulma. Es un mestizo entre humano terrícola y Saiyano nacido en la Tierra, e hijo de Bulma y Vegeta, el cual es introducido en el Arco de los Androides y Cell. Más tarde en su vida como joven, se termina convirtiendo en un luchador de artes marciales, el mejor amigo de Son Goten y en el hermano mayor de su hermana Bra.",
    originPlanetId: 2
  },
  {
    name: "Master Roshi",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046999/smcckhzeoa806ovrciti.webp",
    ki: 500,
    maxKi: "350.000.000",
    race: "Human",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Maestro de artes marciales y mentor de Goku. Conocido bajo el nombre de Muten Rosh, fue en su momento el terrícola más fuerte de la Tierra, y mucha gente lo recuerda como el \"Dios de las Artes Marciales\", pero antes de poder ostentar dicho título tuvo que trabajar y estudiar las artes marciales con su maestro Mutaito y su eterno rival Tsuru-Sen'nin.",
    originPlanetId: 2
  },
  {
    name: "Bardock",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047021/yspsolmpraytim3uph9j.webp",
    ki: 450,
    maxKi: "180.000.000",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Es un saiyano de clase baja proveniente del Planeta Vegeta del Universo 7. Pertenece al Ejército Saiyano, que está bajo el liderazgo del Rey Vegeta, y es jefe de su escuadrón durante la anexión del planeta por parte de las fuerzas coloniales del Imperio de Freeza. Él es el esposo de Gine y padre biológico de Kakarotto y Raditz.",
    originPlanetId: 3
  },
  {
    name: "Launch",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047046/jof8lbpjtggkbwiztiu0.webp",
    ki: 0,
    maxKi: 0,
    race: "Human",
    gender: "Female",
    affiliation: "Z Fighter",
    description: "Personaje que sufre cambios de personalidad al estornudar. Es uno de los personajes principales del manga Dragon Ball y su anime homónimo; Lunch es una chica que sufre de un trastorno de personalidad doble que a raíz de sus reacciones alérgicas provoca que ella cambie entre dos personalidades diferentes, ninguna de las personalidades recuerda lo que la otra hizo o dijo.",
    originPlanetId: 2
  },
  {
    name: "Mr. Satan",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047062/hp8536vd6pjafynvopoz.webp",
    ki: 450,
    maxKi: 5,
    race: "Human",
    gender: "Male",
    affiliation: "Other",
    description: "Luchador humano famoso por llevarse el mérito de las victorias de los Guerreros Z.",
    originPlanetId: 2
  },
  {
    name: "Dende",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047073/phdwjknztjgnq4qzeqzx.webp",
    ki: 3.2,
    maxKi: 3.2,
    race: "Namekian",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Sucesor de Piccolo como el nuevo Namekian protector de la Tierra. Es un pequeño namekiano, que vivía en el poblado de Moori, junto a su hermano Scargo y otros tantos de su especie. Es el hijo 108 del Gran Patriarca y posteriormente Dios de la Tierra, sustituyendo a Dios.",
    originPlanetId: 1
  },
  {
    name: "Android 17",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047086/vlinvxruepvmcovinyta.webp",
    ki: "320.000.000",
    maxKi: "40 Quintillion",
    race: "Android",
    gender: "Male",
    affiliation: "Villain",
    description: "Antes de ser secuestrado, es el hermano mellizo de la Androide Número 18, quien al igual que ella antes de ser Androide era un humano normal hasta que fueron secuestrados por el Dr. Gero, y es por eso que lo odian...",
    originPlanetId: 2
  },
  {
    name: "Android 16",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047111/swhio6vbgpe6lwzrklr8.webp",
    ki: "440.000.000",
    maxKi: "440.000.000",
    race: "Android",
    gender: "Male",
    affiliation: "Villain",
    description: "Android 16 es un androide gigante conocido por su amor a la naturaleza y la vida.",
    originPlanetId: 2
  },
  {
    name: "Android 19",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047395/yllazoe5ewir8murqusz.webp",
    ki: "122.000.000",
    maxKi: "160,000,000",
    race: "Android",
    gender: "Male",
    affiliation: "Villain",
    description: "Android 19 es uno de los androides creados por el Dr. Gero.",
    originPlanetId: 2
  },
  {
    name: "Android 20 (Dr. Gero)",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047433/qk0k8x3hyrhtvsica4gc.webp",
    ki: "128.000.000",
    maxKi: "158.100.000",
    race: "Android",
    gender: "Male",
    affiliation: "Villain",
    description: "Dr. Gero es el científico loco que creó a los androides 17, 18 y 19.",
    originPlanetId: 2
  },
  {
    name: "Android 13",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047480/tzkzeszlx2akrxkemmbi.webp",
    ki: "195.000.000",
    maxKi: "562.500.000",
    race: "Android",
    gender: "Male",
    affiliation: "Villain",
    description: "Android 13 es un androide peligroso que aparece en la película \"El Regreso de Cooler\".",
    originPlanetId: 2
  },
  {
    name: "Android 14",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047499/kjid2pwoh77rumwybtbj.webp",
    ki: "192.500.000",
    maxKi: "192.500.000",
    race: "Android",
    gender: "Male",
    affiliation: "Villain",
    description: "Android 14 es otro androide que aparece en la misma película que Android 13.",
    originPlanetId: 2
  },
  {
    name: "Android 15",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047513/ebkm7jrdrqcynnvyymlx.webp",
    ki: "175.000.000",
    maxKi: "175.000.000",
    race: "Android",
    gender: "Male",
    affiliation: "Villain",
    description: "Android 15 es otro androide que aparece en la misma película que Android 13.",
    originPlanetId: 2
  },
  {
    name: "Nail",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047533/cdj6qbbm1lj9u6c2jj3z.webp",
    ki: 42,
    maxKi: 42,
    race: "Namekian",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Es un Namekiano (habitante del planeta Namek), que se caracteriza por formar parte de los escasos miembros de la \"estirpe guerrera\", y ser el más poderoso entre ellos junto a Piccolo.",
    originPlanetId: 1
  },
  {
    name: "Raditz",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047547/sf7exd6mqkygybrxhycu.webp",
    ki: 1.5,
    maxKi: 1.5,
    race: "Saiyan",
    gender: "Male",
    affiliation: "Army of Frieza",
    description: "Es el hijo de Bardock y Gine, y hermano mayor de Son Goku. Él es uno de los pocos saiyanos que sobrevivieron a la destrucción del Planeta Vegeta, y formaba parte del equipo de Vegeta. Es el primer antagonista de Dragon Ball Z.",
    originPlanetId: 3
  },
  {
    name: "Babidi",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047579/vcrjfu9l893egxfmjvbe.webp",
    ki: 0,
    maxKi: 0,
    race: "Majin",
    gender: "Male",
    affiliation: "Villain",
    description: "Conocido también como Bóbidi o Bábidi, es un poderoso hechicero madoshi, \"hijo\" del gran mago Bibbidi, fundador de la familia Majin.",
    originPlanetId: 16
  },
  {
    name: "Majin Buu",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047587/k7etji7ygsfujctowfwl.webp",
    ki: "8 Billion",
    maxKi: "100 Trillion",
    race: "Majin",
    gender: "Male",
    affiliation: "Villain",
    description: "También conocido como Boo original, es la forma original y pura de Majin-Boo, y la última forma de Boo que aparece en Dragon Ball Z.",
    originPlanetId: 2
  },
  {
    name: "Bills",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047606/pddxkrnjag1vkoaudmf6.webp",
    ki: "102 Billion",
    maxKi: "100 septillion",
    race: "God",
    gender: "Male",
    affiliation: "Other",
    description: "Dios de la Destrucción Beerus, conocido también como Beers, o Bills en Hispanoamérica e inicialmente en España, es un personaje que fue introducido en la película Dragon Ball Z: La batalla de los dioses...",
    originPlanetId: 19
  },
  {
    name: "Whis",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047619/gffvgpfxwwqklot41xlh.webp",
    ki: "15 septillion",
    maxKi: "110 septillion",
    race: "Angel",
    gender: "Male",
    affiliation: "Assistant of Beerus",
    description: "Whis es uno de los hijos del Gran Sacerdote, hermano menor de Vados, Korn y Kus. Es el ángel guía encargado de asistir y servir como maestro al Dios de la Destrucción del Universo 7, Beerus.",
    originPlanetId: 19
  },
  {
    name: "Zeno",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047629/bmikekmvwebqlebcrlebcr1e2.webp",
    ki: "500 Septillion",
    maxKi: "500 Septillion",
    race: "Unknown",
    gender: "Male",
    affiliation: "Other",
    description: "Zeno es el ser supremo del multiverso y tiene un poder abrumador. El Rey de Todo, también conocido como Zen Oo (Zeno Sama en España y Zen Oo Sama en Hispanoamerica) y apodado por Son Goku como Todito...",
    originPlanetId: 24
  },
  {
    name: "Kibito-Shin",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047987/lj6goh5wc1hgchhk1h0x.webp",
    ki: "3.2 Billion",
    maxKi: "3.2 Billion",
    race: "God",
    gender: "Male",
    affiliation: "Other",
    description: "Es la fusión entre Shin y Kibito. Ellos fueron unidos permanentemente mediante el uso de los míticos pendientes Pothala. Está actualmente separado gracias a un deseo concedido por las Esferas del Dragón namekianas.",
    originPlanetId: 21
  },
  {
    name: "Jiren",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048004/uvqld9szltsfkxht9sma.webp",
    ki: "121 Quintillion",
    maxKi: "12.1 Septillion",
    race: "Jiren Race",
    gender: "Male",
    affiliation: "Pride Troopers",
    description: "Jiren es un poderoso luchador del Universo 11 y uno de los oponentes más formidables en el torneo.",
    originPlanetId: 25
  },
  {
    name: "Toppo",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048019/pnflznxqbx9ix2aei4pn.webp",
    ki: "99 Quadrillion",
    maxKi: "7.5 Sextillion",
    race: "God",
    gender: "Male",
    affiliation: "Pride Troopers",
    description: "Toppo es el líder de las Tropas del Orgullo, guerreros de la justicia del Universo 11 que actúan como protectores de la paz y superhéroes del bien...",
    originPlanetId: 25
  },
  {
    name: "Dyspo",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048034/kquxnkdxfkmnzkw0kiku.webp",
    ki: "50 Trillion",
    maxKi: "150 Quintillion",
    race: "God",
    gender: "Male",
    affiliation: "Pride Troopers",
    description: "Dyspo es uno de los miembros del Equipo Universo 11 como uno de los soldados más poderosos de las Tropas del Orgullo junto con Jiren y su líder Toppo.",
    originPlanetId: 25
  },
  {
    name: "Marcarita",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048057/x2mldjzrnvwymvpavmud.webp",
    ki: "10 septillion",
    maxKi: "99.5 septillion",
    race: "Angel",
    gender: "Female",
    affiliation: "Assistant of Vermoud",
    description: "Marcarita es el ángel guía del Universo 11, sirviente y maestra de artes marciales del Dios de la Destrucción Vermoud. Es un personaje de la Arco de la Supervivencia Universal de Dragon Ball Super.",
    originPlanetId: 25
  },
  {
    name: "Vermoudh",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048136/woen6ahkou5lq2xbqwub.webp",
    ki: "9.9 Septillion",
    maxKi: "100 septillion",
    race: "God",
    gender: "Male",
    affiliation: "Pride Troopers",
    description: "Es el individuo que actualmente ostenta el cargo de Dios de la Destrucción en el Universo 11, puesto que obtuvo tras abandonar su membresía como Soldado del Orgullo dentro de las Tropas del Orgullo.",
    originPlanetId: 25
  },
  {
    name: "Grand Priest",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048159/dnboockub6crwuohjpxd.webp",
    ki: "969 Googolplex",
    maxKi: "969 Googolplex",
    race: "Angel",
    gender: "Male",
    affiliation: "Other",
    description: "El Gran Sacerdote es el supervisor del torneo y uno de los seres más poderosos. Gran Ministro de los Omni-Reyes , es un ángel que actúa como asesor cercano y figura guía de Zenón y del Futuro Zenón.",
    originPlanetId: 24
  },
  {
    name: "Kaio del norte (Kaito)",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048176/auwbxy8hoqswzbjorbiz.webp",
    ki: 6,
    maxKi: 6,
    race: "Nucleico benigno",
    gender: "Male",
    affiliation: "Other",
    description: "Se trata del dios encargado de administrar las Galaxias del Norte, el cuadrante boreal del Universo 7 y supervisar a los dioses de los planetas de dicho sector.",
    originPlanetId: 11
  },
  {
    name: "Android 18",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048190/hh933ct0csyx2qtiuwsx.webp",
    ki: "280,000,000",
    maxKi: "300,000,000",
    race: "Android",
    gender: "Female",
    affiliation: "Z Fighter",
    description: "Es la hermana melliza del Androide Número 17 y una \"androide\" creada a partir de una base humana por el Dr. Gero con el único fin de destruir a Goku.",
    originPlanetId: 2
  },
  {
    name: "Gogeta",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119614/libzmur95hr16pjahjav.png",
    ki: "250 Billion",
    maxKi: "15 septillion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Gogeta es la fusión resultante de Son Goku y Vegeta, cuando realizan la Danza de la Fusión correctamente para enfrentarse a Broly. Su voz es una voz dual que contiene las voces de Goku y Vegeta. Junto con el poder todopoderoso de los dos, con la astucia y perspicacia de Vegeta, y la habilidad pródiga de las artes marciales de Goku, es uno de los guerreros más temibles para desafiar a una pelea.",
    originPlanetId: 2
  },
  {
    name: "Vegetto",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120023/yz5qypdh6boeqjhua5fo.webp",
    ki: "180 Billion",
    maxKi: "10.8 Septillion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Z Fighter",
    description: "Vegetto es el personaje más fuerte dentro del manga original y uno de los personajes más poderosos de toda la serie en general. Su poder es el resultado del máximo poder combinado de Goku y Vegeta, multiplicado varias veces su fuerza, siendo una de las fusiones más poderosas dentro de la franquicia.",
    originPlanetId: 2
  },
  {
    name: "Janemba",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120840/rntwfwfbwbd6te4f5oo9.webp",
    ki: "15 Billion",
    maxKi: "75 Billion",
    race: "Evil",
    gender: "Male",
    affiliation: "Other",
    description: "Janemba es un demonio de pura maldad y gran poder maligno. Creado a partir de las acciones de un adolescente ogro llamado Psyche Oni, quien era el responsable de vigilar la máquina purificadora de almas, la cual explota como consecuencia de la falta de cuidado del ogro, las almas malignas terminan por usar como huésped su cuerpo, creando así a este demonio.",
    originPlanetId: 18
  },
  {
    name: "Broly",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699121769/a4mz6kxcyvarieryehlq.webp",
    ki: "7 quadrillion",
    maxKi: "11.2 Septillion",
    race: "Saiyan",
    gender: "Male",
    affiliation: "Other",
    description: "Broly es un Saiyajin que posee un poder gigantesco e incontrolable, el cual se manifiesta en toda su magnitud cuando se convierte en el Super Saiyajin Legendario. Incluso cuando apenas era un bebé su nivel de poder alcanzaba cifras inmensas que provocaban asombro y preocupación entre los de su raza.",
    originPlanetId: 3
  },
  {
    name: "Kaio del Sur",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699137886/wyonuohgnixpe9c9eryj.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico benigno",
    gender: "Male",
    affiliation: "Other",
    description: "El Kaio del Sur es la única referencia que tenemos de los otros dioses Kaiō en el manga, más allá del Kaiō Sama Norte ya que es el único Kaiō, junto con el Kaiō del Norte, en aparecer en el manga, y uno de los cuatro que aparecen en el anime, junto al Gran Kaio.",
    originPlanetId: 3
  },
  {
    name: "Kaio del este",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138039/qhcmmun8ruua1i2lknln.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico benigno",
    gender: "Female",
    affiliation: "Other",
    description: "La Kaiō del Este es una Kaio que solo aparece en el anime. Le gustan los retos y de entrenar duramente a sus discípulos, que destacan por ser guerreros muy veloces, siendo el ejemplo más claro Chapuchai.",
    originPlanetId: 21
  },
  {
    name: "Kaio del Oeste",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138163/uohfph29ij52x5dq6tdf.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico benigno",
    gender: "Male",
    affiliation: "Other",
    description: "El Kaiō del Oeste es el rival del Kaio del Norte. Y como dice su nombre, el controla la galaxia del Oeste.",
    originPlanetId: 21
  },
  {
    name: "Gran Kaio",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138362/s9x0ttwfbsnj1gxa3uvx.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico benigno",
    gender: "Male",
    affiliation: "Other",
    description: "Gran Kaio es el Kaio de mayor importancia del Otro Mundo y es el Dios que se encarga de administrar a los demás Kaiō para que se ocupen de cuyos sectores de la Galaxia. Su apariencia es la de un anciano con una barba larga y muy canosa, remarcada por unas gafas oscuras que nunca se quita en la serie.",
    originPlanetId: 20
  },
  {
    name: "Kaio-shin del Este",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138797/gghhwu2xdxlau1ffx87b.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico",
    gender: "Male",
    affiliation: "Other",
    description: "Es uno de los Kaio-shin, los dioses de la creación que se encargan de crear vida en todo el Universo 7 y protegerlo de amenazas supremas. Anteriormente solía hacerse cargo de proteger la zona este del universo, ya que después de la muerte de los otros Kaio-shin a manos de Majin-Boo, se convirtió en el Kaio-shin principal del Universo 7.",
    originPlanetId: 21
  },
  {
    name: "Kaio-shin del Norte",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139066/iuu3m3wqnhwtbqzce5bg.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico",
    gender: "Male",
    affiliation: "Other",
    description: "El Kaiō-shin del Norte es otro de los Kaiō-shin que vivió junto a el resto de los Kaio-shin y Dai Kaio-shin hace 5 millones de años, y que luchó contra Majin Boo.",
    originPlanetId: 22
  },
  {
    name: "Kaio-shin del Sur",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139176/tads9xhz9ro7ko42spie.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico",
    gender: "Male",
    affiliation: "Other",
    description: "El Kaio-shin del Sur fue el gobernante del cuadrante sur del universo y era el más poderoso entre los Kaio-shin.",
    originPlanetId: 22
  },
  {
    name: "Kaio-shin del Oeste",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139274/hcxz5pcptdevfud5mko0.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico benigno",
    gender: "Female",
    affiliation: "Other",
    description: "La Kaiō-shin del Oeste es una Kaio-shin, que vivió junto a sus compañeros, fue la primera en morir en la terrible batalla librada contra Majin Boo hace 5 millones de años.",
    originPlanetId: 22
  },
  {
    name: "Gran Kaio-shin",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139385/souyebdax1eaeo6kihhv.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico benigno",
    gender: "Male",
    affiliation: "Other",
    description: "El Gran Kaio-shin, conocido también como Sagrado Kaiosama en Hispanoamérica, era el Kaio-shin principal del Universo 7 y supervisor de los otros Kaio-shin del mismo universo. Tras ser absorbido por Majin Boo, el Gran Kaio-shin del Universo 7 se convirtió en la faceta más dominante en Boo Gordo, aún viviendo actualmente dentro de su cuerpo a través de su espíritu.",
    originPlanetId: 21
  },
  {
    name: "Kibito",
    image: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139586/xjxctyovqfkwern9qcip.webp",
    ki: "unknown",
    maxKi: "unknown",
    race: "Nucleico",
    gender: "Male",
    affiliation: "Other",
    description: "Kibito es el ayudante y guardaespaldas del Kaio-shin del Este. Es un experto combatiente y con ciertos poderes curativos y mágicos como corresponde a su función. Su técnica más conocida es el Kai-Kai.",
    originPlanetId: 21
  }

];

async function importAllDragonballData() {
  try {
    await clearTables();
    await importPlanets(planets);
    await importTransformations(transformations);
    await importCharacters(characters);
    console.log('✅ Importación completada correctamente.');
  } catch (error) {
    console.error('❌ Error durante la importación:', error);
  }
}
importAllDragonballData();