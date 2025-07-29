import { Player, Question, Category } from '../types';

export const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'Summoner 1', score: 0 },
  { id: '2', name: 'Summoner 2', score: 0 },
  { id: '3', name: 'Summoner 3', score: 0 },
  { id: '4', name: 'Summoner 4', score: 0 },
  { id: '5', name: 'Summoner 5', score: 0 },
  { id: '6', name: 'Summoner 6', score: 0 },
  { id: '7', name: 'Summoner 7', score: 0 },
];

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 'champions',
    name: 'Champions',
    color: 'blue',
    bg: '/champs.jpg',
    questions: [
      {
        id: 'champ-100',
        type: 'text',
        content: 'Which champion is known as "The Blade Dancer"?',
        answer: 'Irelia',
        basePoints: 100,
        currentPoints: 100,
        category: 'champions',
        pointDeduction: 10,
        hint: {
          type: 'text',
          content: 'This champion is from Ionia and uses blade-like weapons that float around her.'
        },
        isCompleted: false,
      },
      {
        id: 'champ-200',
        type: 'progressive',
        content: 'Identify this champion from the zoomed image',
        answer: 'Azir',
        basePoints: 200,
        currentPoints: 200,
        category: 'champions',
        pointDeduction: 20,
        imageUrl: '/Vayne.jpg',
        zoomLevel: 300,
        zoomOrigin: 'top-left',
        hint: {
          type: 'text',
          content: 'This champion is known as the Emperor of Shurima and commands sand soldiers.'
        },
        isCompleted: false,
      },
      {
        id: 'champ-300',
        type: 'image',
        content: 'Which skin is this?',
        answer: 'Spirit Blossom Ahri',
        answerImage: 'https://images.pexels.com/photos/7862604/pexels-photo-7862604.jpeg?auto=compress&cs=tinysrgb&w=600',
        basePoints: 300,
        currentPoints: 300,
        category: 'champions',
        pointDeduction: 15,
        imageUrl: 'https://images.pexels.com/photos/7862604/pexels-photo-7862604.jpeg?auto=compress&cs=tinysrgb&w=400',
        hint: {
          type: 'image',
          content: 'Hint image for Spirit Blossom Ahri',
          imageUrl: 'https://images.pexels.com/photos/7862604/pexels-photo-7862604.jpeg?auto=compress&cs=tinysrgb&w=200'
        },
        isCompleted: false,
      },
      {
        id: 'champ-400',
        type: 'audio',
        content: 'Identify this champion\'s ultimate ability sound',
        answer: 'Yasuo - Last Breath',
        basePoints: 400,
        currentPoints: 400,
        category: 'champions',
        pointDeduction: 20,
        audioUrl: 'https://example.com/yasuo-ult.mp3',
        hint: {
          type: 'text',
          content: 'This champion is a wind-based swordsman from Ionia with a tragic past.'
        },
        isCompleted: false,
      },
      {
        id: 'champ-500',
        type: 'text',
        content: 'What is the name of Jinx\'s ultimate ability?',
        answer: 'Super Mega Death Rocket!',
        basePoints: 500,
        currentPoints: 500,
        category: 'champions',
        pointDeduction: 25,
        hint: {
          type: 'audio',
          content: 'Jinx ultimate sound',
          audioUrl: 'https://example.com/jinx-ult.mp3'
        },
        isCompleted: false,
      },
    ],
  },
  {
    id: 'items',
    name: 'Items & Build',
    color: 'green',
    bg: '/items.webp',
    questions: [
      {
        id: 'item-100',
        type: 'text',
        content: 'Which item provides the highest amount of Attack Damage?',
        answer: 'Infinity Edge',
        basePoints: 100,
        currentPoints: 100,
        category: 'items',
        pointDeduction: 10,
        hint: {
          type: 'text',
          content: 'This item is core for critical strike builds and costs 3400 gold.'
        },
        isCompleted: false,
      },
      {
        id: 'item-200',
        type: 'image',
        content: 'What item is this?',
        answer: 'Rabadon\'s Deathcap',
        answerImage: 'https://images.pexels.com/photos/7862604/pexels-photo-7862604.jpeg?auto=compress&cs=tinysrgb&w=600',
        basePoints: 200,
        currentPoints: 200,
        category: 'items',
        pointDeduction: 15,
        imageUrl: 'https://images.pexels.com/photos/7862604/pexels-photo-7862604.jpeg?auto=compress&cs=tinysrgb&w=400',
        hint: {
          type: 'text',
          content: 'This item increases Ability Power by 35% and is essential for AP champions.'
        },
        isCompleted: false,
      },
      {
        id: 'item-300',
        type: 'text',
        content: 'Which mythic item is best for tank supports?',
        answer: 'Locket of the Iron Solari',
        basePoints: 300,
        currentPoints: 300,
        category: 'items',
        pointDeduction: 15,
        hint: {
          type: 'text',
          content: 'This item provides a shield to nearby allies and magic resist.'
        },
        isCompleted: false,
      },
      {
        id: 'item-400',
        type: 'text',
        content: 'What is the total cost of Blade of the Ruined King?',
        answer: '3200 gold',
        basePoints: 400,
        currentPoints: 400,
        category: 'items',
        pointDeduction: 20,
        hint: {
          type: 'text',
          content: 'This item deals current health damage and provides lifesteal.'
        },
        isCompleted: false,
      },
      {
        id: 'item-500',
        type: 'text',
        content: 'Which item combination creates Morellonomicon?',
        answer: 'Oblivion Orb + Blasting Wand',
        basePoints: 500,
        currentPoints: 500,
        category: 'items',
        pointDeduction: 25,
        hint: {
          type: 'text',
          content: 'This item applies Grievous Wounds and provides magic penetration.'
        },
        isCompleted: false,
      },
    ],
  },
  {
    id: 'esports',
    name: 'Esports',
    color: 'purple',
    bg: '/esports.avif',
    questions: [
      {
        id: 'esports-100',
        type: 'text',
        content: 'Which team won the 2023 World Championship?',
        answer: 'T1',
        basePoints: 100,
        currentPoints: 100,
        category: 'esports',
        pointDeduction: 10,
        hint: {
          type: 'text',
          content: 'This Korean team is led by Faker and has won multiple World Championships.'
        },
        isCompleted: false,
      },
      {
        id: 'esports-200',
        type: 'text',
        content: 'Who is known as "The Unkillable Demon King"?',
        answer: 'Faker',
        basePoints: 200,
        currentPoints: 200,
        category: 'esports',
        pointDeduction: 15,
        hint: {
          type: 'text',
          content: 'This player is considered the GOAT of League of Legends and plays mid lane.'
        },
        isCompleted: false,
      },
      {
        id: 'esports-300',
        type: 'text',
        content: 'Which region has won the most World Championships?',
        answer: 'Korea (LCK)',
        basePoints: 300,
        currentPoints: 300,
        category: 'esports',
        pointDeduction: 15,
        hint: {
          type: 'text',
          content: 'This region is known for its strategic gameplay and has dominated since Season 3.'
        },
        isCompleted: false,
      },
      {
        id: 'esports-400',
        type: 'text',
        content: 'What is the maximum number of bans per team in professional play?',
        answer: '5',
        basePoints: 400,
        currentPoints: 400,
        category: 'esports',
        pointDeduction: 20,
        hint: {
          type: 'text',
          content: 'Each team gets the same number of bans, and the total is 10.'
        },
        isCompleted: false,
      },
      {
        id: 'esports-500',
        type: 'text',
        content: 'Which player holds the record for most World Championship wins?',
        answer: 'Faker',
        basePoints: 500,
        currentPoints: 500,
        category: 'esports',
        pointDeduction: 25,
        hint: {
          type: 'text',
          content: 'This player has won 4 World Championships with T1 (formerly SKT).'
        },
        isCompleted: false,
      },
    ],
  },
  {
    id: 'lore',
    name: 'Lore & Story',
    color: 'orange',
    bg: '/story.avif',
    questions: [
      {
        id: 'lore-100',
        type: 'text',
        content: 'What is the name of the magical realm where Yordles come from?',
        answer: 'Bandle City',
        basePoints: 100,
        currentPoints: 100,
        category: 'lore',
        pointDeduction: 10,
        hint: {
          type: 'text',
          content: 'This is a mystical place that exists between the material and spirit realms.'
        },
        isCompleted: false,
      },
      {
        id: 'lore-200',
        type: 'text',
        content: 'Who is the Aspect of War?',
        answer: 'Pantheon',
        basePoints: 200,
        currentPoints: 200,
        category: 'lore',
        pointDeduction: 15,
        hint: {
          type: 'text',
          content: 'This champion wields a spear and shield, representing the constellation of war.'
        },
        isCompleted: false,
      },
      {
        id: 'lore-300',
        type: 'text',
        content: 'What is the name of Jinx\'s sister?',
        answer: 'Vi',
        basePoints: 300,
        currentPoints: 300,
        category: 'lore',
        pointDeduction: 15,
        hint: {
          type: 'text',
          content: 'This champion uses hextech gauntlets and works as an enforcer in Piltover.'
        },
        isCompleted: false,
      },
      {
        id: 'lore-400',
        type: 'text',
        content: 'Which ancient empire was ruled by Azir?',
        answer: 'Shurima',
        basePoints: 400,
        currentPoints: 400,
        category: 'lore',
        pointDeduction: 20,
        hint: {
          type: 'text',
          content: 'This desert empire was known for its sun disc and ascended warriors.'
        },
        isCompleted: false,
      },
      {
        id: 'lore-500',
        type: 'text',
        content: 'What is the name of the void creature that corrupted Kassadin\'s daughter?',
        answer: 'Malzahar',
        basePoints: 500,
        currentPoints: 500,
        category: 'lore',
        pointDeduction: 25,
        hint: {
          type: 'text',
          content: 'This champion is a prophet of the void and can summon voidlings.'
        },
        isCompleted: false,
      },
    ],
  },
  {
    id: 'gameplay',
    name: 'Gameplay',
    color: 'red',
    bg: '/gameplay.webp',
    questions: [
      {
        id: 'gameplay-100',
        type: 'text',
        content: 'What is the maximum level a champion can reach?',
        answer: '18',
        basePoints: 100,
        currentPoints: 100,
        category: 'gameplay',
        pointDeduction: 10,
        hint: {
          type: 'text',
          content: 'This is the level where champions stop gaining skill points for abilities.'
        },
        isCompleted: false,
      },
      {
        id: 'gameplay-200',
        type: 'text',
        content: 'How much gold does a cannon minion give?',
        answer: '60-90 gold',
        basePoints: 200,
        currentPoints: 200,
        category: 'gameplay',
        pointDeduction: 15,
        hint: {
          type: 'text',
          content: 'These minions are larger and tankier than regular minions and appear every third wave.'
        },
        isCompleted: false,
      },
      {
        id: 'gameplay-300',
        type: 'text',
        content: 'What is the cooldown of Flash at level 1?',
        answer: '300 seconds',
        basePoints: 300,
        currentPoints: 300,
        category: 'gameplay',
        pointDeduction: 15,
        hint: {
          type: 'text',
          content: 'This summoner spell has a 5-minute cooldown and can be reduced by certain runes.'
        },
        isCompleted: false,
      },
      {
        id: 'gameplay-400',
        type: 'text',
        content: 'How much true damage does Smite deal to monsters at level 1?',
        answer: '450',
        basePoints: 400,
        currentPoints: 400,
        category: 'gameplay',
        pointDeduction: 20,
        hint: {
          type: 'text',
          content: 'This summoner spell is essential for junglers and scales with level.'
        },
        isCompleted: false,
      },
      {
        id: 'gameplay-500',
        type: 'text',
        content: 'What is the respawn time of Baron Nashor after being killed?',
        answer: '6 minutes',
        basePoints: 500,
        currentPoints: 500,
        category: 'gameplay',
        pointDeduction: 25,
        hint: {
          type: 'text',
          content: 'This epic monster provides a powerful buff and spawns at 20 minutes.'
        },
        isCompleted: false,
      },
    ],
  },
];

export const SAMPLE_QUESTIONS: Question[] = SAMPLE_CATEGORIES.flatMap(category => category.questions);