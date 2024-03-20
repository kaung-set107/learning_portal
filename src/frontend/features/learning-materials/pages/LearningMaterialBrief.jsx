import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { learningMaterialApi } from "../api"
import Loading from "../../../components/general/Loading"
import Heading from "../../../components/general/typography/Heading"

const LearningMaterialBrief = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [learningMaterial, setLearningMaterial] = useState({})

  const getLearningMaterial = async () => {
    try {
      let res = await learningMaterialApi.get({ _id: id })
      console.log(res)
      setLearningMaterial(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getLearningMaterial()
  }, [])

  let content

  if (isLoading) {
    content = (<div className="h-[500px] flex justify-center items-center"><Loading /></div>)
  } else {
    content = (
      <div>
        <Heading title={learningMaterial.title} className="mb-3" />
        <p className="mb-3">{learningMaterial.description}</p>
      </div>
    )
  }

  return (
    <div>{content}</div>
  )
}

export default LearningMaterialBrief