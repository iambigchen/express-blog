var express = require('express');
var router = express.Router();
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
router.get('/list', (req, res, next) => {
  const keyword = req.query.keyword || ''
  const author = req.query.author || ''
  return getList(author, keyword).then(listData => {
    return res.json(new SuccessModel(listData))
  })
})

router.get('/detail', (req, res, next) => {
  const id = req.query.id || ''
  return getDetail(id).then(detailData => {
    return res.json(new SuccessModel(detailData))
  })
})

router.post('/new',loginCheck, (req, res, next) => {
  const blogData = req.body || ''
  blogData.author = 'zhangsan' // req.session.username
  return newBlog(blogData).then(newResult => {
    return res.json(new SuccessModel(newResult))
  })
})

router.post('/update',loginCheck, (req, res, next) => {
  const id = req.query.id || ''
  const blogData = req.body || {}
  return updateBlog(id, blogData).then(updateResult => {
    return res.json(new SuccessModel(updateResult))
  })
})

router.post('/delete',loginCheck, (req, res, next) => {
  const blogData = req.body || ''
  blogData.author = 'zhangsan' // req.session.username
  return newBlog(blogData).then(newResult => {
    return res.json(new SuccessModel(newResult))
  })
})

module.exports = router;