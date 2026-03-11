import { NextRequest } from 'next/server'
import { prisma } from '@/libs/prisma'
import slug from 'slug'
import { ApiResponse } from '@/app/api/response'
import getCurrentUser from '@/actions/getCurrentUser'
import { articleInputSchema } from '@/validation/schema'

export const POST = async (req: NextRequest) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return ApiResponse.unauthorized()
  }
  const body = await req.json()

  const result = articleInputSchema.safeParse(body.article)
  if (!result.success) {
    return ApiResponse.badRequest(result.error)
  }

  const { title, description = '', body: articleBody, tagList } = result.data

  const isSlugExist = async (slug: string) => {
    return !!(await prisma.article.findFirst({ where: { slug } }))
  }

  const baseSlug = slug(title)
  let slugTitle = baseSlug
  let counter = 1
  while ((await isSlugExist(slugTitle)) && counter < 100) {
    slugTitle = `${baseSlug}-${counter}`
    counter++
  }

  try {
    const article = await prisma.article.create({
      data: {
        title,
        slug: slugTitle,
        description,
        body: articleBody,
        authorId: currentUser.id,
      },
    })

    if (tagList && tagList.length > 0) {
      for (const tagName of tagList) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        })
        await prisma.articlesTags.create({
          data: {
            articleId: article.id,
            tagId: tag.id,
          },
        })
      }
    }

    return ApiResponse.ok({ article })
  } catch (e: unknown) {
    return ApiResponse.badRequest('Create article failed')
  }
}
