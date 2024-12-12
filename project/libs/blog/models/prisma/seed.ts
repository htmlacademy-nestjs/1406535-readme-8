import { PrismaClient } from '@prisma/client';

const PostTypes = {
  Text: 'TEXT',
  Video: 'VIDEO',
  Quota: 'QUOTA',
  Photo: 'PHOTO',
  Link: 'LINK',
} as const;

const TAGS = ['cats', 'project1000', 'money', 'NY', 'love'];

async function seedDb(prismaClient: PrismaClient) {
  function getPosts() {
    return [
      {
        type: PostTypes.Quota,
        content: "{ \"quotaText\": \"Knowledge is power.\", \"quotaAuthor\": \"Sir Francis Bacon\" }",
        userId: '7aef6925-4fe5-4057-b5cc-cc7cf214df05',
        tags: {
          connect: [
            { name: 'love' },
            { name: 'project1000' }
          ],
        }
      },
      {
        type: PostTypes.Link,
        content: "{ \"linkUrl\": \"https://ya.ru/\", \"linkDescription\": \"Advanced multilingual search engine\" }",
        userId: '7aef6925-4fe5-4057-43cc-cc7cf214df05',
        tags: {
          connect: [
            { name: 'cats' },
            { name: 'project1000' }
          ],
        }
      },
      {
        type: PostTypes.Text,
        content: "{ \"textTitle\": \"Were the Maya right: 'Are we going to die tomorrow?'\", \"textDescription\": \"The article examines the beliefs of the Maya people that have survived to the present day.\", \"textContent\": \"Absolutely all great civilizations leave prophecies and prescriptions to their descendants. Maya, as one of the most famous ancient ones, was no exception. Surprisingly, the Maya predicted many dates on which many important events for humanity were to take place.\" }",
        userId: '7aef6453-4fe5-4057-43cc-cc7cf214df05'
      }
    ]
  };

  for (const tag of TAGS) {
    await prismaClient.tag.create({ data: { name: tag }});
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        type: post.type,
        content: post.content,
        userId: post.userId,
        tags: post.tags,
      }
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
