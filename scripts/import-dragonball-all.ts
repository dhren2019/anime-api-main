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

const characters: DbCharacter[] = [
  {
    name: 'Goku',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050898/goku-base.png',
    ki: '150 Million',
    maxKi: '9 Quintillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Z Warriors',
    description: 'The main protagonist of Dragon Ball series. A Saiyan raised on Earth who becomes its greatest defender.',
    originPlanetId: 2,
    transformations: JSON.stringify([1, 2, 3, 4, 5]),
    family: JSON.stringify(['Bardock', 'Gine', 'Chi-Chi', 'Gohan', 'Goten']),
    saga: 'Dragon Ball Z',
    techniques: JSON.stringify(['Kamehameha', 'Spirit Bomb', 'Instant Transmission']),
    powerStats: JSON.stringify({
      strength: 95,
      speed: 90,
      technique: 85,
      intelligence: 70,
      willpower: 100
    })
  },
  {
    name: 'Vegeta',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102458/vegeta-base.png',
    ki: '18 Million',
    maxKi: '100 Quintillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Z Warriors',
    description: 'The proud prince of the Saiyan race who becomes one of Earth\'s greatest defenders.',
    originPlanetId: 2,
    transformations: JSON.stringify([6, 7, 8, 9]),
    family: JSON.stringify(['King Vegeta', 'Bulma', 'Trunks', 'Bulla']),
    saga: 'Dragon Ball Z',
    techniques: JSON.stringify(['Final Flash', 'Big Bang Attack', 'Galick Gun']),
    powerStats: JSON.stringify({
      strength: 90,
      speed: 85,
      technique: 90,
      intelligence: 85,
      willpower: 95
    })
  },
  {
    name: 'Piccolo',
    image: 'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103067/piccolo-base.png',
    ki: '1 Million',
    maxKi: '41.25 Quintillion',
    race: 'Namekian',
    gender: 'Male',
    affiliation: 'Z Warriors',
    description: 'A Namekian warrior who becomes one of Earth\'s greatest heroes and Gohan\'s mentor.',
    originPlanetId: 3,
    transformations: JSON.stringify([12, 13]),
    saga: 'Dragon Ball Z',
    techniques: JSON.stringify(['Special Beam Cannon', 'Light Grenade', 'Hellzone Grenade']),
    powerStats: JSON.stringify({
      strength: 85,
      speed: 80,
      technique: 95,
      intelligence: 95,
      willpower: 90
    })
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
  }
];

async function importAllDragonballData() {
  try {
    await clearTables();
    // 1. Insertar planetas y obtener sus IDs reales
    const planetResults = [];
    for (const planet of planets) {
      const [result] = await db.insert(dragonballPlanetTable)
        .values({
          name: planet.name,
          description: planet.description || '',
          image: planet.image ? transformLocalImagePath(planet.image, 'planets') : '',
          races: planet.races || '[]'
        })
        .returning({ id: dragonballPlanetTable.id, name: dragonballPlanetTable.name });
      planetResults.push(result);
    }
    // Crear un mapa nombre->id
    const planetNameToId = Object.fromEntries(planetResults.map(p => [p.name, p.id]));

    // 2. Asignar el ID correcto a los personajes
    const charactersWithPlanetId = characters.map(char => {
      let originPlanetId = undefined;
      if (char.originPlanetId) {
        // Buscar el nombre del planeta según el ID "antiguo"
        const planetNames = Object.keys(planetNameToId);
        // Asumimos que el array original tenía el mismo orden, así que el ID 1 es el primer planeta, etc.
        const planetName = planetNames[char.originPlanetId - 1];
        originPlanetId = planetNameToId[planetName];
      }
      return { ...char, originPlanetId };
    });

    await importCharacters(charactersWithPlanetId);
    await importTransformations(transformations);
    console.log('✅ Importación completa');
  } catch (error) {
    console.error('❌ Error durante la importación:', error);
    throw error;
  }
}

importAllDragonballData();
