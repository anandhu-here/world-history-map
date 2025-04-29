// apps/history-map/src/app/data/mockData.js

const mockRegions = [
  {
    id: 'europe',
    name: 'Europe',
    coordinates: [10.4515, 51.1657],
    color: '#4C8BF5',
    events: [
      {
        id: 'french-revolution',
        title: 'French Revolution',
        date: '1789-07-14',
        description:
          'The French Revolution was a period of radical political and societal change in France that began with the Estates General of 1789 and ended with the formation of the French Consulate in November 1799.\n\nDriven by Enlightenment principles, widespread fiscal crisis, and food shortages, revolutionary activity began in May 1789 with the meeting of the Estates General. A series of radical legislative acts followed, including the abolition of feudalism, the Declaration of the Rights of Man and of the Citizen, and the dechristianization of France.',
        importance: 'major',
        media: ['/assets/images/french-revolution.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/French_Revolution',
          },
        ],
      },
      {
        id: 'industrial-revolution',
        title: 'Industrial Revolution in Britain',
        date: '1760-01-01',
        description:
          'The Industrial Revolution was the transition to new manufacturing processes in Great Britain, continental Europe, and the United States, in the period from about 1760 to 1820-1840.\n\nThis transition included going from hand production methods to machines, new chemical manufacturing and iron production processes, the increasing use of steam power and water power, the development of machine tools and the rise of the mechanized factory system.',
        importance: 'major',
        media: ['/assets/images/industrial-revolution.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Industrial_Revolution',
          },
        ],
      },
      {
        id: 'world-war-1',
        title: 'World War I',
        date: '1914-07-28',
        description:
          "World War I or the First World War, often abbreviated as WWI, was a global conflict fought from 1914 to 1918. Originating in Europe, the war drew in all the world's economic great powers, which were assembled in two opposing alliances: the Allies and the Central Powers.\n\nMore than 70 million military personnel, including 60 million Europeans, were mobilized in one of the largest wars in history. An estimated 9 million combatants and 13 million civilians died as a direct result of the war, making it one of the deadliest conflicts in history.",
        importance: 'major',
        media: ['/assets/images/ww1.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/World_War_I',
          },
        ],
      },
      {
        id: 'renaissance',
        title: 'The Renaissance',
        date: '1350-01-01',
        description:
          'The Renaissance was a period in European history marking the transition from the Middle Ages to modernity and covering the 15th and 16th centuries. In addition to the standard periodization, proponents of Renaissance humanism, a system of thought that attached importance to human dignity and human values, typically date its emergence to earlier periods.\n\nCharacterized by an emphasis on the individual and human potential and achievement, the Renaissance saw a cultural rebirth that valued ancient Greek and Roman ideas, giving rise to new styles of art, architecture, and innovation.',
        importance: 'major',
        media: ['/assets/images/renaissance.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Renaissance',
          },
        ],
      },
    ],
  },
  {
    id: 'north-america',
    name: 'North America',
    coordinates: [-105.2551, 54.526],
    color: '#EA4335',
    events: [
      {
        id: 'american-revolution',
        title: 'American Revolution',
        date: '1775-04-19',
        description:
          'The American Revolution was an ideological and political revolution that occurred in colonial North America between 1765 and 1783. The Americans in the Thirteen Colonies defeated the British in the American Revolutionary War, gaining independence from the British Crown and establishing the United States of America.\n\nThe revolution was driven by numerous factors, including long-simmering tensions over tax policy, political rights, and colonial self-governance.',
        importance: 'major',
        media: ['/assets/images/american-revolution.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/American_Revolution',
          },
        ],
      },
      {
        id: 'civil-war',
        title: 'American Civil War',
        date: '1861-04-12',
        description:
          'The American Civil War was a civil war in the United States fought between northern and southern states from 1861 to 1865. The central cause of the war was the status of slavery, especially the expansion of slavery into territories acquired during the Louisiana Purchase and the Mexican–American War.\n\nThe conflict began primarily as a result of the long-standing controversy over the enslavement of black people, and became a direct confrontation by 1861 when seven Southern slave states seceded and formed the Confederate States of America after Abraham Lincoln won the 1860 United States presidential election on a platform of halting the expansion of slavery.',
        importance: 'major',
        media: ['/assets/images/civil-war.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/American_Civil_War',
          },
        ],
      },
      {
        id: 'gold-rush',
        title: 'California Gold Rush',
        date: '1848-01-24',
        description:
          "The California Gold Rush (1848–1855) was a gold rush that began on January 24, 1848, when gold was found by James W. Marshall at Sutter's Mill in Coloma, California. The news of gold brought approximately 300,000 people to California from the rest of the United States and abroad. The sudden influx of gold into the money supply reinvigorated the American economy, and the rapid population growth led to California's rapid admission to the Union as a state in 1850.",
        importance: 'moderate',
        media: ['/assets/images/gold-rush.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/California_Gold_Rush',
          },
        ],
      },
    ],
  },
  {
    id: 'asia',
    name: 'Asia',
    coordinates: [100.6197, 34.0479],
    color: '#FBBC05',
    events: [
      {
        id: 'mongol-empire',
        title: 'Rise of the Mongol Empire',
        date: '1206-01-01',
        description:
          'The Mongol Empire emerged from the unification of several nomadic tribes in the Mongol homeland under the leadership of Genghis Khan. It was the largest contiguous land empire in history, spanning from Eastern Europe and parts of Central Europe to the Sea of Japan, extending northward into parts of the Arctic and southward into the Indian subcontinent, Indochina, and the Iranian Plateau.\n\nThe Mongol Empire facilitated communication and trade between the East, West, and the Middle East in the period of the 13th and 14th centuries, creating the first international postal service.',
        importance: 'major',
        media: ['/assets/images/mongol-empire.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Mongol_Empire',
          },
        ],
      },
      {
        id: 'opium-wars',
        title: 'Opium Wars',
        date: '1839-01-01',
        description:
          "The Opium Wars were two wars waged between the Qing dynasty and Western powers in the mid-19th century. The First Opium War, fought in 1839–1842 between the Qing and Great Britain, was triggered by the dynasty's campaign against the British merchants who sold opium to Chinese merchants.\n\nThe Second Opium War was fought between the Qing and Britain and France, 1856–1860. The wars and events between them weakened the Qing dynasty and forced China to trade with the Western powers.",
        importance: 'major',
        media: ['/assets/images/opium-wars.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Opium_Wars',
          },
        ],
      },
      {
        id: 'meiji-restoration',
        title: 'Meiji Restoration',
        date: '1868-01-03',
        description:
          'The Meiji Restoration was an event that restored practical imperial rule to the Empire of Japan in 1868 under Emperor Meiji. Although there were ruling emperors before the Meiji Restoration, the events restored practical abilities and consolidated the political system under the emperor\'s authority.\n\nThe goals of the restored government were expressed by the new emperor in the Charter Oath, which included "deliberative assemblies," the unification of classes, and seeking knowledge throughout the world to strengthen the foundations of imperial rule.',
        importance: 'moderate',
        media: ['/assets/images/meiji-restoration.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Meiji_Restoration',
          },
        ],
      },
    ],
  },
  {
    id: 'africa',
    name: 'Africa',
    coordinates: [19.4902, 8.7832],
    color: '#34A853',
    events: [
      {
        id: 'ancient-egypt',
        title: 'Ancient Egyptian Civilization',
        date: '3100-01-01',
        description:
          'Ancient Egypt was a civilization of ancient North Africa, concentrated along the lower reaches of the Nile River, situated in the place that is now the country Egypt. Ancient Egyptian civilization followed prehistoric Egypt and coalesced around 3100 BCE with the political unification of Upper and Lower Egypt under Menes.\n\nThe history of ancient Egypt occurred as a series of stable kingdoms, separated by periods of relative instability known as Intermediate Periods: the Old Kingdom, the Middle Kingdom, and the New Kingdom.',
        importance: 'major',
        media: ['/assets/images/ancient-egypt.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Ancient_Egypt',
          },
        ],
      },
      {
        id: 'scramble-for-africa',
        title: 'Scramble for Africa',
        date: '1881-01-01',
        description:
          'The Scramble for Africa, also called the Partition of Africa, Conquest of Africa, or the Race for Africa, was the invasion, occupation, division, and colonization of most of Africa by seven Western European powers during a short period known as the New Imperialism (between 1881 and 1914).\n\nThe 10 percent of Africa that was under formal European control in 1870 increased to almost 90 percent by 1914, with only Ethiopia (Abyssinia) and Liberia remaining independent.',
        importance: 'major',
        media: ['/assets/images/scramble-for-africa.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Scramble_for_Africa',
          },
        ],
      },
      {
        id: 'great-zimbabwe',
        title: 'Great Zimbabwe',
        date: '1100-01-01',
        description:
          "Great Zimbabwe was a medieval city in the southeastern hills of Zimbabwe near Lake Mutirikwe and the town of Masvingo. It was the capital of the Kingdom of Zimbabwe during the country's Late Iron Age. Construction on the city began in the 11th century and continued until it was abandoned in the 15th century.\n\nThe edifices were built by the ancestral Shona. The stone city spans an area of 7.22 square kilometres which, at its peak, could have housed up to 18,000 people.",
        importance: 'moderate',
        media: ['/assets/images/great-zimbabwe.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Great_Zimbabwe',
          },
        ],
      },
    ],
  },
  {
    id: 'south-america',
    name: 'South America',
    coordinates: [-58.93, -23.698],
    color: '#AA46BC',
    events: [
      {
        id: 'inca-empire',
        title: 'Inca Empire',
        date: '1438-01-01',
        description:
          'The Inca Empire, also known as the Incan Empire and the Inka Empire, was the largest empire in pre-Columbian America. The administrative, political and military center of the empire was in the city of Cusco. The Inca civilization arose from the Peruvian highlands sometime in the early 13th century.\n\nFrom 1438 to 1533, the Incas incorporated a large portion of western South America, centered on the Andean Mountains, using conquest and peaceful assimilation, among other methods.',
        importance: 'major',
        media: ['/assets/images/inca-empire.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Inca_Empire',
          },
        ],
      },
      {
        id: 'latin-american-independence',
        title: 'Latin American Independence',
        date: '1810-01-01',
        description:
          'The Latin American Wars of Independence were the various revolutions that took place during the late 18th and early 19th centuries and resulted in the creation of a number of independent countries in Latin America. These revolutions followed the American and French Revolutions, which had profound effects on the Spanish, Portuguese, and French colonies in the Americas.\n\nThe main independence movements started in 1810, when the Spanish were occupied with the Peninsular War during the Napoleonic conflict and the Primera Junta was created in Buenos Aires.',
        importance: 'major',
        media: ['/assets/images/latin-american-independence.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Latin_American_wars_of_independence',
          },
        ],
      },
      {
        id: 'amazon-rubber-boom',
        title: 'Amazon Rubber Boom',
        date: '1879-01-01',
        description:
          'The Amazon rubber boom was a period in the history of South America where the economies of Peru, Colombia, Ecuador, and especially Brazil, were heavily influenced by the extraction and commercialization of rubber.\n\nThe boom began in the 1870s when rubber demand spiked due to the invention of vulcanized rubber and the growing automobile industry. The boom led to a large migration of workers into the Amazon Basin, and the establishment of rubber plantations.',
        importance: 'moderate',
        media: ['/assets/images/amazon-rubber-boom.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Amazon_rubber_boom',
          },
        ],
      },
    ],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    coordinates: [134.4927, -25.2744],
    color: '#FF6D01',
    events: [
      {
        id: 'aboriginal-settlement',
        title: 'Aboriginal Settlement of Australia',
        date: '-50000-01-01',
        description:
          'The Aboriginal Australians are the various Indigenous peoples of the Australian mainland and many of its islands, such as Tasmania, Fraser Island, Hinchinbrook Island, the Tiwi Islands, and Groote Eylandt. The term Aboriginal Australians refers to several separate peoples, who have developed across Australia for over 50,000 years.\n\nThese peoples have a broadly shared, though complex, genetic history, but it is only in the last two hundred years that they have been defined and started to self-identify as a single group.',
        importance: 'major',
        media: ['/assets/images/aboriginal-settlement.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Aboriginal_Australians',
          },
        ],
      },
      {
        id: 'polynesian-expansion',
        title: 'Polynesian Expansion',
        date: '1000-01-01',
        description:
          'The Polynesian expansion was the prehistoric settlement of the Polynesian islands in the Pacific Ocean. Polynesians are famous for their voyages in canoes which were large enough to accommodate up to 80 people and capable of traveling thousands of miles.\n\nThe expansion began from the Samoan Islands into the Tuvaluan atolls, with Polynesians settling the Polynesian outliers in Melanesia and Micronesia, then migrating to the archipelagoes of the Cook Islands, Tahiti and the Marquesas, and from these to Hawaii, Easter Island, and New Zealand.',
        importance: 'major',
        media: ['/assets/images/polynesian-expansion.jpg'],
        links: [
          {
            text: 'Learn more on Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Polynesia',
          },
        ],
      },
    ],
  },
];

export default mockRegions;
