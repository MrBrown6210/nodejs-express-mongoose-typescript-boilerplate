import { IStore } from '@/models/store.model'
import faker from 'faker'
import request from 'supertest'
import app from '@/app'
import setupTestDB from '../utils/setupTestDB'

setupTestDB()

describe('Store Routes', () => {
  describe('POST /stores', () => {
    let newStore: IStore

    beforeEach(() => {
      newStore = {
        name: faker.name.findName(),
        description: faker.lorem.word(5),
        image: faker.image.business(200, 100),
      }
    })

    it('should return store with 200 status', async () => {
      const res = await request(app).post('/stores').send({ store: newStore }).expect(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('image')
    })

    it('should return 400 status if name is less than 3 characters', async () => {
      newStore.name = 'xx'
      await request(app).post('/stores').send({ store: newStore }).expect(400)
    })
  })

  describe('GET /stores', () => {
    it('should return stores array with 200 status ', async () => {
      const res = await request(app).get('/stores').expect(200)
      expect(res.body).toEqual([])
    })
  })
})
