export default process.env.NODE_ENV === "production"
  ? "https://nextjs-ecommbackend.herokuapp.com"
  : "http://localhost:5000"