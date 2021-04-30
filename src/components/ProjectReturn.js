export default function ProjectReturn({ projectReturn }) {
  return (
    <div>
      <div>人数: {projectReturn.capacity}人</div>
      <div>金額: {projectReturn.price}円</div>
      <div>お届予定: {projectReturn.deliveryDate}</div>
      <div>{projectReturn.description}</div>
    </div>
  )
}
