import { Router } from 'express'
import { ReviewController } from '../../controllers/review.c'

export class ReviewLayer extends ReviewController {
	router: Router = Router()

	constructor() {
		super()
		this.layer()
	}

	public layer() {
		this.router.get('/', this.getReview)
		this.router.post('/', this.addReview)
		this.router.put('/', this.updateReview)
		this.router.delete('/', this.deleteReview)
		this.router.get('/retrieve', this.getReviewByQuery)
		this.router.get('/join', this.getReviewWithWorkspaceAndUser)
	}
}

export const review = new ReviewLayer()
