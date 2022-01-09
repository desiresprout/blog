import { PrismaClient, Prisma } from '@prisma/client';
import * as faker from 'faker';
import * as dayjs from 'dayjs';
// const dayjs = require('dayjs')

const prisma = new PrismaClient();

const loop = 5000;

const postData: Prisma.PostCreateInput[] = [];

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const currentDayjs = dayjs();

let o = 0;

for (let i = 0; i < loop; i++) {
  const data: any = {
    title: faker.name.title(),
    body: faker.name.jobDescriptor(),
    userId: 1,
    is_private: !!faker.datatype.number({ min: 0, max: 1 }),
    is_deleted: !!faker.datatype.number({ min: 0, max: 1 }),
    created_at: new Date(currentDayjs.add(o, 'minute').format(dateFormat)),
  };
  postData.push(data);
  o++;
}

const commentData = [];

let j = 0;

for (let i = 0; i < loop; i++) {
  const data = {
    postId: faker.datatype.number({ min: 1, max: 2 }),
    comment: faker.name.jobDescriptor(),
    depth: faker.datatype.number({ min: 0, max: 1 }),
    is_deleted: !!faker.datatype.number({ min: 0, max: 0 }),
    created_at: new Date(currentDayjs.add(j, 'minute').format(dateFormat)),
  };
  commentData.push(data);
  j++;
}

async function main() {
  console.log(`Seeding`);
  await prisma.user.createMany({
    data: [
      {
        email: '1',
        password: '2',
      },
    ],
    skipDuplicates: false,
  });
  await prisma.post.createMany({
    data: postData as any,
    skipDuplicates: false,
  });
  await prisma.comment.createMany({
    data: commentData,
    skipDuplicates: false,
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
