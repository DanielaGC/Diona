export default {
  name: 'error',
  run: (client, err) => {
    console.log(err.message)
  }
}