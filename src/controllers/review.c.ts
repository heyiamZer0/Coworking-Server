import { Request, Response } from 'express'
import { C, choose } from '../types'
import { ObjectId, ReturnDocument } from 'mongodb'
import { Review } from '../models'
import { FeedbackType, ErrorType } from '../types/commons'
import { feedbackHandler } from '../utils'
import { NextFunction } from 'connect'
import { mongo } from '../db/db'

export class ReviewController {
	public async getReview(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db.collection(choose<string>('REVIEW', C)).find().toArray()) as Review[]

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get review')
		}
	}

	public async getReviewByQuery(req: Request, res: Response, next: NextFunction) {
		try {
			const response = (await mongo.db.collection(choose<string>('REVIEW', C)).find(req.query).toArray()) as Review[]
			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot get review by ID')
		}
	}

	public async addReview(req: Request, res: Response, next: NextFunction) {
		try {
			const { user_id, workspace_id } = req.body as Review

			if(await mongo.findOne({ user_id: user_id, workspace_id: workspace_id }, 'REVIEW')){
				feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, "Review already added")
			} else {
				const response = await mongo.insertOne(req.body, 'REVIEW')
				res.status(200).end(JSON.stringify(response.insertedId))
			}	
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot add review')
		}
	}

	public async deleteReview(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('REVIEW', C))
				.findOneAndDelete({ _id: new ObjectId(<string>req.body.id) })

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot delete review')
		}
	}

	public async updateReview(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await mongo.db
				.collection(choose<string>('REVIEW', C))
				.findOneAndUpdate(
					{ _id: new ObjectId(<string>req.body.id) },
					{ $set: req.body },
					{ returnDocument: ReturnDocument.AFTER, projection: { _id: 0 } }
				)

			res.setHeader('Content-type', 'application/json').status(200).end(JSON.stringify(response.ok))
		} catch (err) {
			feedbackHandler(FeedbackType.FAILURE, 400, ErrorType.GENERAL, res, next, 'Cannot update review')
		}
	}
}
