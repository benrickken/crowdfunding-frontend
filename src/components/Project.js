export default function Project({ project }) {
  return (
    <div>
      <div>{project.title}</div>
      <div>{project.target_amount}円</div>
      <div>{project.due_date}円</div>
      <div>{project.description}</div>
    </div>
  )
}
