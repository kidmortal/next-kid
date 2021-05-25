import '@testing-library/jest-dom'

process.on("unhandledRejection",(err)=>{
 jest.fn()
})