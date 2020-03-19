var express = require('express');
var router = express.Router();
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {login} = require('../controller/user')

router.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  return login(username, password).then(result => {
    if (result.username) {
      // 操作session
      req.session.username = result.username
      req.session.realname = result.realname
      return res.json(new SuccessModel())
    }
    return res.json(new ErrorModel('登录失败'))
  })
})

module.exports = router;