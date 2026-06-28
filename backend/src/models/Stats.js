import mongoose from 'mongoose'

const statsSchema = new mongoose.Schema({
  total_downloads: { type: Number, default: 0 },
  popular_platforms: { type: Map, of: Number, default: {} },
  last_updated: { type: Date, default: Date.now }
})

const Stats = mongoose.model('Stats', statsSchema)

export default Stats
