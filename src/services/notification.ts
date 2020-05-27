import { Service } from 'typedi'

import { Notification, NotificationModel, Post, User } from '../models'

@Service()
export class NotificationService {
  async count(user: User): Promise<number> {
    return NotificationModel.countDocuments({
      unread: true,
      user
    })
  }

  async fetch(user: User): Promise<Notification[]> {
    const notifications = await NotificationModel.find({
      user
    }).sort({
      createdAt: -1
    })

    return notifications
  }

  async markAsRead(user: User, id: string): Promise<boolean> {
    await NotificationModel.findOneAndUpdate(
      {
        _id: id,
        user
      },
      {
        unread: false
      }
    )

    return true
  }

  async comment(post: Post): Promise<void> {
    await NotificationModel.findOneAndUpdate(
      {
        action: 'comment',
        targetId: post.id,
        targetType: 'post',
        user: post.user
      },
      {
        unread: true
      },
      {
        upsert: true
      }
    )

    // push
  }
}