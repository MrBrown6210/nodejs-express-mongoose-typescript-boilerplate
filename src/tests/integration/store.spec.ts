import { IStore } from '@/models/store.model'
import faker from 'faker'
import request from 'supertest'
import app from '@/app'
import setupTestDB from '../utils/setupTestDB'

setupTestDB()

describe('Store Routes', () => {
  let newStore: IStore

  beforeEach(() => {
    newStore = {
      name: faker.name.findName(),
      description: faker.lorem.word(5),
      image: faker.image.business(200, 100),
    }
  })

  describe('POST /stores', () => {
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

  describe('GET /store', () => {
    it('should return store with 200 status ', async () => {
      const resInsert = await request(app).post('/stores').send({ store: newStore }).expect(200)
      const res = await request(app).get(`/stores/${resInsert.body._id}`).expect(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('image')
    })

    it('should return 404 error if not found store by id ', async () => {
      await request(app).get('/stores/60aa2e8ed87c9ffe67df0000').expect(404)
    })
  })

  describe('PATCH /store', () => {
    it('should return store with 200 status ', async () => {
      const resInsert = await request(app).post('/stores').send({ store: newStore }).expect(200)

      const updateStore: IStore = {
        name: faker.name.findName(),
        description: faker.lorem.word(5),
        image: faker.image.business(200, 100),
      }

      const res = await request(app)
        .patch(`/stores/${resInsert.body._id}`)
        .send({
          store: updateStore,
        })
        .expect(200)
      expect(res.body.name).toEqual(updateStore.name)
      expect(res.body.description).toEqual(updateStore.description)
      expect(res.body.image).toEqual(updateStore.image)
    })

    it('should return 404 error if not found store by id ', async () => {
      await request(app).patch('/stores/60aa2e8ed87c9ffe67df0000').expect(404)
    })
  })

  describe('DELETE /store', () => {
    it('should delete store with 204 status ', async () => {
      const resInsert = await request(app).post('/stores').send({ store: newStore }).expect(200)
      await request(app).delete(`/stores/${resInsert.body._id}`).expect(204)
    })

    it('should return 404 error if not found store by id ', async () => {
      await request(app).delete('/stores/60aa2e8ed87c9ffe67df0000').expect(404)
    })
  })
})
