import React from 'react'
import { Alert } from 'react-bootstrap'

const Page403 = () => {
  return (
    <>
    <div className="container">
      
    <Alert variant="danger my-5" >
                <Alert.Heading style={{ fontSize: '30px' }}>403 ERROR</Alert.Heading>
                <p style={{ fontSize: '20px' }}>
                    bạn không có quyền truy cập trang này
                </p>
        </Alert>
    </div>
    </>
  )
}

export default Page403