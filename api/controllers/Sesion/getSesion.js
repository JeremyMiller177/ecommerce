const getSesion = async (req, res) => {
  try {
    res.json(req.user)
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error en getSesion: ${error}}`)
  }
}

module.exports = {
  getSesion
}
