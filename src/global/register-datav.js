import {
  loading,
  borderBox10,
  borderBox11,
  borderBox12,
  borderBox13,
  decoration1,
  decoration7,
  decoration8,
  decoration10,
  scrollBoard,
  percentPond,
  scrollRankingBoard
} from "@jiaminghi/data-view"

const components = [
  loading,
  borderBox10,
  borderBox11,
  borderBox12,
  borderBox13,
  decoration1,
  decoration7,
  decoration8,
  decoration10,
  scrollBoard,
  percentPond,
  scrollRankingBoard
]

export default function (app) {
  components.forEach((component) => {
    app.use(component)
  })
}
