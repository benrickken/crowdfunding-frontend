import styles from './Project.module.scss'

export default function Project({ project }) {
  return (
    <div className={styles.container}>
      <img src='https://static.camp-fire.jp/uploads/project_version/image/627521/6f7c647f-4dba-46a1-abe3-b1e9dc7588d0.jpg' />
      <div className={styles.title}>{project.title}</div>
      <div>{project.target_amount}円</div>
      <div>{project.due_date}円</div>
      <div>{project.description}</div>
    </div>
  )
}
