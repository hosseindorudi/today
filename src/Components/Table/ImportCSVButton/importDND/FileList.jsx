export const FileList = ({ files }) => {
  if (!files || files?.length === 0) {
    return <div></div>
  }
  return <div>{files.name}</div>
}
