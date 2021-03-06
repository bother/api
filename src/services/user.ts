import moment from 'moment'
import { MongooseFilterQuery } from 'mongoose'
import { Inject, Service } from 'typedi'

import { auth } from '../lib'
import { Post, PostModel, User, UserModel } from '../models'
import { SignUpArgs } from '../types/args'
import { AuthResult } from '../types/graphql'
import { PostService } from './post'

@Service()
export class UserService {
  @Inject()
  posts!: PostService

  async signUp({ deviceId, pushToken }: SignUpArgs): Promise<AuthResult> {
    const exists = await UserModel.findOne({
      deviceId
    })

    if (exists) {
      const token = auth.createToken(exists)

      return {
        token,
        user: exists
      }
    }

    const user = new UserModel()

    user.deviceId = deviceId
    user.pushToken = pushToken

    await user.save()

    const token = auth.createToken(user)

    return {
      token,
      user
    }
  }

  async fetchPosts(user: User, before?: string): Promise<Post[]> {
    const query: MongooseFilterQuery<Post> = {
      user
    }

    if (before) {
      query.createdAt = {
        $lt: moment(before).toDate()
      }
    }

    const posts = await PostModel.find(query)
      .sort({
        createdAt: -1
      })
      .populate('user')
      .limit(100)

    await this.posts.fetchLikes(user, posts)

    return posts
  }
}
