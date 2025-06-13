// scripts/import-mysql-dragonball.ts
import { db } from '../configs/db';
import { apiDragonballTable, dragonballPlanetTable, dragonballTransformationTable } from '../configs/schema';
import fs from 'fs';
import path from 'path';

// Utilidad para limpiar y convertir valores de ki
function parseKi(value: string) {
  if (!value || value.toLowerCase() === 'unknown') return null;
  // Quitar puntos, comas y espacios
  const clean = value.replace(/\.|,|\s/g, '').replace(/septillion|quintillion|quadrillion|trillion|billion|million|googolplex/gi, '');
  const num = Number(clean);
  return isNaN(num) ? null : num;
}

// Utilidad para obtener la ruta local de la imagen
function getLocalImagePath(type: string, name: string, ext: string = '.webp') {
  const safeName = name.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 50);
  return `/dragonball-api/${type}/${safeName}${ext}`;
}

// --- DATOS EXTRAÍDOS DEL DUMP MYSQL ---
const characters = [
  
  {
    "id": 1,
    "name": "Goku",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044374/hlpy6q013uw3itl5jzic.webp",
    "ki": "60.000.000",
    "maxKi": "90 Septillion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "El protagonista de la serie, conocido por su gran poder y personalidad amigable. Originalmente enviado a la Tierra como un infante volador con la misión de conquistarla. Sin embargo, el caer por un barranco le proporcionó un brutal golpe que si bien casi lo mata, este alteró su memoria y anuló todos los instintos violentos de su especie, lo que lo hizo crecer con un corazón puro y bondadoso, pero conservando todos los poderes de su raza. No obstante, en la nueva continuidad de Dragon Ball se establece que él fue enviado por sus padres a la Tierra con el objetivo de sobrevivir a toda costa a la destrucción de su planeta por parte de Freeza. Más tarde, Kakarot, ahora conocido como Son Goku, se convertiría en el príncipe consorte del monte Fry-pan y líder de los Guerreros Z, así como el mayor defensor de la Tierra y del Universo 7, logrando mantenerlos a salvo de la destrucción en innumerables ocasiones, a pesar de no considerarse a sí mismo como un héroe o salvador.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 2,
    "name": "Vegeta",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044422/i9hpfjplth6gjudvhsx3.webp",
    "ki": "54.000.000",
    "maxKi": "19.84 Septillion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Príncipe de los Saiyans, inicialmente un villano, pero luego se une a los Z Fighters. A pesar de que a inicios de Dragon Ball Z, Vegeta cumple un papel antagónico, poco después decide rebelarse ante el Imperio de Freeza, volviéndose un aliado clave para los Guerreros Z. Con el paso del tiempo llegaría a cambiar su manera de ser, optando por permanecer y vivir en la Tierra para luchar a su lado contra las inminentes adversidades que superar. Junto con Piccolo, él es de los antiguos enemigos de Goku que ha evolucionando al pasar de ser un villano y antihéroe, a finalmente un héroe a lo largo del transcurso de la historia, convirtiéndose así en el deuteragonista de la serie.",
    "originPlanetId": 3,
    "deletedAt": ""
  },
  {
    "id": 3,
    "name": "Piccolo",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044481/u9fhpc9smihu2kud3cuc.webp",
    "ki": "2.000.000",
    "maxKi": "500.000.000",
    "race": "Namekian",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Es un namekiano que surgió tras ser creado en los últimos momentos de vida de su padre, siendo su actual reencarnación. Aunque en un principio fue el archienemigo de Son Goku, con el paso del tiempo fue haciéndose menos malvado hasta finalmente convertirse en un ser bondadoso y miembro de los Guerreros Z. A través del tiempo, también comenzó a tomarle cariño a su discípulo Son Gohan, a quien veía como una especie de \"vástago\" y formando un lazo de amistad con este.",
    "originPlanetId": 1,
    "deletedAt": ""
  },
  {
    "id": 4,
    "name": "Bulma",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044496/bifhe9qarbrgvm0tsiru.webp",
    "ki": 0,
    "maxKi": 0,
    "race": "Human",
    "gender": "Female",
    "affiliation": "Z Fighter",
    "description": "Bulma es la protagonista femenina de la serie manga Dragon Ball y sus adaptaciones al anime Dragon Ball, Dragon Ball Z, Dragon Ball Super y Dragon Ball GT. Es hija del Dr. Brief y su esposa Panchy, hermana menor de Tights y una gran amiga de Son Goku con quien inicia la búsqueda de las Esferas del Dragón. En Dragon Ball Z tuvo a Trunks, primogénito de quien sería su esposo Vegeta, a su hija Bra[3] y su hijo adulto del tiempo alterno Trunks del Futuro Alternativo.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 5,
    "name": "Freezer",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044513/ux3n5u0tjdvysjao4w8s.webp",
    "ki": 530,
    "maxKi": "52.71 Septillion",
    "race": "Frieza Race",
    "gender": "Male",
    "affiliation": "Army of Frieza",
    "description": "Freezer es el tirano espacial y el principal antagonista de la saga de Freezer.",
    "originPlanetId": 4,
    "deletedAt": ""
  },
  {
    "id": 6,
    "name": "Zarbon",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044531/jcdgte2shoaj2jh0ruob.webp",
    "ki": 20,
    "maxKi": 30,
    "race": "Frieza Race",
    "gender": "Male",
    "affiliation": "Army of Frieza",
    "description": "Zarbon es uno de los secuaces de Freezer y un luchador poderoso.",
    "originPlanetId": 4,
    "deletedAt": ""
  },
  {
    "id": 7,
    "name": "Dodoria",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044548/m2mixyphepp8qwcigb3g.webp",
    "ki": 18,
    "maxKi": 20,
    "race": "Frieza Race",
    "gender": "Male",
    "affiliation": "Army of Frieza",
    "description": "Dodoria es otro secuaz de Freezer conocido por su brutalidad.",
    "originPlanetId": 4,
    "deletedAt": ""
  },
  {
    "id": 8,
    "name": "Ginyu",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699129673/dxsl3rjhrfmajo2gealz.webp",
    "ki": 9,
    "maxKi": 25,
    "race": "Frieza Race",
    "gender": "Male",
    "affiliation": "Army of Frieza",
    "description": "Ginyu es el líder del la élite de mercenarios de mayor prestigio del Ejército de Freeza, la cual lleva el nombre de Fuerzas Especiales Ginew en su honor[9].",
    "originPlanetId": 4,
    "deletedAt": ""
  },
  {
    "id": 9,
    "name": "Celula",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044573/mz09ghskyzf0skprredi.webp",
    "ki": "250.000.000",
    "maxKi": "5 Billion",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Freelancer",
    "description": "Cell conocido como Célula en España, es un bioandroide creado por la computadora del Dr. Gero, quien vino del futuro de la línea 3 con la intención de vengarse de Goku por haber acabado con el Ejército del Listón Rojo, y con ello el sueño de todo villano: dominar el mundo. Es el antagonista principal del Arco de los Androides y Cell.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 10,
    "name": "Gohan",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044627/kigekwjt2m8nwopgvabv.webp",
    "ki": "45.000.000",
    "maxKi": "40 septillion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Son Gohanda en su tiempo en España, o simplemente Gohan en Hispanoamérica, es uno de los personajes principales de los arcos argumentales de Dragon Ball Z, Dragon Ball Super y Dragon Ball GT. Es un mestizo entre saiyano y humano terrícola. Es el primer hijo de Son Goku y Chi-Chi, hermano mayor de Son Goten, esposo de Videl y padre de Pan.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 11,
    "name": "Krillin",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046768/ay2b4ps6xc5i4uhcxoio.webp",
    "ki": "1.000.000",
    "maxKi": "1 Billion",
    "race": "Human",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Amigo cercano de Goku y guerrero valiente, es un personaje del manga y anime de Dragon Ball. Es uno de los principales discípulos de Kame-Sen'nin, Guerrero Z, y el mejor amigo de Son Goku. Es junto a Bulma uno de los personajes de apoyo principales de Dragon Ball, Dragon Ball Z y Dragon Ball Super. Aparece en Dragon Ball GT como personaje secundario. En el Arco de Majin Boo, se retira de las artes marciales, optando por formar una familia, como el esposo de la Androide Número 18 y el padre de Marron.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 12,
    "name": "Tenshinhan",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046784/umcprk7ugb5q8cb9uhrh.webp",
    "ki": "2.400.000",
    "maxKi": "80.000.000",
    "race": "Human",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Maestro de las artes marciales y miembro de los Z Fighters.  Es un personaje que aparece en el manga y en el anime de Dragon Ball, Dragon Ball Z, Dragon Ball GT y posteriormente en Dragon Ball Super.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 13,
    "name": "Yamcha",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047468/euprvykftdyup1uw6z4p.webp",
    "ki": "1.980.000",
    "maxKi": "4.000.000",
    "race": "Human",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Luchador que solía ser un bandido del desierto.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 14,
    "name": "Chi-Chi",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046815/rizrttygnvfwv4gntrkw.webp",
    "ki": 0,
    "maxKi": 0,
    "race": "Human",
    "gender": "Female",
    "affiliation": "Z Fighter",
    "description": "Esposa de Goku y madre de Gohan. Es la princesa del Monte Fry-pan siendo la hija de la fallecida reina de esta montaña y el Rey Gyuma, ella terminaría conociendo a Son Goku cuando era tan solo una niña para años más tarde durante su adolescencia ser su esposa y convertirse en la estricta pero amorosa madre de Gohan y Goten.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 15,
    "name": "Gotenks",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046837/sfc007ookoxjac1j0mkl.webp",
    "ki": "65.600.000",
    "maxKi": "34.8 Billion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Gotenks también conocido inicialmente como Gotrunk en el doblaje al español de España, es el resultado de la Danza de la Fusión llevada a cabo correctamente por Goten y Trunks.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 16,
    "name": "Trunks",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046959/qmzg7t9u7nhmsqlpt83o.webp",
    "ki": "50.000.000",
    "maxKi": "37.4 septllion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Hijo de Vegeta y Bulma. Es un mestizo entre humano terrícola y Saiyano nacido en la Tierra, e hijo de Bulma y Vegeta, el cual es introducido en el Arco de los Androides y Cell. Más tarde en su vida como joven, se termina convirtiendo en un luchador de artes marciales, el mejor amigo de Son Goten y en el hermano mayor de su hermana Bra.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 17,
    "name": "Master Roshi",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699046999/smcckhzeoa806ovrciti.webp",
    "ki": 500,
    "maxKi": "350.000.000",
    "race": "Human",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Maestro de artes marciales y mentor de Goku. Conocido bajo el nombre de Muten Rosh, fue en su momento el terrícola más fuerte de la Tierra, y mucha gente lo recuerda como el \"Dios de las Artes Marciales\", pero antes de poder ostentar dicho título tuvo que trabajar y estudiar las artes marciales con su maestro Mutaito y su eterno rival Tsuru-Sen'nin.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 18,
    "name": "Bardock",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047021/yspsolmpraytim3uph9j.webp",
    "ki": 450,
    "maxKi": "180.000.000",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Es un saiyano de clase baja proveniente del Planeta Vegeta del Universo 7. Pertenece al Ejército Saiyano, que está bajo el liderazgo del Rey Vegeta, y es jefe de su escuadrón durante la anexión del planeta por parte de las fuerzas coloniales del Imperio de Freeza. Él es el esposo de Gine y padre biológico de Kakarotto y Raditz.",
    "originPlanetId": 3,
    "deletedAt": ""
  },
  {
    "id": 19,
    "name": "Launch",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047046/jof8lbpjtggkbwiztiu0.webp",
    "ki": 0,
    "maxKi": 0,
    "race": "Human",
    "gender": "Female",
    "affiliation": "Z Fighter",
    "description": "Personaje que sufre cambios de personalidad al estornudar. Es uno de los personajes principales del manga Dragon Ball y su anime homónimo; Lunch es una chica que sufre de un trastorno de personalidad doble que a raíz de sus reacciones alérgicas provoca que ella cambie entre dos personalidades diferentes, ninguna de las personalidades recuerda lo que la otra hizo o dijo.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 20,
    "name": "Mr. Satan",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047062/hp8536vd6pjafynvopoz.webp",
    "ki": 450,
    "maxKi": 5,
    "race": "Human",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Luchador humano famoso por llevarse el mérito de las victorias de los Guerreros Z.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 21,
    "name": "Dende",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047073/phdwjknztjgnq4qzeqzx.webp",
    "ki": 3.2,
    "maxKi": 3.2,
    "race": "Namekian",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Sucesor de Piccolo como el nuevo Namekian protector de la Tierra. Es un pequeño namekiano, que vivía en el poblado de Moori, junto a su hermano Scargo y otros tantos de su especie. Es el hijo 108 del Gran Patriarca y posteriormente Dios de la Tierra, sustituyendo a Dios.",
    "originPlanetId": 1,
    "deletedAt": ""
  },
  {
    "id": 22,
    "name": "Android 17",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047086/vlinvxruepvmcovinyta.webp",
    "ki": "320.000.000",
    "maxKi": "40 Quintillion",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Antes de ser secuestrado, es el hermano mellizo de la Androide Número 18, quien al igual que ella antes de ser Androide era un humano normal hasta que fueron secuestrados por el Dr. Gero, y es por eso que lo odian. Tras su cambio de humano a Androide, le insertaron un chip con el objetivo de destruir a Son Goku, quien en su juventud extermino al Ejército del Listón Rojo. Al considerarse defectuoso porque no quería ser 'esclavo de nadie', el Dr. Gero les había colocado a ambos hermanos, un dispositivo de apagado para detenerlos en cualquier momento de desobediencia, pero cuando el científico los despierta, el rencor y rebeldía de 17 eran tal que se encargó de destruir el control que lo volvería a encerrar y acto seguido mató sin piedad a su propio creador. Su situación se le iría en contra, ya que Cell tenía como misión absorber a 17 y 18 para completar su desarrollo y convertirse en Cell Perfecto.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 23,
    "name": "Android 16",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047111/swhio6vbgpe6lwzrklr8.webp",
    "ki": "440.000.000",
    "maxKi": "440.000.000",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Android 16 es un androide gigante conocido por su amor a la naturaleza y la vida.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 24,
    "name": "Android 19",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047395/yllazoe5ewir8murqusz.webp",
    "ki": "122.000.000",
    "maxKi": "160,000,000",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Android 19 es uno de los androides creados por el Dr. Gero.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 25,
    "name": "Android 20 (Dr. Gero)",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047433/qk0k8x3hyrhtvsica4gc.webp",
    "ki": "128.000.000",
    "maxKi": "158.100.000",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Dr. Gero es el científico loco que creó a los androides 17, 18 y 19.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 26,
    "name": "Android 13",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047480/tzkzeszlx2akrxkemmbi.webp",
    "ki": "195.000.000",
    "maxKi": "562.500.000",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Android 13 es un androide peligroso que aparece en la película \"El Regreso de Cooler\".",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 27,
    "name": "Android 14",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047499/kjid2pwoh77rumwybtbj.webp",
    "ki": "192.500.000",
    "maxKi": "192.500.000",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Android 14 es otro androide que aparece en la misma película que Android 13.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 28,
    "name": "Android 15",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047513/ebkm7jrdrqcynnvyymlx.webp",
    "ki": "175.000.000",
    "maxKi": "175.000.000",
    "race": "Android",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Android 15 es otro androide que aparece en la misma película que Android 13.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 29,
    "name": "Nail",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047533/cdj6qbbm1lj9u6c2jj3z.webp",
    "ki": 42,
    "maxKi": 42,
    "race": "Namekian",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Es un Namekiano (habitante del planeta Namek), que se caracteriza por formar parte de los escasos miembros de la \"estirpe guerrera\", y ser el más poderoso entre ellos junto a Piccolo.",
    "originPlanetId": 1,
    "deletedAt": ""
  },
  {
    "id": 30,
    "name": "Raditz",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047547/sf7exd6mqkygybrxhycu.webp",
    "ki": 1.5,
    "maxKi": 1.5,
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Army of Frieza",
    "description": "Es el hijo de Bardock y Gine, y hermano mayor de Son Goku. Él es uno de los pocos saiyanos que sobrevivieron a la destrucción del Planeta Vegeta, y formaba parte del equipo de Vegeta. Es el primer antagonista de Dragon Ball Z.",
    "originPlanetId": 3,
    "deletedAt": ""
  },
  {
    "id": 31,
    "name": "Babidi",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047579/vcrjfu9l893egxfmjvbe.webp",
    "ki": 0,
    "maxKi": 0,
    "race": "Majin",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "Conocido también como Bóbidi o Bábidi, es un poderoso hechicero madoshi, \"hijo\" del gran mago Bibbidi, fundador de la familia Majin. La \"M\" que llevan ambos en el cinturón de sus atuendos al igual que la frente de aquellos que han sido poseídos para formar parte de la familia Majin.",
    "originPlanetId": 16,
    "deletedAt": ""
  },
  {
    "id": 32,
    "name": "Majin Buu",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047587/k7etji7ygsfujctowfwl.webp",
    "ki": "8 Billion",
    "maxKi": "100 Trillion",
    "race": "Majin",
    "gender": "Male",
    "affiliation": "Villain",
    "description": "También conocido como Boo original, es la forma original y pura de Majin-Boo, y la última forma de Boo que aparece en Dragon Ball Z.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 33,
    "name": "Bills",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047606/pddxkrnjag1vkoaudmf6.webp",
    "ki": "102 Billion",
    "maxKi": "100 septillion",
    "race": "God",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Dios de la Destrucción Beerus, conocido también como Beers, o Bills en Hispanoamérica e inicialmente en España[1], es un personaje que fue introducido en la película Dragon Ball Z: La batalla de los dioses, donde es el antagonista principal de la película, y que aparece en el manga y anime de Dragon Ball Super como un personaje principal. Ocupa el puesto de Dios de la Destrucción de todo el Universo 7 siendo el lugar donde se desarrolla la historia de Dragon Ball.",
    "originPlanetId": 19,
    "deletedAt": ""
  },
  {
    "id": 34,
    "name": "Whis",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047619/gffvgpfxwwqklot41xlh.webp",
    "ki": "15 septillion",
    "maxKi": "110 septillion",
    "race": "Angel",
    "gender": "Male",
    "affiliation": "Assistant of Beerus",
    "description": "Whis es uno de los hijos del Gran Sacerdote, hermano menor de Vados, Korn y Kus. Es el ángel guía encargado de asistir y servir como maestro al Dios de la Destrucción del Universo 7, Beerus.",
    "originPlanetId": 19,
    "deletedAt": ""
  },
  {
    "id": 35,
    "name": "Zeno",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047629/bmikekmvwebqlebcr1e2.webp",
    "ki": "500 Septillion",
    "maxKi": "500 Septillion",
    "race": "Unknown",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Zeno es el ser supremo del multiverso y tiene un poder abrumador .El Rey de Todo, también conocido como Zen Oo (Zeno Sama en España y Zen Oo Sama en Hispanoamerica) y apodado por Son Goku como Todito (全ぜんちゃん, Zen-chan), es el gobernante y dios absoluto de todos los universos y el máximo soberano de todo lo existente en Dragon Ball.",
    "originPlanetId": 24,
    "deletedAt": ""
  },
  {
    "id": 37,
    "name": "Kibito-Shin",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699047987/lj6goh5wc1hgchhk1h0x.webp",
    "ki": "3.2 Billion",
    "maxKi": "3.2 Billion",
    "race": "God",
    "gender": "Male",
    "affiliation": "Other",
    "description": "es la fusión entre Shin y Kibito. Ellos fueron unidos permanentemente mediante el uso de los míticos pendientes Pothala. Está actualmente separado gracias a un deseo concedido por las Esferas del Dragón namekianas.",
    "originPlanetId": 21,
    "deletedAt": ""
  },
  {
    "id": 38,
    "name": "Jiren",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048004/uvqld9szltsfkxht9sma.webp",
    "ki": "121 Quintillion",
    "maxKi": "12.1 Septillion",
    "race": "Jiren Race",
    "gender": "Male",
    "affiliation": "Pride Troopers",
    "description": "Jiren es un poderoso luchador del Universo 11 y uno de los oponentes más formidables en el torneo.",
    "originPlanetId": 25,
    "deletedAt": ""
  },
  {
    "id": 39,
    "name": "Toppo",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048019/pnflznxqbx9ix2aei4pn.webp",
    "ki": "99 Quadrillion",
    "maxKi": "7.5 Sextillion",
    "race": "God",
    "gender": "Male",
    "affiliation": "Pride Troopers",
    "description": "Toppo es el líder de las Tropas del Orgullo, guerreros de la justicia del Universo 11 que actúan como protectores de la paz y superhéroes del bien. Él ha sido entrenado por el ángel guía Marcarita, convirtiéndose así en un candidato como futuro Dios de la Destrucción en su universo.",
    "originPlanetId": 25,
    "deletedAt": ""
  },
  {
    "id": 40,
    "name": "Dyspo",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048034/kquxnkdxfkmnzkw0kiku.webp",
    "ki": "50 Trillion",
    "maxKi": "150 Quintillion",
    "race": "God",
    "gender": "Male",
    "affiliation": "Pride Troopers",
    "description": "Dyspo es uno de los miembros del Equipo Universo 11 como uno de los soldados más poderosos de las Tropas del Orgullo junto con Jiren y su líder Toppo.",
    "originPlanetId": 25,
    "deletedAt": ""
  },
  {
    "id": 42,
    "name": "Marcarita",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048057/x2mldjzrnvwymvpavmud.webp",
    "ki": "10 septillion",
    "maxKi": "99.5 septillion",
    "race": "Angel",
    "gender": "Female",
    "affiliation": "Assistant of Vermoud",
    "description": "Marcarita es el ángel guía del Universo 11, sirviente y maestra de artes marciales del Dios de la Destrucción Vermoud. Es un personaje de la Arco de la Supervivencia Universal de Dragon Ball Super.",
    "originPlanetId": 25,
    "deletedAt": ""
  },
  {
    "id": 43,
    "name": "Vermoudh",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048136/woen6ahkou5lq2xbqwub.webp",
    "ki": "9.9 Septillion",
    "maxKi": "100 septillion",
    "race": "God",
    "gender": "Male",
    "affiliation": "Pride Troopers",
    "description": "Es el individuo que actualmente ostenta el cargo de Dios de la Destrucción en el Universo 11, puesto que obtuvo tras abandonar su membresía como Soldado del Orgullo dentro de las Tropas del Orgullo.",
    "originPlanetId": 25,
    "deletedAt": ""
  },
  {
    "id": 44,
    "name": "Grand Priest",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048159/dnboockub6crwuohjpxd.webp",
    "ki": "969 Googolplex",
    "maxKi": "969 Googolplex",
    "race": "Angel",
    "gender": "Male",
    "affiliation": "Other",
    "description": "El Gran Sacerdote es el supervisor del torneo y uno de los seres más poderosos. Gran Ministro de los Omni-Reyes , es un ángel que actúa como asesor cercano y figura guía de Zenón y del Futuro Zenón . De vez en cuando hace cumplir los Decretos Divinos de los Zenos y da la bienvenida a los invitados a su palacio . El Gran Ministro es también padre de trece Ángeles, de los cuales doce sirven a los Dioses de la Destrucción . Por su posición y poder, es quizás el segundo ser más fuerte del Multiverso .",
    "originPlanetId": 24,
    "deletedAt": ""
  },
  {
    "id": 63,
    "name": "Kaio del norte (Kaito)",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048176/auwbxy8hoqswzbjorbiz.webp",
    "ki": 6,
    "maxKi": 6,
    "race": "Nucleico benigno",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Se trata del dios encargado de administrar las Galaxias del Norte, el cuadrante boreal del Universo 7 y supervisar a los dioses de los planetas de dicho sector (como es el caso de Kami en la Tierra)",
    "originPlanetId": 11,
    "deletedAt": ""
  },
  {
    "id": 64,
    "name": "Android 18",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699048190/hh933ct0csyx2qtiuwsx.webp",
    "ki": "280,000,000",
    "maxKi": "300,000,000",
    "race": "Android",
    "gender": "Female",
    "affiliation": "Z Fighter",
    "description": "Es la hermana melliza del Androide Número 17 y una \"androide\" creada a partir de una base humana por el Dr. Gero con el único fin de destruir a Goku.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 65,
    "name": "Gogeta",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119614/libzmur95hr16pjahjav.png",
    "ki": "250 Billion",
    "maxKi": "15 septillion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Gogeta es la fusión resultante de Son Goku y Vegeta, cuando realizan la Danza de la Fusión correctamente para enfrentarse a Broly. Su voz es una voz dual que contiene las voces de Goku y Vegeta. Junto con el poder todopoderoso de los dos, con la astucia y perspicacia de Vegeta, y la habilidad pródiga de las artes marciales de Goku, es uno de los guerreros más temibles para desafiar a una pelea.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 66,
    "name": "Vegetto",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120023/yz5qypdh6boeqjhua5fo.webp",
    "ki": "180 Billion",
    "maxKi": "10.8 Septillion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Z Fighter",
    "description": "Vegetto es el personaje más fuerte dentro del manga original y uno de los personajes más poderosos de toda la serie en general. Su poder es el resultado del máximo poder combinado de Goku y Vegeta, multiplicado varias veces su fuerza, siendo una de las fusiones más poderosas dentro de la franquicia.",
    "originPlanetId": 2,
    "deletedAt": ""
  },
  {
    "id": 67,
    "name": "Janemba",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120840/rntwfwfbwbd6te4f5oo9.webp",
    "ki": "15 Billion",
    "maxKi": "75 Billion",
    "race": "Evil",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Janemba es un demonio de pura maldad y gran poder maligno. Creado a partir de las acciones de un adolescente ogro llamado Psyche Oni, quien era el responsable de vigilar la máquina purificadora de almas, la cual explota como consecuencia de la falta de cuidado del ogro, las almas malignas terminan por usar como huésped su cuerpo, creando así a este demonio.",
    "originPlanetId": 18,
    "deletedAt": ""
  },
  {
    "id": 68,
    "name": "Broly",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699121769/a4mz6kxcyvarieryehlq.webp",
    "ki": "7 quadrillion",
    "maxKi": "11.2 Septillion",
    "race": "Saiyan",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Broly es un Saiyajin que posee un poder gigantesco e incontrolable, el cual se manifiesta en toda su magnitud cuando se convierte en el Super Saiyajin Legendario. Incluso cuando apenas era un bebé su nivel de poder alcanzaba cifras inmensas que provocaban asombro y preocupación entre los de su raza",
    "originPlanetId": 3,
    "deletedAt": ""
  },
  {
    "id": 69,
    "name": "Kaio del Sur",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699137886/wyonuohgnixpe9c9eryj.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico benigno",
    "gender": "Male",
    "affiliation": "Other",
    "description": "El Kaio del Sur es la única referencia que tenemos de los otros dioses Kaiō en el manga, más allá del Kaiō Sama Norte ya que es el único Kaiō, junto con el Kaiō del Norte, en aparecer en el manga, y uno de los cuatro que aparecen en el anime, junto al Gran Kaio.",
    "originPlanetId": 3,
    "deletedAt": ""
  },
  {
    "id": 70,
    "name": "Kaio del este",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138039/qhcmmun8ruua1i2lknln.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico benigno",
    "gender": "Female",
    "affiliation": "Other",
    "description": "La Kaiō del Este es una Kaio que solo aparece en el anime. Le gustan los retos y de entrenar duramente a sus discípulos, que destacan por ser guerreros muy veloces, siendo el ejemplo más claro Chapuchai.",
    "originPlanetId": 21,
    "deletedAt": ""
  },
  {
    "id": 71,
    "name": "Kaio del Oeste",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138163/uohfph29ij52x5dq6tdf.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico benigno",
    "gender": "Male",
    "affiliation": "Other",
    "description": "El Kaiō del Oeste es el rival del Kaio del Norte. Y como dice su nombre, el controla la galaxia del Oeste.",
    "originPlanetId": 21,
    "deletedAt": ""
  },
  {
    "id": 72,
    "name": "Gran Kaio",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138362/s9x0ttwfbsnj1gxa3uvx.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico benigno",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Gran Kaio es el Kaio de mayor importancia del Otro Mundo y es el Dios que se encarga de administrar a los demás Kaiō para que se ocupen de cuyos sectores de la Galaxia. Su apariencia es la de un anciano con una barba larga y muy canosa, remarcada por unas gafas oscuras que nunca se quita en la serie. Cuenta con su propio planeta, el Planeta del Gran Kaio, en el cual la gravedad es 10 veces mayor a la del planeta Tierra.",
    "originPlanetId": 20,
    "deletedAt": ""
  },
  {
    "id": 73,
    "name": "Kaio-shin del Este",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699138797/gghhwu2xdxlau1ffx87b.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Es uno de los Kaio-shin, los dioses de la creación que se encargan de crear vida en todo el Universo 7 y protegerlo de amenazas supremas.\nAnteriormente solía hacerse cargo de proteger la zona este del universo, ya que después de la muerte de los otros Kaio-shin a manos de Majin-Boo, se convirtió en el Kaio-shin principal del Universo 7.",
    "originPlanetId": 21,
    "deletedAt": ""
  },
  {
    "id": 74,
    "name": "Kaio-shin del Norte",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139066/iuu3m3wqnhwtbqzce5bg.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico",
    "gender": "Male",
    "affiliation": "Other",
    "description": "El Kaiō-shin del Norte es otro de los Kaiō-shin que vivió junto a el resto de los Kaio-shin y Dai Kaio-shin hace 5 millones de años, y que luchó contra Majin Boo.",
    "originPlanetId": 22,
    "deletedAt": ""
  },
  {
    "id": 75,
    "name": "Kaio-shin del Sur",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139176/tads9xhz9ro7ko42spie.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico",
    "gender": "Male",
    "affiliation": "Other",
    "description": "El Kaio-shin del Sur fue el gobernante del cuadrante sur del universo y era el más poderoso entre los Kaio-shin.",
    "originPlanetId": 22,
    "deletedAt": ""
  },
  {
    "id": 76,
    "name": "Kaio-shin del Oeste",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139274/hcxz5pcptdevfud5mko0.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico benigno",
    "gender": "Female",
    "affiliation": "Other",
    "description": "La Kaiō-shin del Oeste es una Kaio-shin, que vivió junto a sus compañeros, fue la primera en morir en la terrible batalla librada contra Majin Boo hace 5 millones de años.",
    "originPlanetId": 22,
    "deletedAt": ""
  },
  {
    "id": 77,
    "name": "Gran Kaio-shin",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139385/souyebdax1eaeo6kihhv.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico benigno",
    "gender": "Male",
    "affiliation": "Other",
    "description": "El Gran Kaio-shin, conocido también como Sagrado Kaiosama en Hispanoamérica, era el Kaio-shin principal del Universo 7 y supervisor de los otros Kaio-shin del mismo universo.\nTras ser absorbido por Majin Boo, el Gran Kaio-shin del Universo 7 se convirtió en la faceta más dominante en Boo Gordo, aún viviendo actualmente dentro de su cuerpo a través de su espíritu.",
    "originPlanetId": 21,
    "deletedAt": ""
  },
  {
    "id": 78,
    "name": "Kibito",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699139586/xjxctyovqfkwern9qcip.webp",
    "ki": "unknown",
    "maxKi": "unknown",
    "race": "Nucleico",
    "gender": "Male",
    "affiliation": "Other",
    "description": "Kibito es el ayudante y guardaespaldas del Kaio-shin del Este. Es un experto combatiente y con ciertos poderes curativos y mágicos como corresponde a su función. Su técnica más conocida es el Kai-Kai.",
    "originPlanetId": 21,
    "deletedAt": ""
  }

];

const transformations = [
  
  {
    "id": 1,
    "name": "Goku SSJ",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050838/x8vdjitiaygwbrbh3ps9.png",
    "ki": "3 Billion",
    "characterId": 1,
    "deletedAt": ""
  },
  {
    "id": 2,
    "name": "Goku SSJ2",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050861/b4engvubliyprwpgdzns.png",
    "ki": "6 Billion",
    "characterId": 1,
    "deletedAt": ""
  },
  {
    "id": 3,
    "name": "Goku SSJ3",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050875/kw8mf7q101rjjiir387d.png",
    "ki": "24 Billion",
    "characterId": 1,
    "deletedAt": ""
  },
  {
    "id": 4,
    "name": "Goku SSJ4",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050888/iugojj27qfragm7rgum4.jpg",
    "ki": "2 Quadrillion",
    "characterId": 1,
    "deletedAt": ""
  },
  {
    "id": 5,
    "name": "Goku SSJB",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699050898/wfqyp1lornq8rpavfx04.png",
    "ki": "9 Quintillion",
    "characterId": 1,
    "deletedAt": ""
  },
  {
    "id": 7,
    "name": "Vegeta SSJ",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102175/dnbpmmovwjguohzx01lg.png",
    "ki": "330.000.000",
    "characterId": 2,
    "deletedAt": ""
  },
  {
    "id": 8,
    "name": "Vegeta SSJ2",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102306/n3fixdteu9txlu3dddmc.png",
    "ki": "24 Billion",
    "characterId": 2,
    "deletedAt": ""
  },
  {
    "id": 9,
    "name": "Vegeta SSJ4",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102363/cclvpjmuotw54t63xzgb.png",
    "ki": "1.8 Trillion",
    "characterId": 2,
    "deletedAt": ""
  },
  {
    "id": 10,
    "name": "Vegeta SSJB",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102458/ran2samfpy6eerykx7xb.png",
    "ki": "100 Quintillion",
    "characterId": 2,
    "deletedAt": ""
  },
  {
    "id": 11,
    "name": "Vegeta Mega Instinc Evil",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699102556/tccogsakz8uwwpwz0otm.png",
    "ki": "19.84 Septillion",
    "characterId": 2,
    "deletedAt": ""
  },
  {
    "id": 12,
    "name": "Piccolo Super Namekian",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103067/yaqh8ucsnimqpcfvxxih.webp",
    "ki": "2.175 Billion",
    "characterId": 3,
    "deletedAt": ""
  },
  {
    "id": 13,
    "name": "Piccolo Orange",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103138/hjgmzwrquikst59vgl1h.png",
    "ki": "41.25 Quintillion",
    "characterId": 3,
    "deletedAt": ""
  },
  {
    "id": 14,
    "name": "Freezer 2nd Form",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103384/nmxb4cjfjo5rfosxkxji.png",
    "ki": "1.060.000",
    "characterId": 5,
    "deletedAt": ""
  },
  {
    "id": 15,
    "name": "Freezer 3rd Form",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103453/ff7gj92uqoaeixpcen5d.webp",
    "ki": "2.120.000",
    "characterId": 5,
    "deletedAt": ""
  },
  {
    "id": 16,
    "name": "Freezer Perfect Form",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103535/ml30m64bnrbvfrsd0ulo.png",
    "ki": "60.000.000",
    "characterId": 5,
    "deletedAt": ""
  },
  {
    "id": 17,
    "name": "Freezer Perfect Form (Golden)",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699103644/lqyq2xsuxlw635ez09tr.png",
    "ki": "100 Quintillion",
    "characterId": 5,
    "deletedAt": ""
  },
  {
    "id": 18,
    "name": "Zarbon Monster",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115148/yqjsplbbeb2bq30cprbf.png",
    "ki": 30,
    "characterId": 6,
    "deletedAt": ""
  },
  {
    "id": 19,
    "name": "Imperfect Form",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115356/hdx9lnwyh1uoiohwzrye.png",
    "ki": "370.000.000",
    "characterId": 9,
    "deletedAt": ""
  },
  {
    "id": 20,
    "name": "Semi Perfect Form",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115417/ejtkaedhxk0tlxbvkwfa.webp",
    "ki": "897.000.000",
    "characterId": 9,
    "deletedAt": ""
  },
  {
    "id": 21,
    "name": "Super Perfect Form",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115577/amtizmras2gdswzw4pa6.png",
    "ki": "10.970.000.000",
    "characterId": 9,
    "deletedAt": ""
  },
  {
    "id": 22,
    "name": "Gohan SSJ",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115821/tqbqt5vqj30ce1ooiqsi.png",
    "ki": "4.700.000.000",
    "characterId": 10,
    "deletedAt": ""
  },
  {
    "id": 23,
    "name": "Gohan SSJ2",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699115857/rllf9puo39dhhcxhh9e7.webp",
    "ki": "10.200.000.000",
    "characterId": 10,
    "deletedAt": ""
  },
  {
    "id": 24,
    "name": "Gohan Ultimate",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116154/zqcs85a5magvi9cjsvm6.webp",
    "ki": "43.000.000.000",
    "characterId": 10,
    "deletedAt": ""
  },
  {
    "id": 25,
    "name": "Gohan Beast",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116269/thotogohux1vogilpyas.png",
    "ki": "25.6 Septillion",
    "characterId": 10,
    "deletedAt": ""
  },
  {
    "id": 26,
    "name": "Trunks SSJ",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116809/ar639rlkzcqjmnlvmrq7.png",
    "ki": "905.000.000",
    "characterId": 16,
    "deletedAt": ""
  },
  {
    "id": 27,
    "name": "Trunks SSJ2",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699116921/hbt3qrbu86zactkkfgm3.jpg",
    "ki": "18.000.000.000",
    "characterId": 16,
    "deletedAt": ""
  },
  {
    "id": 28,
    "name": "Trunks SSJ3",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117200/yswhfez5fdbteuyvghds.webp",
    "ki": "1.25 Billion",
    "characterId": 16,
    "deletedAt": ""
  },
  {
    "id": 29,
    "name": "Trunks Rage",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117449/pj6jix0qmbffmammeedo.png",
    "ki": "17.5 Quintillion",
    "characterId": 16,
    "deletedAt": ""
  },
  {
    "id": 30,
    "name": "Gotenks SSJ",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117748/ejdwijlhlfc8mhvb0fpn.png",
    "ki": "5.7 Billion",
    "characterId": 15,
    "deletedAt": ""
  },
  {
    "id": 31,
    "name": "Gotenks SSJ3",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699117802/iasvpxc7urinhfwriwfn.webp",
    "ki": "45.6 Billion",
    "characterId": 15,
    "deletedAt": ""
  },
  {
    "id": 32,
    "name": "Super Buu",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699118823/dis9ipwwvohtfmy1peyu.webp",
    "ki": "5.670.000.000",
    "characterId": 32,
    "deletedAt": ""
  },
  {
    "id": 33,
    "name": "Majin Buu (Gotenks)",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699118971/pimtawxtqt8wtml5t8wk.png",
    "ki": "12.300.000.000",
    "characterId": 32,
    "deletedAt": ""
  },
  {
    "id": 34,
    "name": "Majin Buu (Gohan)",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119043/ajvq0rfmeqh5fstmmq2q.webp",
    "ki": "14.800.000.000",
    "characterId": 32,
    "deletedAt": ""
  },
  {
    "id": 35,
    "name": "Majin Buu (Pure)",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119236/tqbwgmghi4ir47xltk3z.png",
    "ki": "4.000.000.000",
    "characterId": 32,
    "deletedAt": ""
  },
  {
    "id": 36,
    "name": "Gogeta SSJ",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119709/mevkuuaqnbwrm1beiorc.png",
    "ki": "6.3 sextillion",
    "characterId": 65,
    "deletedAt": ""
  },
  {
    "id": 37,
    "name": "Gogeta SSJ4",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119779/c6owx20373wbh3q9dynw.png",
    "ki": "168 quadrillion",
    "characterId": 65,
    "deletedAt": ""
  },
  {
    "id": 38,
    "name": "Gogeta SSJB",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119800/i4bebw9a4pw3yzk1rrmc.png",
    "ki": "12.6 septillion",
    "characterId": 65,
    "deletedAt": ""
  },
  {
    "id": 39,
    "name": "Gogeta SSJB Evolved",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699119863/nc1bhpdpzspbd8yxnt97.png",
    "ki": "1.26 octillion",
    "characterId": 65,
    "deletedAt": ""
  },
  {
    "id": 40,
    "name": "Vegetto SSJ",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120073/wjpgltaxk350sl3lnxct.png",
    "ki": "9 Trillion",
    "characterId": 66,
    "deletedAt": ""
  },
  {
    "id": 41,
    "name": "Vegetto SSJB",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120135/z0gbiyenfmdemzf1vvxv.png",
    "ki": "10.8 Septillion",
    "characterId": 66,
    "deletedAt": ""
  },
  {
    "id": 42,
    "name": "Super Janemba",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699120959/bo6n1qvcc1tzq2jyzyhq.webp",
    "ki": "75 Billion",
    "characterId": 67,
    "deletedAt": ""
  },
  {
    "id": 43,
    "name": "Broly SSJ Legendary",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699121913/bwa20djt8ekpcydxm6lf.webp",
    "ki": "11.2 Septillion",
    "characterId": 68,
    "deletedAt": ""
  },
  {
    "id": 44,
    "name": "Goku Ultra Instinc",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123373/tmj6mkodjqbxlc6d3qfi.png",
    "ki": "90 Septillion",
    "characterId": 1,
    "deletedAt": ""
  }

];

const planets = [
  
  {
    "id": 1,
    "name": "Namek",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145134/wxedvvh8kiyw00psvphl.webp",
    "isDestroyed": 1,
    "description": "Planeta natal de los Namekianos. Escenario de importantes batallas y la obtención de las Dragon Balls de Namek.",
    "deletedAt": ""
  },
  {
    "id": 2,
    "name": "Tierra",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145184/yq8zw7kk4fmhgyj4z0c7.webp",
    "isDestroyed": 0,
    "description": "La Tierra también llamado Mundo del Dragón (Dragon World), es el planeta principal donde se desarrolla la serie de Dragon Ball. Se encuentra en el Sistema Solar de la Vía Láctea de las Galaxias del Norte del Universo 7, lugar que supervisa el Kaio del Norte, y tiene su equivalente en el Universo 6. El hogar de los terrícolas y los Guerreros Z. Ha sido atacado en varias ocasiones por enemigos poderosos.",
    "deletedAt": ""
  },
  {
    "id": 3,
    "name": "Vegeta",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145235/tuxongfmdhde18bhkvo3.webp",
    "isDestroyed": 1,
    "description": "El planeta Vegeta, conocido como planeta Plant antes del fin de la Guerra Saiyan-tsufruiana en el año 730, es un planeta rocoso ficticio de la serie de manga y anime Dragon Ball y localizado en la Vía Láctea de las Galaxias del Norte del Universo 7 hasta su destrucción a manos de Freezer en los años 737-739. Planeta natal de los Saiyans, destruido por Freezer. Anteriormente conocido como Planeta Plant.",
    "deletedAt": ""
  },
  {
    "id": 4,
    "name": "Freezer No. 79",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145256/d1vystda6qykng2jgyl9.webp",
    "isDestroyed": 1,
    "description": "Planeta artificial utilizado por Freezer como base de operaciones y centro de clonación.",
    "deletedAt": ""
  },
  {
    "id": 5,
    "name": "Kanassa",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145275/z3ilwrgtjs3ydzn7fnuz.webp",
    "isDestroyed": 1,
    "description": "Planeta habitado por los Kanassans y conocido por la lucha entre Bardock y los habitantes del planeta.",
    "deletedAt": ""
  },
  {
    "id": 6,
    "name": "Monmar",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145287/aiqfvaq5c1ra0z7n6dj6.webp",
    "isDestroyed": 0,
    "description": "Planeta donde Gohan y Krillin encontraron las Dragon Balls para revivir a sus amigos durante la Saga de Namek.",
    "deletedAt": ""
  },
  {
    "id": 7,
    "name": "Yardrat",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145308/lsmpf6d0maaxnxebwjae.webp",
    "isDestroyed": 0,
    "description": "Planeta de la técnica Instant Transmission, aprendida por Goku durante su estancia.",
    "deletedAt": ""
  },
  {
    "id": 11,
    "name": "Kaiō del Norte",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145347/sptximzpi1kike83bpue.webp",
    "isDestroyed": 0,
    "description": "El Planeta Kaio se encuentra al final del largo Camino de la Serpiente. Es donde viven el Kaio del Norte, su mascota Bubbles, al que utiliza como parte de su entrenamiento, y Gregory.",
    "deletedAt": ""
  },
  {
    "id": 13,
    "name": "Makyo",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145368/zjrixubdmmoxnx04nm5w.webp",
    "isDestroyed": 0,
    "description": "Makyo es un planeta y la fuente de alimentación de todos los malévolos, especialmente Garlic Jr., que solo aparece durante el Arco de Garlic Jr. de Dragon Ball Z.",
    "deletedAt": ""
  },
  {
    "id": 14,
    "name": "Babari",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145390/iwm1l1j9v0s6cjthztcp.webp",
    "isDestroyed": 0,
    "description": "Planeta habitado por los Babari, es un planeta telúrico del Universo 10 donde residen los babarianos, hizo su primera aparición en el episodio 54 de Dragon Ball Super. Es donde Tarble, el hermano de Vegeta, se refugió.",
    "deletedAt": ""
  },
  {
    "id": 15,
    "name": "Tsufur (Universo 6)",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145436/h5djj2mr0xii8ljq7d5b.webp",
    "isDestroyed": 0,
    "description": "Planeta natal de los Tsufur, la raza a la que pertenecía el Dr. Raichi.",
    "deletedAt": ""
  },
  {
    "id": 16,
    "name": "Desconocido",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145640/arclw31gjcc1ct8kmmho.png",
    "isDestroyed": 0,
    "description": "Sin informacion",
    "deletedAt": ""
  },
  {
    "id": 18,
    "name": "Otro Mundo",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146163/tn7auh3pfpbzs10i0ppa.webp",
    "isDestroyed": 0,
    "description": "El Otro Mundo en contraparte al Mundo de los vivos, es, en Dragon Ball, la versión del mundo de los muertos. Es donde los personajes van cuando mueren, y también donde residen las deidades superiores del universo. En el episodio 53 del anime, el Otro Mundo fue descrito como \"la dimensión siguiente\", y el acto de desear traer a la vida a una persona muerta con las Esferas del Dragón se llama \"traer (a ellos) a esta dimensión.",
    "deletedAt": ""
  },
  {
    "id": 19,
    "name": "Planeta de Bills",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146331/jgmkxichfmsbtd2hmkcd.webp",
    "isDestroyed": 0,
    "description": "Planeta de Bills un cuerpo celeste ubicado dentro del mundo de los vivos del Universo 7, el cual aparece por primera vez en la película Dragon Ball Z: La Batalla de los Dioses.",
    "deletedAt": ""
  },
  {
    "id": 20,
    "name": "Planeta del Gran Kaio",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146413/yispjokzfxukeotntxof.webp",
    "isDestroyed": 0,
    "description": "El Planeta del Gran Kaio es donde se organiza el Torneo de Artes Marciales del Otro Mundo en honor a la muerte del Kaio del Norte (Kaito), donde participan guerreros poderosos.",
    "deletedAt": ""
  },
  {
    "id": 21,
    "name": "Nucleo del Mundo",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699145992/waomuzjcfz53ncny5sdo.webp",
    "isDestroyed": 0,
    "description": "El Núcleo del Mundo es el planeta nativo de toda la especie nucleica, del cual surgen los benévolos Kaio y Kaio-shin, así como los malévolos Makaio, Makaio-shin y Dioses Demoníacos en contrapartida.",
    "deletedAt": ""
  },
  {
    "id": 22,
    "name": "Planeta sagrado",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146458/l9zvxxhxxeg1hjntexwx.webp",
    "isDestroyed": 0,
    "description": "El Planeta Sagrado es el planeta localizado en el Reino Kaio-shin donde residen los Kaio-shin del Universo 7. No debe ser confundido con el Núcleo del Mundo.El Reino de los Kaio-shin, en el cual se encuentra localizado el planeta, es un reino especial completamente separado en el macrocosmos del Universo 7, es decir, está separado del Otro Mundo, del Mundo de los vivos y del Reino Demoníaco Oscuro.",
    "deletedAt": ""
  },
  {
    "id": 23,
    "name": "Nuevo Planeta Tsufrui",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699146903/ttfkatsdjmahmhpmzrwv.webp",
    "isDestroyed": 0,
    "description": "El Nuevo Planeta Plant, también conocido como el Nuevo Planeta Tsufru, es el nombre que se le da al nuevo hogar de los Tsufruianos controlados por Vegeta Baby, ocasionado gracias al deseo concedido por medio de las Esferas del Dragón Definitivas de restaurar el Planeta Plant en la órbita de la Tierra.",
    "deletedAt": ""
  },
  {
    "id": 24,
    "name": "Templo móvil del Rey de Todo",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699142397/f2chnny1kxsvsrpl44y3.webp",
    "isDestroyed": 0,
    "description": "El templo móvil del Rey de Todo (sala del trono), es como su nombre lo indica, un templo móvil en el cual reside los tronos de los dos Reyes de Todo en el Lugar de Supervivencia en Dragon Ball Super.",
    "deletedAt": ""
  },
  {
    "id": 25,
    "name": "Universo 11",
    "image": "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699151376/bavjiwcztgoixsek1ym1.webp",
    "isDestroyed": 0,
    "description": "El Universo 11, es, como su nombre lo indica, el undécimo de los doce universos existentes actualmente en el mundo de Dragon Ball. Este es gemelo del Universo 2 y el lugar de origen de las Tropas del Orgullo.",
    "deletedAt": ""
  }

];