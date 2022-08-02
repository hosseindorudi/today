const styles={
  lable:{
    fontWeight:"bold",
    fontSize:8
  }
}
export const FileList = ({ files }) => {
  if (!files || files?.length === 0) {
    return <div></div>
  }
  return <div style={styles.lable}>{files.name}</div>
}
