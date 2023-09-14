import Skeleton from '@mui/material/Skeleton'


const MUISkeleton = (props) => {


  return (
    <>
      <Skeleton sx={{ backgroundColor: '#252525', borderRadius: '14px' }} animation='wave' width='100%' height='100%' variant='rectangular' {...props} />
    </>
  )
}

export default MUISkeleton