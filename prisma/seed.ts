import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const markdown = `
## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

## Lists

* Item 1
* Item 2
* Item 2a
* Item 2b

## Blocks of code

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`
`

async function main() {
  console.log(`Start seeding ...`)

  // Create tags first
  const dragonsTag = await prisma.tag.upsert({
    where: { name: 'dragons' },
    update: {},
    create: { id: randomUUID(), name: 'dragons' },
  })

  const trainingTag = await prisma.tag.upsert({
    where: { name: 'training' },
    update: {},
    create: { id: randomUUID(), name: 'training' },
  })

  const markdownTag = await prisma.tag.upsert({
    where: { name: 'markdown' },
    update: {},
    create: { id: randomUUID(), name: 'markdown' },
  })

  const welcomeTag = await prisma.tag.upsert({
    where: { name: 'welcome' },
    update: {},
    create: { id: randomUUID(), name: 'welcome' },
  })

  // Create user Alice
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      id: randomUUID(),
      username: 'Alice',
      password: '123456',
      email: 'alice@prisma.io',
      bio: 'I like turtles.',
      image: 'https://i.pravatar.cc/150?u=alice',
    },
  })

  // Create articles for Alice
  const article1Id = randomUUID()
  await prisma.article.upsert({
    where: { slug: 'how-to-train-your-dragon' },
    update: {},
    create: {
      id: article1Id,
      title: 'How to train your dragon',
      slug: 'how-to-train-your-dragon',
      description: 'Ever wonder how?',
      body: 'You have to believe',
      authorId: alice.id,
      updatedAt: new Date(),
    },
  })

  // Link article to tags
  await prisma.articlesTags.upsert({
    where: { articleId_tagId: { articleId: article1Id, tagId: dragonsTag.id } },
    update: {},
    create: { articleId: article1Id, tagId: dragonsTag.id },
  })

  await prisma.articlesTags.upsert({
    where: { articleId_tagId: { articleId: article1Id, tagId: trainingTag.id } },
    update: {},
    create: { articleId: article1Id, tagId: trainingTag.id },
  })

  const article2Id = randomUUID()
  await prisma.article.upsert({
    where: { slug: 'markdown-syntax-guide' },
    update: {},
    create: {
      id: article2Id,
      title: 'Markdown syntax guide',
      slug: 'markdown-syntax-guide',
      description: 'Learn markdown basics',
      body: markdown,
      authorId: alice.id,
      updatedAt: new Date(),
    },
  })

  await prisma.articlesTags.upsert({
    where: { articleId_tagId: { articleId: article2Id, tagId: markdownTag.id } },
    update: {},
    create: { articleId: article2Id, tagId: markdownTag.id },
  })

  // Create user Gerome
  const gerome = await prisma.user.upsert({
    where: { email: 'gerome@realworld.io' },
    update: {},
    create: {
      id: randomUUID(),
      username: 'Gerome',
      password: '123456',
      email: 'gerome@realworld.io',
      bio: 'Hello followers.',
      image: 'https://i.pravatar.cc/150?u=gerome',
    },
  })

  const article3Id = randomUUID()
  await prisma.article.upsert({
    where: { slug: 'welcome-to-realworld-project' },
    update: {},
    create: {
      id: article3Id,
      title: 'Welcome to RealWorld project',
      slug: 'welcome-to-realworld-project',
      description: 'Introduction to the project',
      body: 'See how the exact same Medium.com clone (called Conduit) is built using different frontends and backends.',
      authorId: gerome.id,
      updatedAt: new Date(),
    },
  })

  await prisma.articlesTags.upsert({
    where: { articleId_tagId: { articleId: article3Id, tagId: welcomeTag.id } },
    update: {},
    create: { articleId: article3Id, tagId: welcomeTag.id },
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
